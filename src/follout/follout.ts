//Caso de uso https://docs.google.com/spreadsheets/d/1faxeV1nyGyOWGU5H5SpwiCbsoR2agjkJB1veS2SnDpU/edit#gid=0 Follout no Google Drive

import * as readline from 'readline';
import { Word } from "./word.js";
import { stdin, stdout } from "process";
import { checkServerIdentity } from 'tls';

let debugCounter = 1; 

export async function follout(args:Array<any>)
{ 
  
    const WORDS_INDEX:number = 3; 
    if(!args[WORDS_INDEX]  || args[WORDS_INDEX]<3)
    {
        console.error("A quantidade de palavras deve ser maior que 3 \n");
        return;
    }
    const wordsBaseName:Array<string>= (args[WORDS_INDEX].split(",")).map((value:string)=> value.toUpperCase());
      
    if(wordsBaseName.length <4)
    {
        console.error("A quantidade de palavras deve ser maior que 3 \n");
        return;
    }
    
    const size:number = wordsBaseName[0].length;
    const errorSize:boolean = wordsBaseName.filter(
    (word)=>{
        if(word.length!=size)
        {
            console.error("A palavra [" + word +  "] difere no tamanho das demais");
            return true;
        }
        return false;
    }).length > 0; 

    if(errorSize)
    {
        return;
    }

    console.log("As palavras digitadas são ", wordsBaseName);

    const words:Array<Word> = [];

    wordsBaseName.forEach((wordBaseValue,i)=>{
        words.push( new Word(wordBaseValue));
    });

    words.forEach((word,i)=>{
       wordsBaseName.forEach((wordBaseValue,j)=>{
            if(i===j)
            {
                return;
            }
            const candidate:Word = new Word(wordBaseValue);
            candidate.check(word.baseWord,5);
            word.totalSimilarity+=candidate.similar;
        });

    });
  
    let notFound:boolean = true;
    while(notFound)
    { 
        console.log("DigiteOK para interromper se achar a palavra");
        let nextChoise : Word = words.reduce((previous:Word,current:Word)=>{
           // console.log("previous",previous,"current",current);
            if(!current.canBe)
            {
                return previous;
            }
            if (previous.totalSimilarity > current.totalSimilarity && previous.canBe)
            {
                return previous;
            }
            return current;
            
        });

        if(!nextChoise.canBe)
        {
            console.log("Alguma coisa está errada nos parâmetros de entrada");
            return;

        }
      
          
        let conputerReturn:string = await askQuestion(`A sua próxima escolha deve ser : [${nextChoise.baseWord}] Qual o retorno do computador? (Digite apenas "OK" se a senha estiver correta)`);
       
        
        const lastChoise: Word = nextChoise;
        if(conputerReturn == "OK")
        {
            notFound=false;
            console.log("A senha então era " + lastChoise.baseWord);
            return;
        }

        lastChoise.canBe = false;

        removeNonComplient(words,lastChoise,parseInt(conputerReturn));
        if(lastChoise.baseWord==DEBUG_WORD)
            console.log("words",words);
         
      
    }

}
const DEBUG_WORD:string = "DEBUG";//DEBUG_OFF,SWISS,CALLS,DOORS,NESTS; <=testes para o cenário de uso
function removeNonComplient(words:Array<Word>,lastWordCandidate:Word,computerReturn:number)
{
  

    if(lastWordCandidate.baseWord==DEBUG_WORD)
    console.log("removeNonComplient:words",words,"astWordCandidate",lastWordCandidate,"computerReturn",computerReturn);
    for(let i = 0 ; i < words.length; i++ )
    {
       // if(lastWordCandidate.baseWord==DEBUG_WORD)
        //    console.log("i",i);
        const word: Word = words[i];

        if(!word.canBe)
        {
           // if(lastWordCandidate.baseWord==DEBUG_WORD)
            //    console.log("word removido previamente, word:",word,"lastWordCandidate",lastWordCandidate);
            continue;
        }

         word.totalSimilarity = 0;
        word.similar= 0;

       
      //  if(lastWordCandidate.baseWord==DEBUG_WORD)
          //  console.log("word.check before lastCandidate=",lastWordCandidate,"word",word);
        
        word.check(lastWordCandidate.baseWord,computerReturn);
        
        if(lastWordCandidate.baseWord==DEBUG_WORD)
        console.log("word.check after lastCandidate=",lastWordCandidate,"word",word);
        if(!word.canBe)
        {
           // if(lastWordCandidate.baseWord==DEBUG_WORD)
           // console.log("word removido por nao bater com last Candidate: word ",word,"lastWordCandidate",lastWordCandidate);
           continue;
        }
     };
 
     for(let i = 0 ; i < words.length; i++ )
        {
            const word: Word = words[i];

            if(lastWordCandidate.baseWord==DEBUG_WORD)
                console.log("COMECANDO CONTAGEM",words);


            if(!word.canBe)
            {
                if(lastWordCandidate.baseWord==DEBUG_WORD)
                    console.log("word removido previamente, word:",word,"lastWordCandidate",lastWordCandidate);
                continue;
            }

            for(let j = 0 ; j < words.length; j++ )
            {
                const wordCandidate = new Word( words[j].baseWord);
                wordCandidate.canBe = words[j].canBe;
                
                const removedIntoThisBlock:boolean  = !wordCandidate.canBe || !word.canBe;
                if(removedIntoThisBlock)
                {
                    if(lastWordCandidate.baseWord==DEBUG_WORD)
                        console.log("word removido previamente, wordCandidate:",wordCandidate,"lastWordCandidate",lastWordCandidate);    
                    continue;
                }
                if(word.baseWord==wordCandidate.baseWord)
                { 
                    if(lastWordCandidate.baseWord==DEBUG_WORD)
                        console.log("word removido por ser igual  wordCandidate:",wordCandidate,"word",word);    
            
                    continue;
                } 
                if(lastWordCandidate.baseWord==DEBUG_WORD)
                console.log("word",word,"wordCandidate",wordCandidate);
                
                if(word.baseWord=="SOLAR" && wordCandidate.baseWord == "WORDS")
                {
                    if(lastWordCandidate.baseWord==DEBUG_WORD)
                    console.log("Antes do check",wordCandidate);
                }
                
                wordCandidate.similar=0;
                wordCandidate.check(word.baseWord,computerReturn);
                
                
                if(word.baseWord=="SOLAR" && wordCandidate.baseWord == "WORDS")
                {
                    if(lastWordCandidate.baseWord==DEBUG_WORD)
                    console.log("Depois do check",wordCandidate);
                }
                
                if(wordCandidate.canBe)
                {
                    if(word.baseWord=="BUILT")
                    console.log("Depois do check",wordCandidate,"wordCandidate.similar",wordCandidate.similar,"word.totalSimilarity",word.totalSimilarity);   
                    word.totalSimilarity+=wordCandidate.similar;
                }
    
                
            };
    
     };
 
}


async function askQuestion(msg:string):Promise<string>
{
      
     return new Promise((resolve)=>{
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal :false
          });
    
        rl.question(msg, (value) => {
            resolve( value);
            rl.close();
          });
    
     }); 
}

