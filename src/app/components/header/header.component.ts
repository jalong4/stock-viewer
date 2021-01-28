import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() searchEvent = new EventEmitter<{ query? : string, action: 'SEARCH' | 'CLEAR' }>();
  constructor() { }

  ngOnInit(): void {
  }

  onSearchEvent(event: { query? : string, action: 'SEARCH' | 'CLEAR' }):void {
    console.log(event);
    this.searchEvent.emit(event);
  }

}
