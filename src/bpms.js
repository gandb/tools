export function bpms(bpms, start, dtaref) {
    const miliseconds = dtaref.getTime() - start.getTime();
    return bpms / (miliseconds / 60000); //por minuto
}
