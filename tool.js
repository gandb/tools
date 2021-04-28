"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bpms_1 = require("./src/bpms");
const args = process.argv;
const START_USER_PARAMETER = 2;
function printComands() {
    console.error("Os comandos aceitos são:");
    console.error("bpm [<time in seconds>]");
}
async function bpm(args) {
    let handle = null;
    if (!isNaN(args[START_USER_PARAMETER + 1])) {
        const time = parseInt(args[START_USER_PARAMETER + 1]) * 1000;
        console.log("Você solicitou para que seja avisado quando passar  " + args[START_USER_PARAMETER + 1] + " segundos.");
        handle = setTimeout(() => {
            console.log("\nO tempo acabou!\n");
        }, time);
    }
    console.log("Aperte uma tecla qualquer para cada nova batida, aperte Enter para sair :\n");
    const start = new Date();
    process.stdin.on('readable', () => {
        // reads what is being typed. 
        let variable = process.stdin.read();
        // trying to read 
        const avg = bpms_1.bpms(variable.length - 1, start, new Date());
        console.log("A média foi " + avg);
        if (handle) {
            clearTimeout(handle);
        }
    });
}
function init(args) {
    let faces = 6;
    let length = 1;
    let bonus = 0;
    if (args.length <= START_USER_PARAMETER) {
        console.error(`O primeiro parâmetro [${args[START_USER_PARAMETER]}] precisa ser o comando`);
        console.error(`tool <command> `);
        printComands();
        return;
    }
    if (args[START_USER_PARAMETER] == "bpm") {
        bpm(args);
    }
}
init(args);
//# sourceMappingURL=tool.js.map