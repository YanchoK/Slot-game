import configuration from "./configuration"

interface IReel{
    id:number
    currentPosition:number
    symbols:number[]
}


export class Reel implements IReel{
    constructor( id:number){
        this.id=id
        this.currentPosition=0
        this.symbols=configuration.reels[id]
    }

    public id:number
    public currentPosition:number
    public symbols:number[]
}