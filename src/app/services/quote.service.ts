import { StockQuote } from 'src/app/models/StockQuote';
import { StockQuoteResponse } from 'src/app/models/StockQuoteResponse';
import { Injectable } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const CACHE_KEY = 'stockQuoteCache';

@Injectable({
  providedIn: 'root'
})
export class StockQuoteService {

  url: string = 'https://api.jimlong.ca';
  // url: string = 'http://localhost:3000';
  // url: string = 'https://stock-service-302608.appspot.com';
  accessToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTI0MTM2MDR9.ggxjFUmB651dnb3B8CEz7imY__8R2CBrBkkF4Ir02aE';


  stockQuotes = [new StockQuote()];
  stockQuoteResponse = new Observable<StockQuoteResponse>();
  tickers: string[] = ['.DJI', 'NDAQ', '^GSPC'];

  constructor(private http:HttpClient) {
    this.setObserable(this.tickers);
  }

  setObserable(tickers: string[]) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken,
    });

    const fullUrl = this.url + '/stocks/quote/' + tickers.toString();
    this.stockQuoteResponse = this.http.get<StockQuoteResponse>(fullUrl, { headers: headers });
    this.stockQuoteResponse.subscribe(json => {
      localStorage[CACHE_KEY] = JSON.stringify(json);
    });
    this.stockQuoteResponse = this.stockQuoteResponse.pipe(
      startWith(JSON.parse(localStorage[CACHE_KEY] || '{}'))
    )    
  }

  getStockQuote():Observable<StockQuoteResponse> {
    return this.stockQuoteResponse;
  }


}
