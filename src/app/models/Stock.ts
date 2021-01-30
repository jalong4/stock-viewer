import { StockTableItem } from 'src/app/components/stock-table/stock-table-datasource';

export class Stock implements StockTableItem {
  ticker = "";
  name = "";
  account = "";
  quantity = 0;
  price = 0;
  priceChange? = 0;
  percentChange = 0;
  dayGain = 0;
  unitCost = 0;
  totalCost = 0;
  total = 0;
  profit = 0;
  percentProfit = 0;
  previousClose = 0;
  marketCapInBillions = 0;
  fiftyTwoWeekLow = 0;
  fiftyTwoWeekHigh = 0;
  postMarketPrice = 0;
  postMarketChange = 0;
  postMarketChangePercentage = 0;
  postMarketGain = 0;
}
