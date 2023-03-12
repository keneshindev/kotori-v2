import { Client } from "../Client";
import { Gateway } from "../Gateway";
import { UnavailableGuild } from "../models/Guild";
import { User } from "../models/User";
import { Packet } from "../Packet";

interface ReadyEventData {
    v: number; // API version
    user: User
    guilds: UnavailableGuild[]
    session_id: string;
    resume_gateway_url: string;
    shard?: { shard_id: number, num_shards: number}[]//Shard[] // later when sharding
    application: any //PartialApplication // i forgor
}
//huh
//hah
interface ReadyPacket extends Packet {
    d: ReadyEventData;
}
export function handler(client: Client, gateway: Gateway, packet: ReadyPacket) {
    
}