export interface WelcomeScreen {
    description?: string;
    welcome_channels: WelcomeChannel[];
}
export interface WelcomeChannel {
    channel_id: string;
    description: string;
    emoji_id: string | null;
    emoji_name: string | null;
}