import { Component, Input, OnInit } from '@angular/core';
import { StockGains } from 'src/app/models/StockGains';
import { Utils } from 'src/app/utils/Utils';
import { MessageService } from 'src/app/services/message.service';

@Component({
    selector: 'app-stock-group',
    templateUrl: './stock-group.component.html',
    styleUrls: ['./stock-group.component.css']
})
export class StockGroupComponent implements OnInit {

    @Input() title: string = "";
    @Input() stockGains: StockGains[] = [new StockGains()];
    utils: Utils = new Utils();

    constructor(private messageService: MessageService) {}

    ngOnInit(): void {}

    onClick(ticker: string) {
        this.messageService.sendMessage({
            value: ticker,
            action: 'SHOW_TICKER'
        });
    }

}