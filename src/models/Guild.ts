import { Channel } from "./Channel";
import { Emoji } from "./Emoji";
import { Member } from "./Member";
import { PresenceUpdate } from "./PresenceUpdate";
import { Role } from "./Role";
import { ScheduledEvent } from "./ScheduledEvent";
import { Stage } from "./Stage";
import { Sticker } from "./Sticker";
import { User } from "./User";
import { VoiceState } from "./VoiceState";
import { WelcomeScreen } from "./WelcomeScreen";

export interface Guild {
    id: string;
    name: string;
    icon?: string | null;
    icon_hash?: string | null;
    splash: string | null;
    discovery_splash: string | null;
    owner?: User;
    owner_id: string;
    permissions?: string;
    afk_channel_id: string | null;
    afk_timeout: 60 | 300 | 900 | 1800 | 3600;
    widget_enabled?: boolean;
    widget_channel_id?: string | null;
    verification_level: number;
    default_message_notification: number;
    explicit_content_filter: number;
    roles: Role[];
    emojis: Emoji[];
    features: string[];
    mfa_level: number;
    application_id: string | null;
    system_channel_id: string | null;
    system_channel_flags: number;
    rules_channel_id: string | null;
    max_presences?: number | null;
    max_members?: number;
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
    premium_tier: number;
    premium_subscription_count: number;
    preferred_locale: string;
    public_updates_channel_id: string | null;
    max_video_channel_users?: number;
    approximate_member_count?: number;
    approximate_presence_count?: number;
    welcome_screen: WelcomeScreen;
    nsfw_level: number;
    stickers?: Sticker[];
    premium_progress_bar_enabled: boolean;
    joined_at: Date | string;
    large: boolean;
    unavailable?: boolean;
    member_count: number;
    voice_states: VoiceState[];
    members: Member[];
    channels: Channel[];
    threads: Channel[];
    presences: PresenceUpdate[];
    stage_instances: Stage[]
    guild_scheduled_events: ScheduledEvent[];
}
export type UnavailableGuild = Pick<Guild, "id" | "unavailable">
// нехуя блять
// ik
// it's fucking enormous