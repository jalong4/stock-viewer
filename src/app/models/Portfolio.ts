import { Summary } from "./Summary";
import { Stock } from "./Stock";

export class Portfolio {
  summary: Summary = new Summary();
  stocks: Stock[] = [];
}
