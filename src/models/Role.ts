export interface Role {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    icon?: string | null;
    unicode_emoji?: string | null;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags?: RoleTag[];
}

export interface RoleTag {
    bot_id?: string;
    integration_id?: string;
    premium_subscriber?: null; // ????
    subscription_listing_id?: string;
    available_for_purchase?: null; // ????
    guild_connections?: null; // ????
}
// uhh what