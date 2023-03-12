import EventEmitter from 'events'
import { createApi } from './Api';
import { Gateway, GatewayConnectOptions } from './Gateway';
interface ClientCreateOptions {
    token: string;
    selfbot?: boolean;
    gateway?: GatewayConnectOptions
    intents?: number;
}
type ClientCreateOptionsType = ClientCreateOptions | string
export class Client extends EventEmitter {
    public api: any; // uhh maybe i'll change it later
    public selfbot: boolean = false;
    public intents?: number;
    public guilds?: []; // later
    // private gateway: Gateway;
    public sessionId?: string;
    #token?: string;

    constructor(options: ClientCreateOptionsType | string) {
        super()
        let token: string = typeof options == "string"
            ? options
            : options.token;
        if ((options as ClientCreateOptions).selfbot) this.selfbot = true
        if ((options as ClientCreateOptions).intents && !this.selfbot)
            this.intents = (options as ClientCreateOptions).intents
        this.#token = token
        this.api = createApi(this.getToken(true)!);
        new Gateway().connect(this, (options as ClientCreateOptions).gateway)
    }

    getToken(prefix = false) {
        return this.selfbot ? this.#token : (prefix ? "Bot " + this.#token : this.#token)
    }
}