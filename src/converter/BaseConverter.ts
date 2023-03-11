export type EncodingType = string | Buffer;
export type DecodingType = any;
export abstract class BaseConverter {
    public abstract encode(value: DecodingType): EncodingType;
    public abstract decode(value: EncodingType): DecodingType;
}