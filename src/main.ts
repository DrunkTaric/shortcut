import fs from "fs"
import path from "path"
import strings from "node-strings"
import cliSelect from "cli-select"
import { args, create, remove, edit, find } from "./script"

function main() {
    console.log(strings.red(`
███████╗██╗  ██╗ ██████╗ ██████╗ ████████╗ ██████╗██╗   ██╗████████╗
██╔════╝██║  ██║██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝██║   ██║╚══██╔══╝
███████╗███████║██║   ██║██████╔╝   ██║   ██║     ██║   ██║   ██║
╚════██║██╔══██║██║   ██║██╔══██╗   ██║   ██║     ██║   ██║   ██║
███████║██║  ██║╚██████╔╝██║  ██║   ██║   ╚██████╗╚██████╔╝   ██║
╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚═════╝    ╚═╝
    \n`), strings.yellow("made by ComboRush#1171\n"), strings.green("Welcome,"), strings.blue("How can i help you today"), "?")
    cliSelect({
        values: ["create", "edit", "delete"], 
        valueRenderer: (value: String, selected: boolean) => { 
            if(selected) {
                return strings.yellow(strings.underline(value))
            }
            return value
        },
        selected: "🟢",
        unselected: "🔴"
    }).then((res) => {
        if (res.id !== null) {
            switch(res.value) {
                case "create":
                    cliSelect({
                        values: fs.readdirSync(path.join(__dirname, "..", "default")).map(folder => folder), 
                        valueRenderer: (value: String, selected: boolean) => { 
                            if(selected) {
                                return strings.yellow(strings.underline(value))
                            }
                            return value
                        },
                        selected: "🟢",
                        unselected: "🔴"
                    }).then((res) => {
                        create(res.value.toString())
                    })
                    break
                case "edit": {
                    edit()
                    break
                }
                case"delete": {
                    remove()
                    break
                }
                default: {
                    console.log("Error somthing happed i have no idea why but somthing happend")
                }
            }
        }
    })
}

main()