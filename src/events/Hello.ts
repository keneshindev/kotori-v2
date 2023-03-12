import { Client } from "../Client";
import { Gateway } from "../Gateway";
import { Packet } from "../Packet";

export function handler(client: Client, gateway: Gateway, packet: Packet) {
    gateway.setHeartbeatInterval(packet.d.heartbeat_interval)
    gateway.identify(client)
}