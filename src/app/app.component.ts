import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { StockTableDataSource, StockTableItem } from 'src/app/components/stock-table/stock-table-datasource';
import { Account } from './models/Account';
import { Stock } from './models/Stock';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'stock-viewer';

    portfolio: Portfolio = new Portfolio();
    private subscription: Subscription;

    constructor(private portfolioService: PortfolioService,
        private messageService: MessageService) {}

    ngOnInit(): void {
        this.portfolioService.getPortfolio().subscribe(portfolio => {
            this.portfolio = portfolio;
            console.dir(portfolio);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}