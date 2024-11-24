"use strict";
import { bpms } from "./src/bpms.js";
import { Program } from "./src/program.js";
import { follout } from "./src/follout/follout.js";
var args = process.argv;
var programs = new Map([
    ["bpm", new Program("bpm", ["time in seconds"], bpm)],
    ["follout", new Program("follout", ["words with semicolon ',' separated without space"], follout)]
]);
setImmediate(async () => {
    await init(args);
});
function printComands() {
    console.error("Os comandos aceitos são:");
    programs.forEach((value, key) => {
        const argsExplanation = value.argsExplanations.reduce((previous, current) => {
            return previous + " " + current;
        });
        console.error(`${key} <${argsExplanation}>`);
    });
}
async function bpm(args) {
    let handle = null;
    const START_USER_PARAMETER = programs.get(args[0]).argsExplanations.length;
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
        const avg = bpms(variable.length - 1, start, new Date());
        console.log("A média foi " + avg);
        if (handle) {
            clearTimeout(handle);
        }
    });
}
async function init(args) {
    let faces = 6;
    let length = 1;
    let bonus = 0;
    const NAME_OF_PROGRMAM_INDEX = 2;
    if (args.length <= 2) {
        console.error(`O nome do comando é obrigatório`);
        printComands();
        return;
    }
    const programName = args[NAME_OF_PROGRMAM_INDEX];
    const program = programs.get(programName);
    if (!program) {
        console.error(`Programa não encontrado, tente `, programs);
    }
    const START_USER_PARAMETER = program.argsExplanations.length;
    if (args.length <= START_USER_PARAMETER) {
        console.error(`O primeiro parâmetro [${args[START_USER_PARAMETER]}] precisa ser o comando`);
        console.error(`tool <command> `);
        printComands();
        return;
    }
    await program.doAction(args);
}
