import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Account } from 'src/app/models/Account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  @Input() accounts= [new Account()];
  @Input() prefix = "";
  @Output() notify = new EventEmitter<string>();

  onNotifyAccountName(account:string):void {
    console.log(account);
    this.notify.emit(account);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
