import { Injectable } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { Portfolio } from 'src/app/models/Portfolio';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const CACHE_KEY = 'portfolioCache';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  url: string = 'https://api.jimlong.ca';
  // url: string = 'http://localhost:3000';
  // url: string = 'https://stock-service-302608.appspot.com';
  accessToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTI0MTM2MDR9.ggxjFUmB651dnb3B8CEz7imY__8R2CBrBkkF4Ir02aE';

  portfolio: Observable<Portfolio>

  constructor(private http:HttpClient) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
    });

    this.portfolio = http.get<Portfolio>(this.url + '/stocks', { headers: headers });

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
