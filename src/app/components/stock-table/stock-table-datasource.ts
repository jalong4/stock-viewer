import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


export interface StockTableItem {
    ticker: string;
    name: string;
    account: string;
    quantity: number;
    price: number;
    priceChange ? : number;
    percentChange: number;
    dayGain: number;
    unitCost: number;
    totalCost: number;
    total: number;
    profit: number;
    percentProfit: number;
    previousClose ? : number;
    forwardPE ? : number;
    epsCurrentYear ? : number;
    marketCapInBillions: number;
    sharesOutstanding ? : number;
    fiftyTwoWeekLow ? : number;
    fiftyTwoWeekHigh ? : number;
    postMarketPrice: number;
    postMarketChange: number;
    postMarketChangePercent: number;
    postMarketGain: number;
}

/**
 * Data source for the StockTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StockTableDataSource extends DataSource < StockTableItem > {
    // data: StockTableItem[] = EXAMPLE_DATA;
    data: StockTableItem[];
    paginator: MatPaginator;
    sort: MatSort;

    constructor() {
        super();
    }

    /**
     * Connect this data source to the table. The table will only update when
     * the returned stream emits new items.
     * @returns A stream of the items to be rendered.
     */
    connect(): Observable < StockTableItem[] > {
        // Combine everything that affects the rendered data into one update
        // stream for the data-table to consume.
        const dataMutations = [
            observableOf(this.data),
            this.paginator.page,
            this.sort.sortChange
        ];

        return merge(...dataMutations).pipe(map(() => {
            return this.getPagedData(this.getSortedData([...this.data]));
        }));
    }

    /**
     *  Called when the table is being destroyed. Use this function, to clean up
     * any open connections or free any held resources that were set up during connect.
     */
        disconnect() {}

    /**
     * Paginate the data (client-side). If you're using server-side pagination,
     * this would be replaced by requesting the appropriate data from the server.
     */
        private getPagedData(data: StockTableItem[]) {
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
    }

    /**
     * Sort the data (client-side). If you're using server-side sorting,
     * this would be replaced by requesting the appropriate data from the server.
     */
        private getSortedData(data: StockTableItem[]) {
        if (!this.sort.active || this.sort.direction === '') {
            return data;
        }

        return data.sort((a, b) => {
            const isAsc = this.sort.direction === 'asc';
            switch (this.sort.active) {
                case 'name':
                    return compare(a.name, b.name, isAsc);
                case 'account':
                    return compare(a.account, b.account, isAsc);
                case 'price':
                    return compare(a.price, b.price, isAsc);
                case 'quantity':
                    return compare(a.quantity, b.quantity, isAsc);
                case 'percentChange':
                    return compare(a.percentChange, b.percentChange, isAsc);
                case 'priceChange':
                    return compare(a.priceChange, b.priceChange, isAsc);
                case 'dayGain':
                    return compare(a.dayGain, b.dayGain, isAsc);
                case 'unitCost':
                    return compare(a.unitCost, b.unitCost, isAsc);
                case 'totalCost':
                    return compare(a.totalCost, b.totalCost, isAsc);
                case 'profit':
                    return compare(a.profit, b.profit, isAsc);
                case 'profit':
                    return compare(a.profit, b.profit, isAsc);
                case 'total':
                    return compare(a.total, b.total, isAsc);
                case 'percentProfit':
                    return compare(a.percentProfit, b.percentProfit, isAsc);
                case 'ticker':
                    return compare(a.ticker, b.ticker, isAsc);
                case 'postMarketPrice':
                    return compare(a.postMarketPrice, b.postMarketPrice, isAsc);
                case 'postMarketChange':
                    return compare(a.postMarketChange, b.postMarketChange, isAsc);
                case 'postMarketGain':
                    return compare(a.postMarketGain, b.postMarketGain, isAsc);

                default:
                    return 0;
            }
        });
    }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}