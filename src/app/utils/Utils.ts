export class Utils {
  getClassNameForPositiveNegative(number: number): string {
    return (number > 0) ? "positive" : (number < 0) ? "negative" : "";
  }

  numberWithCommas(number: number) {
    if (Number.isNaN(number)) {
      return "0.00";
    }

    if (number == null) {
      return "0.00";
    }
    return number.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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
