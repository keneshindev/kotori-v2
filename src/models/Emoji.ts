import { Role } from "./Role";
import { PartialUser } from "./User";

export interface Emoji {
    id: string | null;
    name: string | null;
    roles?: Role[];
    user?: PartialUser;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
} // nani?????
// check guild.ts
// what's there
// ehhh???
// idk ehh
// ?????