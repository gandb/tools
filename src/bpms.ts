
const args:Array<string> = process.argv;
const START_USER_PARAMETER:number  = 2;

export function bpms( bpms:number, start:Date, dtaref:Date ) : number
{
    const miliseconds = dtaref.getTime() - start.getTime();
    return  bpms / (miliseconds / 60000);//por minuto
}
 