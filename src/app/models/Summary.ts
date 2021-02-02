import { StockGains } from "./StockGains";
import { Account } from "./Account";

export class Summary {
  totals: Account = new Account();
  accounts: Account[] = [new Account()];
  topDayGainers: StockGains[] = [new StockGains()];
  topDayLosers: StockGains[] = [new StockGains()];
  mostProfitable: StockGains[] = [new StockGains()];
  leastProfitable: StockGains[] = [new StockGains()];
}
