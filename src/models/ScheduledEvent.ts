import { PartialUser } from "./User";

export interface ScheduledEvent {
    id: string;
    guild_id: string;
    channel_id: string | null;
    created_id?: string | null;
    name: string;
    description?: string | null;
    scheduled_start_time: Date | string;
    scheduled_end_time: Date | string | null;
    privacy_level: number;
    status: number;
    entity_type: number;
    entity_id: string | null;
    entity_metadata: { location?: string } | null;
    creator?: PartialUser;
    user_count?: number;
    image?: string | null;
}