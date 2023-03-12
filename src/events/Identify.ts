import * as os from "os"
export function createIdentify(token: string, intents?: number) { // nani
    return {
        op: 2,
        d: {
            token: token,
            intents: intents ?? 513,
            properties: {
                "os": os.platform(),
                "browser": "@keneshin/kotori v2",
                "device": os.hostname()
            }
        }
    }
}