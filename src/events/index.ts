import { Opcode } from "../Types";
import { handler as Hello } from "./Hello";
import { handler as Dispatch } from "./Dispatch";

export let handlers = Object.fromEntries([
    [Opcode.Hello, Hello], 
    [Opcode.Dispatch, Dispatch]
])
/*
Opcode.Hello is 10
opcode variable is useless
не понял
бля
opcode не нужен
можно из index.ts импортить по Opcode.Hello
ладно
handlers[Opcode.Hello] etc
*/