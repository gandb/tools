"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bpms = void 0;
const args = process.argv;
const START_USER_PARAMETER = 2;
function bpms(bpms, start, dtaref) {
    const miliseconds = dtaref.getTime() - start.getTime();
    return bpms / (miliseconds / 60000); //por minuto
}
exports.bpms = bpms;
//# sourceMappingURL=bpms.js.map