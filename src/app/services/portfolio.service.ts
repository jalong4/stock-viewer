import { Injectable } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { Portfolio } from 'src/app/models/Portfolio';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const CACHE_KEY = 'portfolioCache';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  url: string = 'https://api.jimlong.ca/stocks';
  portfolio: Observable<Portfolio>

  constructor(private http:HttpClient) {
    this.portfolio = http.get<Portfolio>(this.url);

    this.portfolio.subscribe(json => {
      localStorage[CACHE_KEY] = JSON.stringify(json);
    });
    this.portfolio = this.portfolio.pipe(
      startWith(JSON.parse(localStorage[CACHE_KEY] || '{}'))
    )
  }

  getPortfolio():Observable<Portfolio> {
    return this.portfolio;
  }


}
