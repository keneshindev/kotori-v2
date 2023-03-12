import { PartialUser } from "./User";

export interface Sticker {
    id: string;
    pack_id?: string;
    name: string;
    description: string | null;
    tags: string;
    asset?: string;
    type: number;
    format_type: number;
    available?: boolean;
    guild_id?: boolean;
    user?: PartialUser;
    sort_value?: number;
}//я пойду допиливать бота :aaa:
// ок пака :aaa: