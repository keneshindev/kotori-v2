import { Client } from './Client'
import WebSocket from 'ws';
import { DISCORD_API_VERSION } from './Constants';
import { BaseConverter } from './converter/BaseConverter';
import { JSONConverter } from './converter/JSONConverter';
import { ErlpackConverter } from './converter/ErlpackConverter';
import { ZlibConverter } from './converter/ZlibConverter';
import { GatewayCloseCode } from './Types';
import { Packet } from './Packet';
import { createHeartbeat } from './events/Heartbeat';
import { createIdentify } from './events/Identify';
interface GatewayRouteResponse {
    url: string;
    shards: number;
    session_start_limit: {
        total: number;
        remaining: number;
        reset_after: number;
        max_concurrency: number;
    }
}
export interface GatewayConnectOptions {
    encoding: "json" | "etf";
    compress: boolean;
}
export class Gateway {
    private ws!: WebSocket;
    private reconnect_interval = 0;
    private converter!: BaseConverter;
    private heartbeat_interval?: NodeJS.Timer | NodeJS.Timeout;
    private sequence: number | null = null;
    
    setHeartbeatInterval(interval: number) {
        this.heartbeat_interval = setTimeout(() => {
            this.send(createHeartbeat(this.sequence))

            this.heartbeat_interval = setInterval(() => {
                this.send(createHeartbeat(this.sequence))
            }, interval);
        }, interval * Math.random());
    }
    destroy() {
        clearInterval(this.heartbeat_interval);
        this.ws.close()
    }

    async send(value: any) {
        this.ws.send(this.converter.encode(value))
    }

    async connect(client: Client, options?: GatewayConnectOptions) {
        options ??= {
            encoding: "json",
            compress: false
        }
        let { url, session_start_limit } = await client.api.gateway.bot.get() as GatewayRouteResponse
        client.emit("debug", `Received Gateway URL: ${url}`)
        client.emit("debug", `Remaining sessions: ${session_start_limit.remaining}`)
        let fullUrl = new URL(url)
        fullUrl.searchParams.set("encoding", options.encoding)
        fullUrl.searchParams.set("v", DISCORD_API_VERSION.toString())
        switch (options.encoding) {
            case "json":
                this.converter = new JSONConverter()
                break;
            case "etf":
                this.converter = new ErlpackConverter()
                break;
            default:
                throw new Error("wtf you passed")
        }
        if (options.compress) {
            fullUrl.searchParams.set("compress", "zlib-stream")
            this.converter = new ZlibConverter(this.converter)
        }
        this.ws = new WebSocket(fullUrl.href);
        this.ws.on("close", (code) => {
            try {
                switch (code) {
                    case GatewayCloseCode.AuthenticationFailed: throw new Error("Invalid token")
                    case GatewayCloseCode.InvalidShard: throw new Error("Sharded clients are not supported")
                    case GatewayCloseCode.ShardingRequired: throw new Error("Sharded clients are not supported")
                    case GatewayCloseCode.InvalidAPIVersion: throw new Error("Invalid API version for Gateway")
                    case GatewayCloseCode.InvalidIntents: throw new Error("Invalid intents")
                    case GatewayCloseCode.DisallowedIntents: throw new Error("Disallowed intents")
                    default: break
                }
            } catch (e) {
                this.destroy();
                throw e
            }
            if (this.reconnect_interval < 30000) this.reconnect_interval += 500
            setTimeout(() => this.connect(client, options), this.reconnect_interval)
        })

        this.ws.on("message", (rawMessage, isBinary) => {
            let message = this.converter.decode(isBinary ? rawMessage as Buffer : rawMessage.toString()) as Packet
            if (message.s) this.sequence = message.s;

        })
    }
    async identify(client: Client) {
        if (client.sessionId) this.resume(client)
        else this.send(createIdentify(client.getToken()!, client.intents))
    }
    async resume(client: Client) {
        
    }
}