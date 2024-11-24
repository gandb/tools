 

export function bpms( bpms:number, start:Date, dtaref:Date ) : number
{
    const miliseconds = dtaref.getTime() - start.getTime();
    return  bpms / (miliseconds / 60000);//por minuto
}
 