import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Summary } from 'src/app/models/Summary';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  @Input() summary = new Summary();
  @Output() stockClickedEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onStockClickedEvent(ticker: string):void {
    console.log(ticker);
    this.stockClickedEvent.emit(ticker);
  }

}
