import { Component, OnInit } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'stock-viewer';

    portfolio: Portfolio = new Portfolio();

    constructor(private portfolioService: PortfolioService,
        private messageService: MessageService) {}

    ngOnInit(): void {
        this.portfolioService.getPortfolio().subscribe(portfolio => {
            console.dir(portfolio);
            this.portfolio = portfolio;
        });
    }
}