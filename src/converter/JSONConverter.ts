import { BaseConverter } from "./BaseConverter";

export class JSONConverter extends BaseConverter {
    public decode(value: string) {
        try {
            return JSON.parse(value.toString())
        } catch {
            return null
        }
    }
    public encode(value: any) {
        return JSON.stringify(value);
    }
}