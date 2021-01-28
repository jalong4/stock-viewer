import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { Utils } from 'src/app/utils/Utils';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  @Input() account: Account = new Account();
  @Input() utils:Utils = new Utils();

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();

  onClick() {
    this.notify.emit(this.account.name);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
