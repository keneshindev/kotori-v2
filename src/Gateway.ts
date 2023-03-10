import { Client } from './Client'
import WebSocket from 'ws'
export class Gateway {
    async connect(client: Client, token: string) {
        let gateway = await client.api.gateway.bot.get()
        console.log(gateway)
    }
}