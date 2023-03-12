export interface Stage {
    id: string;
    guild_id: string;
    channel_id: string;
    topic: string;
    privacy_level: string;
    discoverable_disabled: boolean;
    guild_scheduled_event_id: string | null;
}