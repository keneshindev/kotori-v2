import { PartialUser } from "./User";

export interface Member {
    user?: PartialUser;
    nick?: string | null;
    avatar?: string | null;
    roles: string[];
    joined_at: Date | string;
    premium_since?: Date | string | null;
    deaf: boolean;
    mute: boolean;
    flags: number;
    pending?: boolean;
    permissions?: string;
    communication_disabled_until?: Date | string | null;
}
export interface ThreadMember {
    id?: string;
    user_id?: string;
    join_timestamp: Date | string;
    flags: number;
    member?: Member
}