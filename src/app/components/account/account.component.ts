import { Component, OnInit, Input } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { Utils } from 'src/app/utils/Utils';
import { MessageService } from 'src/app/services/message.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

    @Input() account = new Account();
    @Input() utils = new Utils();


    onClick() {
        console.log(`Clicked account: ${this.account.name}`);
        this.messageService.sendMessage({ value: this.account.name, action: 'SHOW_ACCOUNT' });

    }

    constructor(private messageService: MessageService) {}

    ngOnInit(): void {}

}