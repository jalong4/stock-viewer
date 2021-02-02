import { StockQuote } from 'src/app/models/StockQuote';

export class StockQuoteResponse {
  error?: string;
  result: StockQuote[] = [new StockQuote()];
}
