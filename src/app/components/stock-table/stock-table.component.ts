import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StockTableDataSource, StockTableItem } from './stock-table-datasource';
import { Account } from 'src/app/models/Account';
import { StockSummary } from 'src/app/models/StockSummary';
import { Utils } from 'src/app/utils/Utils';
import { Portfolio } from 'src/app/models/Portfolio';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { MessageService } from 'src/app/services/message.service';


@Component({
    selector: 'app-stock-table',
    templateUrl: './stock-table.component.html',
    styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements AfterViewInit, OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatTable) table!: MatTable < StockTableItem > ;

    utils = new Utils();

    portfolio = new Portfolio();
    account = new Account();
    isStockQuery = false;
    summary = new StockSummary();
    dataSource = new StockTableDataSource();

    ticker = '';

    isPostMarketDataAvailable = true;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    postMarketColumns = [
        'postMarketPrice',
        'postMarketChangePercent',
        'postMarketChange',
        'postMarketGain'
    ];

    displayedColumnsWithoutPostMarket = [
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
        'ticker'
    ];

    displayedColumns: string[] = [];

    constructor(private portfolioService: PortfolioService, private messageService: MessageService) {}

    ngOnInit(): void {
        this.portfolioService.getPortfolio().subscribe(portfolio => {
            this.portfolio = portfolio;
            console.dir(portfolio);
            if (this.portfolio.summary && this.portfolio.summary.accounts && this.portfolio.summary.accounts.length) {
                this.account = this.portfolio.summary.accounts[0];
                console.dir(this.account);
                this.refreshDataSource(this.getStocksForAccount(this.account.name));
            }
        });

        this.messageService.getMessage().subscribe((event: { value ? : string, action: string }) => {
            if (event.action === 'SHOW_TICKER') {
                this.ticker = event.value!;
                this.isStockQuery = true;
                this.refreshDataSource(this.getStocksForTicker(this.ticker));
            } else if (event.action === 'SHOW_ACCOUNT') {
                const accountName = event.value!;
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
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }

    updateDisplayedColumns() {
        const firstColumn = this.isStockQuery ? ['account'] : ['name'];
        const withoutPostMarket = firstColumn.concat(this.displayedColumnsWithoutPostMarket);
        this.isPostMarketDataAvailable = (this.portfolio.stocks.reduce((sum, a) => sum + a.postMarketChange, 0)) != 0;
        this.displayedColumns = this.isPostMarketDataAvailable
            ? withoutPostMarket.concat(this.postMarketColumns)
            : withoutPostMarket;
    }

    getTitle(): string {
        return this.isStockQuery ? this.dataSource.data[0].name : this.account.name + ' Account';
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
        const postMarketChangePercent = (total == 0) ? 0 : (postMarketGain / total);

        result.quantity = quantity;
        result.percentChange = percentChange;
        result.dayGain = dayGain;
        result.totalCost = totalCost;
        result.profit = profit;
        result.total = total;
        result.percentProfit = percentProfit;
        result.postMarketGain = postMarketGain;
        result.postMarketChangePercent = postMarketChangePercent;

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
        result.postMarketChangePercent = this.account.postMarketChangePercent;

        return result;
    }

    refreshDataSource(stocks: StockTableItem[]) {
        this.dataSource.data = [...(stocks)];
        this.summary = this.getSummary();
        if (this.paginator && this.paginator.pageSize !== null) {
            this.paginator._changePageSize(this.paginator.pageSize);
            this.table.renderRows();
        }
        this.updateDisplayedColumns();
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