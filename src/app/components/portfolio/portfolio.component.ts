import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Portfolio } from 'src/app/models/Portfolio';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

@Input() portfolio: Portfolio = new Portfolio();
@Output() notify: EventEmitter<string> = new EventEmitter<string>();

  onNotifyClicked(account:string):void {
    console.log(account);
    this.notify.emit(account);
  }

ngOnInit() {

  }
}
