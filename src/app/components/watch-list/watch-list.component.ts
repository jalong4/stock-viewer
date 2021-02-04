import { Component, Input, OnInit } from '@angular/core';
import { Utils } from 'src/app/utils/Utils';
import { StockQuoteService } from 'src/app/services/quote.service';
import { StockQuote } from 'src/app/models/StockQuote';


@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css']
})
export class WatchListComponent implements OnInit {
  utils: Utils = new Utils();

  @Input() title: string = "";
  @Input() watchList = [];

  stocks: StockQuote[] = [new StockQuote()];

  constructor(private stockQuoteService: StockQuoteService) {}

  ngOnInit(): void {
    this.stockQuoteService.setObserable(this.watchList);
    this.stockQuoteService.getStockQuote().subscribe(res => {
      if (res.error || !res.result) {
        return;
      }
      this.stocks = res.result.map(x => Object.assign(new StockQuote(), x));
    });
  }

}
