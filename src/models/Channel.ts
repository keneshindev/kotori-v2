import { ThreadMember } from "./Member";
import { PartialUser } from "./User";

export interface Channel {
    id: string;
    type: number;
    guild_id?: string;
    position?: number;
    permission_overwrites?: Overwrite[];
    name?: string | null;
    topic?: string | null;
    nsfw?: boolean;
    last_message_id?: string | null;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: PartialUser[];
    icon?: string | null;
    owner_id?: string;
    application_id?: string;
    managed?: boolean;
    parent_id?: string | null;
    last_pin_timestamp?: Date | string | null;
    rtc_region?: string | null;
    message_count?: number;
    member_count?: number;
    thread_metadata?: ThreadMeta;
    member?: ThreadMember;
    default_auto_archive_duration?: number;
    permissions?: string;
    flags?: number;
    total_message_sent?: number;
    available_tags?: ForumTag[];
    applied_tags?: string[];
    default_reaction_emoji?: DefaultReaction;
    default_thread_rate_limit_per_user?: number;
    default_sort_order?: number | null;
    default_forum_layout?: number;
}
export interface Overwrite {
    id: string;
    type: number;
    allow: string;
    deny: string;
}
export interface ThreadMeta {
    archived: boolean;
    auto_archive_duration: number;
    archive_timestamp: Date | string;
    locked: boolean;
    invitable?: boolean;
    create_timestamp?: Date | string | null;
}
export interface ForumTag {
    id: string;
    name: string;
    moderated: boolean;
    emoji_id: string | null;
    emoji_name: string | null;
}
export interface DefaultReaction {
    emoji_id: string | null;
    emoji_name: string | null;
}