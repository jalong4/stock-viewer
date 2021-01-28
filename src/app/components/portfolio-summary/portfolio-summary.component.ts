import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-portfolio-summary',
  templateUrl: './portfolio-summary.component.html',
  styleUrls: ['./portfolio-summary.component.css']
})
export class PortfolioSummaryComponent implements OnInit {
  @Input() account = new Account();
  @Input() utils = new Utils();
  constructor() { }

  ngOnInit(): void {
  }


}
