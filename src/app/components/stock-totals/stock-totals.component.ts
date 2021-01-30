import { Component, OnInit, Input } from '@angular/core';
import { StockSummary } from 'src/app/models/StockSummary';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-stock-totals',
  templateUrl: './stock-totals.component.html',
  styleUrls: ['./stock-totals.component.css']
})
export class StockTotalsComponent implements OnInit {
  utils = new Utils();
  @Input() isStockQuery = false;
  @Input() accountName = "";
  @Input() summary = new StockSummary();

  constructor() { }

  ngOnInit(): void {
  }

  getQuantity():string {
    return this.utils.numberWithCommas(this.summary.quantity);
  }

  getPercentChange():string {
    return this.utils.getPercent(this.summary.percentChange);
  }

  getDayGain():string {
    return this.utils.numberWithCommas(this.summary.dayGain);
  }

  getTotalCost():string {
    return this.utils.numberWithCommas(this.summary.totalCost)
  }

  getProfit():string {
    return this.utils.numberWithCommas(this.summary.profit);
  }

  getTotal():string {
    return this.utils.numberWithCommas(this.summary.total)
  }

  getPercentProfit():string {
    return this.utils.getPercent(this.summary.percentProfit);
  }

  getPostMarketPercentChange() {
    return this.utils.getPercent(this.summary.postMarketPercentChange);
  }
  getPostMarketGainClass() {
    return this.utils.numberWithCommas(this.summary.postMarketGain);
  }

  getPostMarketGain() {
    return this.utils.numberWithCommas(this.summary.postMarketGain);
  }

}
