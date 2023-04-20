import os from "os"
import fs from "fs"
import path from "path"
import prompt from "shell-exec"
import { Error } from "./error"
import strings from "node-strings"

export function args(): Map<string, string> {
    let args: Map<string, string> = new Map();
    process.argv
        .slice(2, process.argv.length)
        .forEach( arg => {
        if (arg.slice(0,2) === '--') {
            const longArg = arg.split('=');
            const longArgFlag = longArg[0].slice(2,longArg[0].length);
            const longArgValue = longArg[1];
            args.set(longArgFlag, longArgValue);
        }
    });
    return args;
}

function get() {
    const prompt = require("prompt-sync")({ sigint: true });
    const name: String = prompt("Script name: ")
    return name.toLowerCase();
}

export function find(name: string) {
    let cpath: string = path.join(__dirname, "..")
    return fs.existsSync(`${path.join(cpath, "scripts", name)}`)
}

export function create(type: string) {
    let cpath: string = path.join(__dirname, "..")
    let dpath: string = path.join(__dirname, "../default/", type)
    let dir = fs.readdirSync(dpath)
    let name: string = get()
    let data = "@echo off\n"
    
    if (name == "shortcut") return new Error(["You can't make script with name: ", strings.underline(strings.red(name))])
    if (find(name)) return new Error(["script already exist!"])

    fs.mkdirSync(path.join(cpath, "scripts", name))
    switch (type) {
        case "javascript": {
            data += `node ${path.join(cpath, "scripts", name, "src", "main.js")}`
            break
        }
        case "typescript": {
            data += `node ${path.join(cpath, "scripts", name, "dist", "main.js")}`
            break
        }
        case "bat": {
            data += `node ${path.join(cpath, "scripts", name, "main.bat")}`
            break
        }
    }
    fs.writeFileSync(`${path.join(cpath, "bin/")}${name}.bat`, data)

    dir.forEach((file_name: string) => {
        if (fs.statSync(path.join(dpath, file_name)).isDirectory()) {
            fs.mkdirSync(`${path.join(cpath, "scripts", name)}/${file_name}`)
        }else {
            let data: Buffer | any = fs.readFileSync(path.join(dpath, file_name))
            if (file_name.includes("package.json")) {
                data = JSON.parse(data)
                data.name = name
                data = JSON.stringify(data, null, 2)
            }
            fs.writeFileSync(`${path.join(cpath, "scripts", name)}/${file_name}`, data)
        }
    })
    prompt(`code ${path.join(cpath, "scripts", name)}`)
}

export function remove() {
    let name = get()
    let cpath: string = path.join(__dirname, "..")

    if (name == "shortcut") return new Error(["You can't remove script with name: ", strings.underline(strings.red(name))])
    if (!find(name)) return new Error(["script doesn't exist!"])

    fs.rmSync(path.join(cpath, "scripts", name), {force: true, recursive: true})
    fs.rmSync(`${path.join(cpath, "bin/")}${name}.bat`)
}

export function edit() {
    let name = get()
    let cpath: string = path.join(__dirname, "..")

    if (!find(name)) return new Error(["script doesn't exist!"])

    prompt(`code ${path.join(cpath, "scripts", name)}`)
}