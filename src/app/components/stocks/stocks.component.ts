import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { Stock } from 'src/app/models/Stock';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  @Input() stocks: Stock[] = [new Stock()];
  @Input() account: Account = new Account();
  @Input() utils:Utils = new Utils();
  constructor() { }

  ngOnInit(): void {
  }

}
