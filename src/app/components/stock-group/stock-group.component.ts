import { Component, Input, OnInit } from '@angular/core';
import { TrendingStock } from 'src/app/models/TrendingStock';
import { Utils } from 'src/app/utils/Utils';
import {
    Observable,
    Subject
} from 'rxjs';

import { MessageService } from 'src/app/services/message.service';

@Component({
    selector: 'app-stock-group',
    templateUrl: './stock-group.component.html',
    styleUrls: ['./stock-group.component.css']
})
export class StockGroupComponent implements OnInit {

    @Input() title: string = "";
    @Input() trendingStocks: TrendingStock[] = [new TrendingStock()];
    @Input() utils: Utils = new Utils();

    constructor(private messageService: MessageService) {}

    ngOnInit(): void {}

    onClick(ticker: string) {
        console.log(`clicked on stock: ${ticker}`);
        this.messageService.sendMessage({
            value: ticker,
            action: 'SHOW_TICKER'
        });
    }

}