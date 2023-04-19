import strings from "node-strings"

export class Error {
    constructor(msg: string[]) {
        console.clear()
        console.error(strings.yellow("["), strings.red("ERROR"), strings.yellow("]"), strings.blue("=>"), strings.white(msg.join("")));
    }
}