import { Component, Input } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { StockTableDataSource, StockTableItem } from 'src/app/components/stock-table/stock-table-datasource';
import { Account } from './models/Account';
import { Stock } from './models/Stock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-viewer';

  portfolio: Portfolio = new Portfolio();
  account: Account = new Account();
  dataSource = new StockTableDataSource();
  searchTerm = '';

  onNotifyAccountName(accountName:string):void {
    this.account = this.portfolio.summary.accounts.filter(a => a.name === accountName)[0];
    this.refreshDataSource(this.getStocksForAccount(accountName));

  }

  onSearchEvent(event: { query? : string, action: 'SEARCH' | 'CLEAR' }):void {
    if (event.action === 'SEARCH') {
      this.searchTerm = event.query!;
      this.account = new Account();;
      this.refreshDataSource(this.getStocksForTicker(this.searchTerm));
    } else {
      if (this.portfolio.summary.accounts.length) {
          this.account = this.portfolio.summary.accounts[0];
          this.refreshDataSource(this.getStocksForAccount(this.account.name));
      }
    }
  }

  onStockClickedEvent(ticker: string):void {
    console.log(event);
    this.account = new Account();
    this.refreshDataSource(this.getStocksForTicker(ticker));
  }

  refreshDataSource(stocks: StockTableItem[]) {
    this.dataSource.data = [...stocks];
    // this.dataSource.connect().next(stocks);
    // this.paginator._changePageSize(this.paginator.pageSize);
    console.dir(this.dataSource.data);
  }


  getStocksForAccount(accountName: string) {
    var stocks = this.portfolio.stocks.filter(stock => stock.account === accountName);
		stocks.sort(function(a, b) {
			return ((a.ticker < b.ticker) || a.name === "Cash") ? -1 : a.ticker > b.ticker ? 1 : 0;
		});

    return stocks;
  }

  getStocksForTicker(ticker: string) {
    return this.portfolio.stocks.filter(stock => stock.ticker === ticker);
  }

  constructor(private portfolioService:PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.getPortfolio().subscribe( portfolio=> {
      this.portfolio = portfolio;
      if (this.portfolio.summary.accounts.length) {
          this.account = this.portfolio.summary.accounts[0];
          this.refreshDataSource(this.getStocksForAccount(this.account.name));
      }
    });
  }

}
