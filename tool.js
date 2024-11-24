"use strict";
exports.__esModule = true;
var bpms_ts_1 = require("./src/bpms.ts");
var program_ts_1 = require("./src/program.ts");
var args = process.argv;
var programs = new Map([
    ["bpm", new program_ts_1.Program("bpm", ["time in seconds"], bpm)],
    ["folout", new program_ts_1.Program("folout", ["number of words"], follout)]
]);
init(args);
function printComands() {
    console.error("Os comandos aceitos são:");
    this.programs.forEach(function (value, key) {
        var argsExplanation = value.argsExplanations.reduce(function (previous, current) {
            return previous + " " + current;
        });
        console.error("".concat(key, " <").concat(argsExplanation, ">"));
    });
}
function bpm(args) {
    var handle = null;
    var START_USER_PARAMETER = this.programs.get(args[0]).argsExplanations.length;
    if (!isNaN(args[START_USER_PARAMETER + 1])) {
        var time = parseInt(args[START_USER_PARAMETER + 1]) * 1000;
        console.log("Você solicitou para que seja avisado quando passar  " + args[START_USER_PARAMETER + 1] + " segundos.");
        handle = setTimeout(function () {
            console.log("\nO tempo acabou!\n");
        }, time);
    }
    console.log("Aperte uma tecla qualquer para cada nova batida, aperte Enter para sair :\n");
    var start = new Date();
    process.stdin.on('readable', function () {
        // reads what is being typed. 
        var variable = process.stdin.read();
        // trying to read 
        var avg = (0, bpms_ts_1.bpms)(variable.length - 1, start, new Date());
        console.log("A média foi " + avg);
        if (handle) {
            clearTimeout(handle);
        }
    });
}
function follout(args) {
    var START_USER_PARAMETER = this.programs.get(args[0]).argsExplanations.length;
    if (isNaN(args[START_USER_PARAMETER + 1])) {
        console.error("O segundo parâmetro deve ser a quantidade de palavras :\n");
        return;
    }
    var NUMBER_OF_WORDS = parseInt(args[START_USER_PARAMETER + 1]);
    if (NUMBER_OF_WORDS <= 0) {
        console.error("A quantidade de parâmetros precisa ser maior que zero \n");
        return;
    }
    console.log("Digite a palavra e aperte enter:\n");
    var words = [];
    while (words.length < NUMBER_OF_WORDS) {
        process.stdin.on('readable', function () {
            // reads what is being typed. 
            var word = process.stdin.read();
            words.push(word.toString());
        });
    }
    console.log("As palavras digitadas são ", words);
}
function init(args) {
    var faces = 6;
    var length = 1;
    var bonus = 0;
    if (args.length == 0) {
        console.error("O nome do comando \u00E9 obrigat\u00F3rio");
    }
    var START_USER_PARAMETER = this.programs.get(args[0]).argsExplanations.length;
    if (args.length <= START_USER_PARAMETER) {
        console.error("O primeiro par\u00E2metro [".concat(args[START_USER_PARAMETER], "] precisa ser o comando"));
        console.error("tool <command> ");
        printComands();
        return;
    }
    this.programs.get(args[0]).program(args);
}
