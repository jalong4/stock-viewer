export class Account {
  name: string = "";
  numStocks: number = 0;
  totalCost: number = 0;
  total: number = 0;
  dayGain: number = 0;
  percentChange: number = 0;
  profit: number = 0;
  percentProfit: number = 0;
  postMarketGain: number = 0;
  postMarketPercentChange: number = 0;

  constructor() {
    this.name = "";
    this.numStocks = 0;
    this.totalCost = 0;
    this.total = 0;
    this.dayGain = 0;
    this.percentChange= 0;
    this.profit = 0;
    this.percentProfit = 0;
    this.postMarketGain = 0;
    this.postMarketPercentChange = 0;
  }
}
