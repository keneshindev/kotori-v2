import { GatewayDispatchEvents, Opcode } from "./Types";

export interface Packet {
    op: Opcode;
    d: any;
    s: number;
    t: GatewayDispatchEvents;
}