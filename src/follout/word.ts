export class Word{
    public baseWord:string ;
    public similar:number = 0;
    public canBe:boolean = true;
    public totalSimilarity:number = 0;
    constructor(baseWord:string)
    {
        this.baseWord = baseWord;
    }

    public check(lastTry:string,rightChars:number)
    {
        let similar:number = 0 ;
        this.baseWord.split("").forEach((letter:string,index:number)=>{
           
            const lastTryLetter : string = lastTry.substring(index,index+1);
            
            if(lastTryLetter==letter)
            {
                similar++;
            }
        });
        this.similar = similar;
        //console.log("similar",this.similar,"rightChars",rightChars," this.canBe", this.canBe);
        this.canBe =  this.canBe && this.similar === rightChars;
    }
}