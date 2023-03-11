import { BaseConverter } from "./BaseConverter";
import { pack, unpack } from "erlpack";

export class ErlpackConverter extends BaseConverter {
    public decode(value: Buffer) {
        try {
            return unpack(value)
        } catch {
            return null
        }
    }
    public encode(value: any) {
        return pack(value)
    }
}