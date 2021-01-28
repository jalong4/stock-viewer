import { TrendingStock } from "./TrendingStock";
import { Account } from "./Account";
import { Stock } from "./Stock";

export class Summary {
  totals: Account = new Account();
  accounts: Account[] = [new Account()];
  topDayGainers: TrendingStock[] = [new TrendingStock()];
  topDayLosers: TrendingStock[] = [new TrendingStock()];
  mostProfitable: TrendingStock[] = [new TrendingStock()];
  leastProfitable: TrendingStock[] = [new TrendingStock()];
}
