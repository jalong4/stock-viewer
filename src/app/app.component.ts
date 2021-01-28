import { Component, Input } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Account } from './models/Account';
import { Stock } from './models/Stock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-viewer';

  @Input() portfolio: Portfolio = new Portfolio();
  @Input() stocks: Stock[] = [new Stock()];
  @Input() account: Account = new Account();

  onNotifyClicked(accountName:string):void {
    this.account = this.portfolio.summary.accounts.filter(a => a.name === accountName)[0];
    this.stocks = this.getStocksForAccount(accountName);
  }

  getStocksForAccount(accountName: string) {
    return this.portfolio.stocks.filter(stock => stock.account === accountName && stock.name !== "Cash");
  }

  constructor(private portfolioService:PortfolioService) { }

  ngOnInit(): void {
    this.portfolioService.getPortfolio().subscribe( portfolio=> {
      this.portfolio = portfolio;
      if (this.portfolio.summary.accounts.length) {
          this.account = this.portfolio.summary.accounts[0];
          this.stocks = this.getStocksForAccount(this.account.name);
      }
    });
  }

}
