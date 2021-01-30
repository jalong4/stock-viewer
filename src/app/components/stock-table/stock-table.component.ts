import { AfterViewInit, Component, OnInit, OnDestroy, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StockTableDataSource, StockTableItem } from './stock-table-datasource';
import { Account } from 'src/app/models/Account';
import { StockSummary } from 'src/app/models/StockSummary';
import { Stock } from 'src/app/models/Stock';
import { Utils } from 'src/app/utils/Utils';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-stock-table',
    templateUrl: './stock-table.component.html',
    styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatTable) table: MatTable < StockTableItem > ;

    utils = new Utils();

    portfolio = new Portfolio();
    account = new Account();
    isStockQuery = false;
    summary = new StockSummary();
    dataSource = new StockTableDataSource();

    ticker = '';
    private subscription: Subscription;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

    displayedColumns = [
        this.isStockQuery ? 'account' : 'name',
        'price',
        'quantity',
        'percentChange',
        'priceChange',
        'dayGain',
        'unitCost',
        'totalCost',
        'profit',
        'total',
        'percentProfit',
        'ticker',
        'postMarketPrice',
        'postMarketPercentChange',
        'postMarketChange',
        'postMarketGain'
    ];

    footerDisplayedColumns = [
        this.isStockQuery ? 'account' : 'name',
        'price',
        'quantity',
        'percentChange',
        'priceChange',
        'dayGain',
        'unitCost',
        'totalCost',
        'profit',
        'total',
        'percentProfit',
        'ticker',
        'postMarketPrice',
        'postMarketPercentChange',
        'postMarketChange',
        'postMarketGain'
    ];


    constructor(private portfolioService: PortfolioService, private messageService: MessageService) {}

    ngOnInit(): void {
        console.log("ngOnInit")
        this.portfolioService.getPortfolio().subscribe(portfolio => {
            this.portfolio = portfolio;
            console.dir(portfolio);
            console.log("portfolio.subscribe");
            if (this.portfolio.summary.accounts.length) {
                this.account = this.portfolio.summary.accounts[0];
                this.refreshDataSource(this.getStocksForAccount(this.account.name));
            }
        });

        this.messageService.getMessage().subscribe((event: { value ? : string, action: string }) => {
            if (event.action === 'SHOW_TICKER') {
                this.ticker = event.value!;
                console.log(`Received new ticker in StockTableComponent: ${this.ticker}`);
                this.isStockQuery = true;
                this.refreshDataSource(this.getStocksForTicker(this.ticker));
            } else if (event.action === 'SHOW_ACCOUNT') {
                const accountName = event.value!;
                console.log(`Received new account in StockTableComponent: ${accountName}`);
                this.isStockQuery = false;
                this.account = this.portfolio.summary.accounts.filter(a => a.name === accountName)[0];
                this.refreshDataSource(this.getStocksForAccount(accountName));
            } else {
                if (this.portfolio.summary.accounts.length) {
                    this.account = this.portfolio.summary.accounts[0];
                    this.isStockQuery = false;
                    this.refreshDataSource(this.getStocksForAccount(this.account.name));
                }
            }
        });
    }

    ngAfterViewInit() {
        console.log("ngAfterViewInit")
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getTitle(): string {
        return this.isStockQuery ? this.dataSource.data[0].name : this.account.name + ' Stocks';
    }

    getQuantityTotal(quantity: number): string {
        if (this.isStockQuery) {
            return this.utils.numberWithCommas(quantity)
        }
        return "";
    }

    getSummary(): StockSummary {

        return (this.isStockQuery ? this.getStockSummary() : this.getAccountSummary());
    }

    getStockSummary(): StockSummary {
        const stocks = this.dataSource.data;
        var result = new StockSummary();
        const quantity = stocks.reduce((sum, a) => sum + a.quantity, 0);
        const total = stocks.reduce((sum, a) => sum + a.total, 0);
        const totalCost = stocks.reduce((sum, a) => sum + a.totalCost, 0);
        var postMarketGain = stocks.reduce((sum, a) => sum + a.postMarketGain, 0);

        var dayGain = stocks.reduce((sum, a) => sum + a.dayGain, 0);
        const profit = stocks.reduce((sum, a) => sum + a.profit, 0);
        const percentChange = ((total - dayGain) == 0) ? 0 : (dayGain / (total - dayGain));
        const percentProfit = (totalCost == 0) ? ((profit == 0) ? 0 : 1) : (profit / totalCost);
        const postMarketPercentChange = (total == 0) ? 0 : (postMarketGain / total);

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

    getAccountSummary(): StockSummary {
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

    refreshDataSource(stocks: StockTableItem[]) {
        this.summary = this.getSummary();
        this.dataSource.data = [...(stocks)];
        this.paginator._changePageSize(this.paginator.pageSize);
        this.table.renderRows();
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

}