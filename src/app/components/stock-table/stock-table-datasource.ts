import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';


export interface StockTableItem {
  ticker: string;
  name: string;
  account: string;
  quantity: number;
  price: number;
  priceChange?: number;
  percentChange: number;
  dayGain: number;
  unitCost: number;
  totalCost: number;
  total: number;
  profit: number;
  percentProfit: number;
  previousClose?: number;
  forwardPE?: number;
  epsCurrentYear?: number;
  marketCapInBillions: number;
  sharesOutstanding?: number;
  fiftyTwoWeekLow?: number;
  fiftyTwoWeekHigh?: number;
  postMarketPrice: number;
  postMarketChange: number;
  postMarketChangePercentage: number;
  postMarketGain: number;
}

const EXAMPLE_DATA: StockTableItem[] = [
{
"ticker": "ARKF",
"name": "ARK Fintech Innovation ETF",
"account": "Fidelity",
"quantity": 150,
"price": 52.76,
"priceChange": 1.2799988,
"percentChange": 0.024864000974421114,
"dayGain": 191.99982,
"unitCost": 33.96,
"totalCost": 5094,
"total": 7914,
"profit": 2820,
"percentProfit": 0.5535924617196702,
"previousClose": 51.48,
"marketCapInBillions": 0,
"fiftyTwoWeekLow": 16.94,
"fiftyTwoWeekHigh": 56.21,
"postMarketPrice": 52.8,
"postMarketChange": 0.0400009,
"postMarketChangePercentage": 0.0007581671721000759,
"postMarketGain": 6.000135
},
{
"ticker": "ARKG",
"name": "ARK Genomic Revolution ETF",
"account": "Fidelity",
"quantity": 500,
"price": 103.27,
"priceChange": 2.5599976,
"percentChange": 0.025419496961505385,
"dayGain": 1279.9988,
"unitCost": 87.874,
"totalCost": 43937,
"total": 51635,
"profit": 7698,
"percentProfit": 0.1752054077429046,
"previousClose": 100.71,
"marketCapInBillions": 0,
"fiftyTwoWeekLow": 24,
"fiftyTwoWeekHigh": 114.83,
"postMarketPrice": 102.9,
"postMarketChange": -0.36999512,
"postMarketChangePercentage": -0.0035827938413866564,
"postMarketGain": -184.99756
},
{
"ticker": "ARKK",
"name": "ARK Innovation ETF",
"account": "Fidelity",
"quantity": 75,
"price": 140.37,
"priceChange": 2.019989,
"percentChange": 0.014600569854670991,
"dayGain": 151.49917499999998,
"unitCost": 80.58,
"totalCost": 6043.5,
"total": 10527.75,
"profit": 4484.25,
"percentProfit": 0.7419955323901712,
"previousClose": 138.35,
"marketCapInBillions": 0,
"fiftyTwoWeekLow": 33,
"fiftyTwoWeekHigh": 149.85,
"postMarketPrice": 139.57,
"postMarketChange": -0.7999878,
"postMarketChangePercentage": -0.005699136567642659,
"postMarketGain": -59.999085
},
{
"ticker": "ARKQ",
"name": "ARK Autonomous Technology & Rob",
"account": "Fidelity",
"quantity": 100,
"price": 89.52,
"priceChange": -0.1800003,
"percentChange": -0.0020066923009809624,
"dayGain": -18.00003,
"unitCost": 52.26,
"totalCost": 5226,
"total": 8952,
"profit": 3726,
"percentProfit": 0.7129735935706085,
"previousClose": 89.7,
"marketCapInBillions": 0,
"fiftyTwoWeekLow": 26.19,
"fiftyTwoWeekHigh": 94.27,
"postMarketPrice": 89.27,
"postMarketChange": -0.25,
"postMarketChangePercentage": -0.0027926720285969616,
"postMarketGain": -25
},
{
"ticker": "ARKW",
"name": "ARK Next Generation Internet ET",
"account": "Fidelity",
"quantity": 50,
"price": 160.98,
"priceChange": 2.4099884,
"percentChange": 0.015198260854513302,
"dayGain": 120.49942,
"unitCost": 94.385,
"totalCost": 4719.25,
"total": 8048.999999999999,
"profit": 3329.749999999999,
"percentProfit": 0.7055676219738304,
"previousClose": 158.57,
"marketCapInBillions": 0,
"fiftyTwoWeekLow": 40.495,
"fiftyTwoWeekHigh": 169.905,
"postMarketPrice": 159,
"postMarketChange": -1.9799957,
"postMarketChangePercentage": -0.012299637843210337,
"postMarketGain": -98.999785
},
{
"ticker": "BYND",
"name": "Beyond Meat, Inc.",
"account": "Fidelity",
"quantity": 250,
"price": 179.79,
"priceChange": -12.290009,
"percentChange": -0.06398380062549872,
"dayGain": -3072.50225,
"unitCost": 124.91688,
"totalCost": 31229.22,
"total": 44947.5,
"profit": 13718.279999999999,
"percentProfit": 0.4392770616749313,
"previousClose": 192.08,
"forwardPE": 998.83325,
"epsCurrentYear": -0.36,
"marketCapInBillions": 11.264868352,
"sharesOutstanding": 62655700,
"fiftyTwoWeekLow": 48.18,
"fiftyTwoWeekHigh": 221,
"postMarketPrice": 179.78,
"postMarketChange": -0.00999451,
"postMarketChangePercentage": -0.00005558991045108182,
"postMarketGain": -2.4986275
},
{
"ticker": "DBX",
"name": "Dropbox, Inc.",
"account": "Fidelity",
"quantity": 1500,
"price": 23.085,
"priceChange": -1.1750011,
"percentChange": -0.048433678760220665,
"dayGain": -1762.50165,
"unitCost": 21.419053333333334,
"totalCost": 32128.58,
"total": 34627.5,
"profit": 2498.9199999999983,
"percentProfit": 0.07777872535916615,
"previousClose": 24.26,
"forwardPE": 22.197115,
"epsCurrentYear": 0.89,
"marketCapInBillions": 9.548347392,
"sharesOutstanding": 315879008,
"fiftyTwoWeekLow": 14.55,
"fiftyTwoWeekHigh": 25.16,
"postMarketPrice": 23.14,
"postMarketChange": 0.055000305,
"postMarketChangePercentage": 0.002382512670565302,
"postMarketGain": 82.5004575
},
{
"ticker": "GOOG",
"name": "Alphabet Inc.",
"account": "Fidelity",
"quantity": 10,
"price": 1863.11,
"priceChange": 32.319946,
"percentChange": 0.0176535512247217,
"dayGain": 323.19946000000004,
"unitCost": 1731.065,
"totalCost": 17310.65,
"total": 18631.1,
"profit": 1320.449999999997,
"percentProfit": 0.07627963132522447,
"previousClose": 1830.79,
"forwardPE": 30.21586,
"epsCurrentYear": 51.98,
"marketCapInBillions": 1256.077000704,
"sharesOutstanding": 329867008,
"fiftyTwoWeekLow": 1013.536,
"fiftyTwoWeekHigh": 1934.86,
"postMarketPrice": 1855.82,
"postMarketChange": -7.290039,
"postMarketChangePercentage": -0.003912833380745099,
"postMarketGain": -72.90039
},
{
"ticker": "JWN",
"name": "Nordstrom, Inc.",
"account": "Fidelity",
"quantity": 1100,
"price": 36.4,
"priceChange": -2.8499985,
"percentChange": -0.07261142952655145,
"dayGain": -3134.99835,
"unitCost": 13.41770909090909,
"totalCost": 14759.48,
"total": 40040,
"profit": 25280.52,
"percentProfit": 1.7128327014230855,
"previousClose": 39.25,
"forwardPE": 24.761906,
"epsCurrentYear": -4.38,
"marketCapInBillions": 5.739697664,
"sharesOutstanding": 157684000,
"fiftyTwoWeekLow": 11.72,
"fiftyTwoWeekHigh": 42.22,
"postMarketPrice": 36.5,
"postMarketChange": 0.0999985,
"postMarketChangePercentage": 0.0027472115384615386,
"postMarketGain": 109.99835
},
{
"ticker": "MSTR",
"name": "MicroStrategy Incorporated",
"account": "Fidelity",
"quantity": 50,
"price": 578.375,
"priceChange": 38.275024,
"percentChange": 0.07086655378781206,
"dayGain": 1913.7512000000002,
"unitCost": 360.675,
"totalCost": 18033.75,
"total": 28918.75,
"profit": 10885,
"percentProfit": 0.6035904900533722,
"previousClose": 540.1,
"forwardPE": 86.583084,
"epsCurrentYear": 5.79,
"marketCapInBillions": 5.3597952,
"sharesOutstanding": 7252960,
"fiftyTwoWeekLow": 90,
"fiftyTwoWeekHigh": 631.6,
"postMarketPrice": 615,
"postMarketChange": 36.625,
"postMarketChangePercentage": 0.06332396801383186,
"postMarketGain": 1831.25
},
{
"ticker": "PCAR",
"name": "PACCAR Inc.",
"account": "Fidelity",
"quantity": 50,
"price": 93.55,
"priceChange": -2.8499985,
"percentChange": -0.02956430025255654,
"dayGain": -142.499925,
"unitCost": 99.995,
"totalCost": 4999.75,
"total": 4677.5,
"profit": -322.25,
"percentProfit": -0.06445322266113306,
"previousClose": 96.4,
"forwardPE": 14.088856,
"epsCurrentYear": 5.69,
"marketCapInBillions": 32.424431616,
"sharesOutstanding": 346600000,
"fiftyTwoWeekLow": 49.11,
"fiftyTwoWeekHigh": 103.19,
"postMarketPrice": 93.31,
"postMarketChange": -0.240005,
"postMarketChangePercentage": -0.002565526456440406,
"postMarketGain": -12.00025
},
{
"ticker": "PLNHF",
"name": "PLANET 13 HOLDINGS INC",
"account": "Fidelity",
"quantity": 5000,
"price": 5.54,
"priceChange": 0.27038908,
"percentChange": 0.051311014058700186,
"dayGain": 1351.9454,
"unitCost": 2.997046,
"totalCost": 14985.23,
"total": 27700,
"profit": 12714.77,
"percentProfit": 0.8484868100122588,
"previousClose": 5.26961,
"forwardPE": 50.363636,
"epsCurrentYear": -0.02,
"marketCapInBillions": 0.954985216,
"sharesOutstanding": 169796000,
"fiftyTwoWeekLow": 5.087,
"fiftyTwoWeekHigh": 6.32,
"postMarketPrice": 0,
"postMarketChange": 0,
"postMarketChangePercentage": 0,
"postMarketGain": 0
},
{
"ticker": "SPAXX",
"name": "Cash",
"account": "Fidelity",
"quantity": 159079.68,
"price": 1,
"percentChange": 0,
"dayGain": 0,
"unitCost": 0,
"totalCost": 0,
"total": 159079.68,
"profit": 0,
"percentProfit": 0,
"marketCapInBillions": 0,
"postMarketPrice": 0,
"postMarketChange": 0,
"postMarketChangePercentage": 0,
"postMarketGain": 0
},
{
"ticker": "TPR",
"name": "Tapestry, Inc.",
"account": "Fidelity",
"quantity": 500,
"price": 32.37,
"priceChange": 1.7599983,
"percentChange": 0.05749749108965257,
"dayGain": 879.99915,
"unitCost": 12.75,
"totalCost": 6375,
"total": 16184.999999999998,
"profit": 9809.999999999998,
"percentProfit": 1.5388235294117645,
"previousClose": 30.61,
"forwardPE": 12.261363,
"epsCurrentYear": 2.35,
"marketCapInBillions": 8.97959936,
"sharesOutstanding": 277404992,
"fiftyTwoWeekLow": 10.18,
"fiftyTwoWeekHigh": 35.45,
"postMarketPrice": 32.4,
"postMarketChange": 0.030002594,
"postMarketChangePercentage": 0.0009268641952425086,
"postMarketGain": 15.001297000000001
},
{
"ticker": "TSLA",
"name": "Tesla, Inc.",
"account": "Fidelity",
"quantity": 1150,
"price": 835.43,
"priceChange": -28.72998,
"percentChange": -0.03324613574444862,
"dayGain": -33039.477,
"unitCost": 45.23057391304348,
"totalCost": 52015.16,
"total": 960744.5,
"profit": 908729.34,
"percentProfit": 17.470470916555865,
"previousClose": 864.16,
"forwardPE": 153.57169,
"epsCurrentYear": 4.09,
"marketCapInBillions": 791.90491136,
"sharesOutstanding": 947900992,
"fiftyTwoWeekLow": 70.102,
"fiftyTwoWeekHigh": 900.4,
"postMarketPrice": 829.45,
"postMarketChange": -5.9799805,
"postMarketChangePercentage": -0.007157967154638929,
"postMarketGain": -6876.977575
},
{
"ticker": "TTCF",
"name": "Tattooed Chef, Inc.",
"account": "Fidelity",
"quantity": 2000,
"price": 23.8,
"priceChange": -0.48000145,
"percentChange": -0.019769416035187264,
"dayGain": -960.0029,
"unitCost": 20.23075,
"totalCost": 40461.5,
"total": 47600,
"profit": 7138.5,
"percentProfit": 0.17642697378989905,
"previousClose": 24.28,
"epsCurrentYear": 0.16,
"marketCapInBillions": 1.702916224,
"sharesOutstanding": 71551104,
"fiftyTwoWeekLow": 10.33,
"fiftyTwoWeekHigh": 27.8,
"postMarketPrice": 23.6,
"postMarketChange": -0.19999886,
"postMarketChangePercentage": -0.008403313445378152,
"postMarketGain": -399.99772
},
{
"ticker": "VRYYF",
"name": "THE VERY GOOD FOOD COMPANY INC",
"account": "Fidelity",
"quantity": 4000,
"price": 5.47,
"priceChange": 0.33819962,
"percentChange": 0.06590272320763965,
"dayGain": 1352.79848,
"unitCost": 3.1605925000000004,
"totalCost": 12642.37,
"total": 21880,
"profit": 9237.63,
"percentProfit": 0.7306881541989357,
"previousClose": 5.1318,
"marketCapInBillions": 0.466971168,
"sharesOutstanding": 85085296,
"fiftyTwoWeekLow": 5,
"fiftyTwoWeekHigh": 5.5,
"postMarketPrice": 0,
"postMarketChange": 0,
"postMarketChangePercentage": 0,
"postMarketGain": 0
},
{
"ticker": "WBA",
"name": "Walgreens Boots Alliance, Inc.",
"account": "Fidelity",
"quantity": 1000,
"price": 50.68,
"priceChange": -0.5,
"percentChange": -0.009769441187964049,
"dayGain": -500,
"unitCost": 44.79596,
"totalCost": 44795.96,
"total": 50680,
"profit": 5884.040000000001,
"percentProfit": 0.13135202370928095,
"previousClose": 51.18,
"forwardPE": 9.6902485,
"epsCurrentYear": 4.86,
"marketCapInBillions": 43.789647872,
"sharesOutstanding": 864041984,
"fiftyTwoWeekLow": 33.36,
"fiftyTwoWeekHigh": 55.49,
"postMarketPrice": 50.46,
"postMarketChange": -0.22000122,
"postMarketChangePercentage": -0.004340986977111287,
"postMarketGain": -220.00122
}
]
/**
 * Data source for the StockTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StockTableDataSource extends DataSource<StockTableItem> {
  // data: StockTableItem[] = EXAMPLE_DATA;
  data: StockTableItem[];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<StockTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: StockTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: StockTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'account': return compare(a.account, b.account, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);
        case 'quantity': return compare(a.quantity, b.quantity, isAsc);
        case 'percentChange': return compare(a.percentChange, b.percentChange, isAsc);
        case 'priceChange': return compare(a.priceChange, b.priceChange, isAsc);
        case 'dayGain': return compare(a.dayGain, b.dayGain, isAsc);
        case 'unitCost': return compare(a.unitCost, b.unitCost, isAsc);
        case 'totalCost': return compare(a.totalCost, b.totalCost, isAsc);
        case 'profit': return compare(a.profit, b.profit, isAsc);
        case 'profit': return compare(a.profit, b.profit, isAsc);
        case 'total': return compare(a.total, b.total, isAsc);
        case 'percentProfit': return compare(a.percentProfit, b.percentProfit, isAsc);
        case 'ticker': return compare(a.ticker, b.ticker, isAsc);
        case 'postMarketPrice': return compare(a.postMarketPrice, b.postMarketPrice, isAsc);
        case 'postMarketChange': return compare(a.postMarketChange, b.postMarketChange, isAsc);
        case 'postMarketGain': return compare(a.postMarketGain, b.postMarketGain, isAsc);

        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
