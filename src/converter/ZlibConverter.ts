import { BaseConverter } from "./BaseConverter";
import { Inflate, Z_SYNC_FLUSH } from "zlib-sync";

export class ZlibConverter extends BaseConverter {
    private inflate: Inflate;
    constructor(private converter: BaseConverter) {
        super()
        this.inflate = new Inflate({ chunkSize: 65535})
    }
    public decode(value: Buffer) {
        try {
            const l = value.length;
            const flush = 
            l >= 4 && value[l - 4] === 0x00 && value[l - 3] === 0x00 && value[l - 2] === 0xff && value[l - 1] === 0xff;
            this.inflate.push(value, flush && Z_SYNC_FLUSH)
            if (!flush) return null;
            if (!this.inflate.result) return null;
            return this.converter.decode(this.inflate.result)
        } catch (e) {
            console.log(e)
            return null
        }
    }
    public encode(value: any) {
        return this.converter.encode(value)
    }
}