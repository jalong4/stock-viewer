import { StockQuote } from 'src/app/models/StockQuote';
import { StockQuoteResponse } from 'src/app/models/StockQuoteResponse';
import { Injectable } from '@angular/core';
import { startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const CACHE_KEY = 'stockQuoteCache';

@Injectable({
  providedIn: 'root'
})
export class StockQuoteService {

  // url: string = 'https://api.jimlong.ca';
  // url: string = 'localhost:3000';
  url: string = 'https://stock-service-302608.wn.r.appspot.com';


  tickers: string[] = ['.DJI', 'NDAQ', '^GSPC'];
  stockQuotes = [new StockQuote()];
  stockQuoteResponse = new Observable<StockQuoteResponse>();

  constructor(private http:HttpClient) {
    this.setObserable(this.tickers);
  }

  setObserable(tickers: string[]) {
    const fullUrl = this.url + '/stocks/quote/' + tickers.toString();
    this.stockQuoteResponse = this.http.get<StockQuoteResponse>(fullUrl);
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
