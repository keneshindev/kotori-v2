import EventEmitter from 'events'
import { createApi } from './Api';
import { Gateway, GatewayConnectOptions } from './Gateway';
interface ClientCreateOptions {
    token: string;
    selfbot?: boolean;
    gateway?: GatewayConnectOptions
}
type ClientCreateOptionsType = ClientCreateOptions | string
export class Client extends EventEmitter {
    public api: any; // uhh maybe i'll change it later
    // private gateway: Gateway;
    constructor(options: ClientCreateOptionsType | string) {
        super()
        let token: string = typeof options == "string"
            ? options
            : options.token;
        this.api = createApi((options as ClientCreateOptions).selfbot ? token : "Bot " + token);
        new Gateway().connect(this, token, (options as ClientCreateOptions).gateway)
    }
}