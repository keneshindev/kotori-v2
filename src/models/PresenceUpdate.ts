import { Emoji } from "./Emoji";
import { User } from "./User";

export type Status = "idle" | "dnd" | "online" | "offline"
export interface PresenceUpdate {
    user: User;
    guild_id: string;
    status: Status;
    activities: Activity[];
    client_status: ClientStatus;
}
export interface ClientStatus {
    desktop?: Status;
    mobile?: Status;
    web?: Status;
}
export interface Activity {
    name: string;
    type: number;
    url: string | null;
    created_at: number;
    timestamps?: ActivityTimestamp[];
    application_id?: string;
    details?: string | null;
    state?: string | null;
    emoji?: Emoji | null;
    party?: Party | null;
    assets?: Asset | null;
    secrets?: RPCSecret | null;
    instance?: boolean;
    flags?: number;
    buttons?: ActivityButton[]
}
export interface ActivityTimestamp {
    start?: number;
    end?: number;
}
export interface Party {
    id?: string;
    size?: { current_size: number, max_size: number }[]
}
export interface Asset {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
}
export interface ActivityButton {
    label: string;
    url: string;
}
export interface RPCSecret {
    join?: string;
    spectate?: string;
    match?: string;
}