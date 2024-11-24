export class Word {
    constructor(baseWord) {
        this.similar = 0;
        this.canBe = true;
        this.totalSimilarity = 0;
        this.baseWord = baseWord;
    }
    check(lastTry, rightChars) {
        let similar = 0;
        this.baseWord.split("").forEach((letter, index) => {
            const lastTryLetter = lastTry.substring(index, index + 1);
            if (lastTryLetter == letter) {
                similar++;
            }
        });
        this.similar = similar;
        //console.log("similar",this.similar,"rightChars",rightChars," this.canBe", this.canBe);
        this.canBe = this.canBe && this.similar === rightChars;
    }
}
