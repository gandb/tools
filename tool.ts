"use strict";

import {bpms} from "./src/bpms";
import * as readline from 'readline';
import { ReadStream } from "fs";

const args:Array<string> = process.argv;
const START_USER_PARAMETER:number  = 2; 

function printComands()
{
    console.error("Os comandos aceitos são:");
    console.error("bpm [<time in seconds>]");
}

async function bpm(args:Array<any>)
{
    let handle = null;
    
    if(!isNaN(args[START_USER_PARAMETER+1]))
    {
        const time:number  = parseInt(args[START_USER_PARAMETER+1])*1000;
        console.log("Você solicitou para que seja avisado quando passar  " + args[START_USER_PARAMETER+1] + " segundos.");
        handle = setTimeout( ()=>{
            console.log("\nO tempo acabou!\n");
        },time);
    }

    console.log("Aperte uma tecla qualquer para cada nova batida, aperte Enter para sair :\n");

    const start:Date = new Date();

    process.stdin.on('readable', ()=>{ 
        // reads what is being typed. 
        let variable = process.stdin.read(); 
        // trying to read 
        const avg = bpms(variable.length-1,start,new Date());
        console.log("A média foi " +  avg);
        if(handle)
        {
            clearTimeout(handle);        
        }
    }); 

 
}

function init(args:Array<string>)
{   

    let faces:number = 6;
    let length:number = 1;
    let bonus:number = 0;

    if (args.length <=  START_USER_PARAMETER )
    {
        console.error(`O primeiro parâmetro [${args[START_USER_PARAMETER]}] precisa ser o comando`);
        console.error(`tool <command> `);
        printComands();
        return;
    } 

    if(args[START_USER_PARAMETER]=="bpm")
    {
       bpm(args);
    }
}

init(args);