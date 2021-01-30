import { AfterViewInit, Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { StockTableDataSource, StockTableItem } from './stock-table-datasource';
import { Account } from 'src/app/models/Account';
import { StockSummary } from 'src/app/models/StockSummary';
import { Stock } from 'src/app/models/Stock';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StockTableItem>;

  utils = new Utils();

  @Input() account = new Account();
  @Input() isStockQuery = false;
  @Input() summary = new StockSummary();
  @Input() dataSource = new StockTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  displayedColumns = [
    // this.isStockQuery ? 'account' : 'name',
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
    'quantity',
    'percentChange',
    'dayGain',
    'totalCost',
    'profit',
    'total',
    'percentProfit',
    'postMarketPercentChange',
    'postMarketGain'
  ];

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  getTitle():string {
    return this.isStockQuery ? this.dataSource.data[0].name : this.account.name + ' Stocks';
  }

  getQuantityTotal(quantity: number): string {
    if (this.isStockQuery) {
      return this.utils.numberWithCommas(quantity)
    }
    return "";
  }

}
