export class StockQuote {
	symbol = "";
	shortName = "";
	regularMarketPrice = 0;
	regularMarketChange = 0;

	getPercentChange() {
		if (this.regularMarketPrice - this.regularMarketChange == 0) {
			return 0;
		}
		return this.regularMarketChange / (this.regularMarketPrice - this.regularMarketChange);		
	}

}
