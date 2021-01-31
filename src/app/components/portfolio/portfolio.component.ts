import { Component, Input } from '@angular/core';
import { Account } from 'src/app/models/Account';
import { Portfolio } from 'src/app/models/Portfolio';
import { Utils } from 'src/app/utils/Utils';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
    @Input() account = new Account();
    @Input() portfolio = new Portfolio();
    @Input() utils = new Utils();

}