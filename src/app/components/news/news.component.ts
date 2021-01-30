import { Component, OnInit, Input } from '@angular/core';
import { Summary } from 'src/app/models/Summary';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
    @Input() summary = new Summary();
    constructor() {}
    ngOnInit(): void {}

}