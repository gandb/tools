
export class Program
{
   public name:string;
   public argsExplanations:Array<string>; 
   public doAction: (args:Array<string>)=>Promise<void>;
   constructor(name:string, argsExplanations:Array<string>,doAction:(args:Array<string>)=>Promise<void>)
   {
    this.name = name;
    this.argsExplanations = argsExplanations;
    this.doAction = doAction;
   } 
}