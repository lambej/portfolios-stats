export class Quote {
    
    constructor ( symbol: string, 
        
        //open: number, 
        //high: number, 
        //low: number, 
        price: number,
        percent:number) {
        //volume: number, 
        //latestTradingDay: string, 
        //previousClose: number, 
        //change: number, 
        //changePercent: number ) {
        this.symbol = symbol;
        
       // this.open = open;
       // this.high = high;
       // this.low = low;
        this.price = price;
        this.percent = percent;
       // this.volume = volume;
      //  this.latestTradingDay = latestTradingDay;
       // this.previousClose = previousClose;
       // this.change = change;
        //this.changePercent = changePercent;
    }

    symbol: string;
    percent:number;
    //open: number;
    //high: number;
    //low: number;
    price: number;
    //volume: number;
    //latestTradingDay: string;
    //previousClose: number;
    //change: number;
    //changePercent: number;
}