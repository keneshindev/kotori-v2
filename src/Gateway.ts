import { Client } from './Client'
import WebSocket from 'ws';
import { DISCORD_API_VERSION } from './Constants';
import { BaseConverter } from './converter/BaseConverter';
import { JSONConverter } from './converter/JSONConverter';
import { ErlpackConverter } from './converter/ErlpackConverter';
import { ZlibConverter } from './converter/ZlibConverter';
import { GatewayCloseCode } from './Types';
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
    async connect(client: Client, token: string, options?: GatewayConnectOptions) {
        let { url, session_start_limit } = await client.api.gateway.bot.get() as GatewayRouteResponse
        client.emit("debug", `Received Gateway URL: ${url}`)
        client.emit("debug", `Remaining sessions: ${session_start_limit.remaining}`)
        let fullUrl = new URL(url)
        fullUrl.searchParams.set("encoding", options?.encoding ?? "json")
        fullUrl.searchParams.set("v", DISCORD_API_VERSION.toString())
        switch (options?.encoding) {
            case "json":
                this.converter = new JSONConverter()
            case "etf":
                this.converter = new ErlpackConverter()
        }
        if (options?.compress) {
            fullUrl.searchParams.set("compress", "zlib-stream")
            this.converter = new ZlibConverter(this.converter)
        }
        this.ws = new WebSocket(fullUrl.href);
        this.ws.on("close", (code) => {
            switch (code) {
                case GatewayCloseCode.AuthenticationFailed: throw new Error("Invalid token")
                case GatewayCloseCode.InvalidShard: throw new Error("Sharded clients are not supported")
                case GatewayCloseCode.ShardingRequired: throw new Error("Sharded clients are not supported")
                case GatewayCloseCode.InvalidAPIVersion: throw new Error("Invalid API version for Gateway")
                case GatewayCloseCode.InvalidIntents: throw new Error("Invalid intents")
                case GatewayCloseCode.DisallowedIntents: throw new Error("Disallowed intents")
                default: break
            }
            if (this.reconnect_interval < 30000) this.reconnect_interval += 500
            setTimeout(() => this.connect(client, token), this.reconnect_interval)
        })
        this.ws.on("message", (rawMessage, isBinary) => {
            let message = this.converter.decode(isBinary ? rawMessage as Buffer : rawMessage.toString())
            console.log(message)
        })
    }
}