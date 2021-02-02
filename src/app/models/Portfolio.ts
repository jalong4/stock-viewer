import { StockGains } from "./StockGains";
import { Summary } from "./Summary";
import { Account } from "./Account";
import { Stock } from "./Stock";

export class Portfolio {
  summary: Summary = new Summary();
  stocks: Stock[] = [];
}
