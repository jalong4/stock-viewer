import { Component, OnInit, Input } from '@angular/core';
import { StockTableItem } from 'src/app/components/stock-table/stock-table-datasource';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  @Input() stock: StockTableItem;
  @Input() utils:Utils = new Utils();
  @Input() isStockQuery = false;

  constructor() { }

  ngOnInit(): void {
  }

}
