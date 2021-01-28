import { Component, OnInit, Input } from '@angular/core';
import { Stock } from 'src/app/models/Stock';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  @Input() stock: Stock = new Stock();
  @Input() utils:Utils = new Utils();
  @Input() isStockQuery = false;

  constructor() { }

  ngOnInit(): void {
  }

}
