import {formatNumber} from '@angular/common';

export class Utils {

  constructor() {}

  getClassNameForPositiveNegative(number: number): string {
    return (number > 0) ? "positive" : (number < 0) ? "negative" : "";
  }

  numberWithCommas(value: number, locale = 'en-US', digitsInfo = '.2-2') {
    if (Number.isNaN(value)) {
      return "0.00";
    }

    if (value == null) {
      return "0.00";
    }
    return formatNumber(value, locale, digitsInfo);
  }

  getGainWithPercentString(gain: number, percent: number) {
    return "$" + this.numberWithCommas(gain) + " (" + this.numberWithCommas(percent * 100) + "%)";
  }

  getGainString(gain: number) {
    return "$" + this.numberWithCommas(gain);
  }

  getPercent(percent: number) {
    return this.numberWithCommas(percent * 100) + "%";
  }
}
