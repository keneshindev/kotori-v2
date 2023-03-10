import axios, { RawAxiosRequestHeaders } from 'axios'
import { DISCORD_API_FULL_URL } from './Constants'
type ApiHandlerThisType = {
    token: string,
    url: string,
    method: string
}
function apiHandler2(wtf2: ApiHandlerThisType) {
    console.log(wtf2)
    return (body: any, headers: RawAxiosRequestHeaders) => {
        if (body && ["get", "delete"].includes(wtf2.method))
            throw new Error("GET or DELETE methods cannot contain body")
        if (!headers) headers = {}//ya pishov//ok gb
        if (!headers.Authorization) headers.Authorization = wtf2.token
        
        axios.request({
            method: wtf2.method,
            url: wtf2.url,
            baseURL: DISCORD_API_FULL_URL, // bruh different naming conventions im idiot
            headers,
            ...(body && body)
        })
    }
}
// function apiHandler(this: ApiHandlerThisType, body: any, headers: RawAxiosRequestHeaders) {
//     console.log(this)//eh i can rewrite this
//     // rewrite it then
//     // i am losing my mind
//     if ((this.method == "get" || this.method == "delete") && body) throw new Error("GET or DELETE methods cannot contain body")
//     if (!headers.Authorization) headers.Authorization = this.token
//     axios.request({
//         method: this.method,
//         baseURL: DISCORD_API_FULL_URL, // bruh different naming conventions im idiot
//         headers,
//         ...(body && body)
//     })
// }
let methods = [
    "get",
    "post",
    "patch",
    "put",
    "delete"
]
export function createApi(token: string) {
    let validator = {
        url: [],
        get(target: any, key: string): any {
            if (key == "url") return;
            if (!methods.includes(key.toLowerCase())) {
                return new Proxy(target, { ...validator, url: [ ...this.url, key]} as typeof validator)
            }
            else return apiHandler2({ url: "/" + this.url.join("/"), token, method: key })
        }
    }

    return new Proxy({}, validator)
}