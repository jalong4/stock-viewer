import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { StockSummary } from 'src/app/models/StockSummary';
import { Stock } from 'src/app/models/Stock';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  @Input() stocks = [new Stock()];
  @Input() account = new Account();
  @Input() utils = new Utils();
  @Input() isStockQuery = false;
  constructor() { }

  ngOnInit(): void {
  }

  getTitle():string {
    this.isStockQuery = [...new Set(this.stocks.map(({ ticker }) => ticker))].length === 1;
    return this.isStockQuery ? this.stocks[0].name : this.account.name + ' Stocks';
  }

  getSummary():StockSummary {
    return (this.isStockQuery ? this.getStockSummary() : this.getAccountSummary());
  }

  getStockSummary():StockSummary {
    var result = new StockSummary();
    const quantity = this.stocks.reduce((sum, a) => sum + a.quantity, 0);
    const total = this.stocks.reduce((sum, a) => sum + a.total, 0);
    const totalCost = this.stocks.reduce((sum, a) => sum + a.totalCost, 0);
    var postMarketGain = this.stocks.reduce((sum, a) => sum + a.postMarketGain, 0);

    var dayGain = this.stocks.reduce((sum, a) => sum + a.dayGain, 0);
    const profit = this.stocks.reduce((sum, a) => sum + a.profit, 0);
    const percentChange = ((total - dayGain) == 0) ? 0 : (dayGain / (total - dayGain));
    const percentProfit = (totalCost == 0) ? ((profit == 0) ? 0 : 1) : (profit / totalCost);
    const postMarketPercentChange = (total == 0 || postMarketGain) ? 0 : (postMarketGain / total);

    result.quantity = quantity;
    result.percentChange = percentChange;
    result.dayGain = dayGain;
    result.totalCost = totalCost;
    result.profit = profit;
    result.total = total;
    result.percentProfit = percentProfit;
    result.postMarketGain = postMarketGain;
    result.postMarketPercentChange = postMarketPercentChange;

    return result;
  }

  getAccountSummary():StockSummary {
    var result = new StockSummary();

    result.quantity = 0;
    result.percentChange = this.account.percentChange;
    result.dayGain = this.account.dayGain;
    result.totalCost = this.account.totalCost;
    result.profit = this.account.profit;
    result.total = this.account.total;
    result.percentProfit = this.account.percentProfit;
    result.postMarketGain = this.account.postMarketGain;
    result.postMarketPercentChange = this.account.postMarketPercentChange;

    return result;
  }

}
