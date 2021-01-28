import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TrendingStock } from 'src/app/models/TrendingStock';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-stock-group',
  templateUrl: './stock-group.component.html',
  styleUrls: ['./stock-group.component.css']
})
export class StockGroupComponent implements OnInit {

  @Input() title: string = "";
  @Input() trendingStocks: TrendingStock[] = [new TrendingStock()];
  @Input() utils:Utils = new Utils();

  @Output() stockClickedEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(ticker: string) {
    console.log(`clicked on stock: ${ticker}`);
    this.stockClickedEvent.emit(ticker);
  }

}
