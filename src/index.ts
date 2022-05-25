export class TALib {
    public static sma(value: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        if (value == undefined) throw Error("Missing value.");
        if (period <= 0) throw Error("Period must be a positive integer.");
        let sum = 0;
        let start = 0;
        let c = 1;
        let sma: (number | null)[] = [];
        for (let i = 0; i < value.length; i++) {
            if (value[i] == null) sma.push(null);
            else {
                // @ts-ignore
                sum += value[i];
                if (c >= period) {
                    sma.push(sum / period);
                    while (value[start] == null) {
                        start++;
                    }
                    // @ts-ignore
                    sum -= value[start];
                    start++;
                } else {
                    c++;
                    sma.push(null);
                }
            }
        }
        return new Map([["sma", sma]]);
    }

    /**
     * Modified moving average
     * @param value
     * @param period
     */
    public static mma(value: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        if (value == undefined) throw Error("Missing value.");
        if (period <= 0) throw Error("Period must be a positive integer.");
        let sum = 0;
        let c = 1;
        let mma: (number | null)[] = [];
        for (let i = 0; i < value.length; i++) {
            if (value[i] == null) mma.push(null);
            else {
                // @ts-ignore
                sum += value[i];
                if (c >= period) {
                    mma.push(sum/period);
                    // @ts-ignore
                    sum -= sum / period;

                } else {
                    c++;
                    mma.push(null);
                }
            }
        }
        return new Map([["mma", mma]]);
    }





    public static wsma(value: (number | null)[] | undefined, weight: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        if (value == undefined) throw Error("Missing value.");
        if (weight == undefined) throw Error("Missing weight.");
        if (weight.length != value.length) throw Error("Value and weight must have same length.");
        if (period <= 0) throw Error("Period must be a positive integer.");
        let sum = 0;
        let wsum = 0;
        let start = 0;
        let c = 1;
        let sma: (number | null)[] = [];
        for (let i = 0; i < value.length; i++) {
            if (value[i] == null || weight[i] == null) sma.push(null);
            else {
                // @ts-ignore
                sum += value[i] * weight[i];
                // @ts-ignore
                wsum += weight[i];
                if (c >= period) {
                    sma.push(wsum / sum);
                    while (value[start] == null) {
                        start++;
                    }
                    // @ts-ignore
                    sum -= value[start] * weight[start];
                    ;
                    // @ts-ignore
                    wsum += weight[start];
                    start++;
                } else {
                    sma.push(null);
                    c++;
                }
            }
        }

        return new Map([["wsma", sma]]);
    }


    public static wema(value: (number | null)[] | undefined, weight: (number | null)[] | undefined, period: number, smoothing: number): Map<string, (number | null)[]> {
        if (value == undefined) throw Error("Missing value.");
        if (weight == undefined) throw Error("Missing weight.");
        if (weight.length != value.length) throw Error("Value and weight must have same length.");
        if (period <= 0) throw Error("Period must be a positive number.");
        let sum = 0;
        let wsum = 0;
        let factor = smoothing / (1 + period);
        let ema: (number | null)[] = [];
        for (let i = 0; i < value.length; i++) {
            if (value[i] == null || weight[i] == null) ema.push(null);
            else {
                // @ts-ignore
                sum = value[i] * weight[i] * factor + sum * (1 - factor);
                // @ts-ignore
                wsum = weight[i] * factor + wsum * (1 - factor);
                ema.push(sum / wsum);
            }
        }
        return new Map([["wema", ema]]);
    }


    public static ema(value: (number | null)[] | undefined, period: number, smoothing: number): Map<string, (number | null)[]> {
        if (value == undefined) throw Error("Missing value.");
        if (period <= 0) throw Error("Period must be a positive number.");
        let sum = 0;
        let factor = smoothing / (1 + period);
        let ema: (number | null)[] = [];
        for (let i = 0; i < value.length; i++) {
            if (value[i] == null) ema.push(null)
            else {
                // @ts-ignore
                sum = value[i] * factor + sum * (1 - factor);
                ema.push(sum / period);
            }
        }
        return new Map([["ema", ema]]);
    }




    public static diff(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): Map<string, (number | null)[]> {
        if (value1 == undefined) throw Error("Missing value1.");
        if (value2 == undefined) throw Error("Missing value2.");
        let output: (number | null)[] = [];
        if (typeof value2 == 'number') {
            for (let i = 0; i < value1.length; i++) {
                if (value1[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i] - value2);
                }
            }
        } else {
            if (value1.length != value2.length) throw Error("Two values have different lengths.");
            for (let i = 0; i < value1.length; i++) {
                if (value1[i] == null || value2[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i] - value2[i]);
                }
            }
        }
        return new Map([["minus", output]]);
    }


    public static minus(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): Map<string, (number | null)[]> {
        if (value1 == undefined) throw Error("Missing value1.");
        if (value2 == undefined) throw Error("Missing value2.");
        let output: (number | null)[] = [];
        if (typeof value2 == 'number') {
            for (let i = 0; i < value1.length; i++) {
                if (value1[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i] - value2);
                }
            }
        } else {
            if (value1.length != value2.length) throw Error("Two values have different lengths.");
            for (let i = 0; i < value1.length; i++) {
                if (value1[i] == null || value2[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(Math.abs(value1[i] - value2[i]));
                }
            }
        }
        return new Map([["diff", output]]);
    }

    public static plus(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): Map<string, (number | null)[]> {
        if (value1 == undefined) throw Error("Missing value1.");
        if (value2 == undefined) throw Error("Missing value2.");
        let output: (number | null)[] = [];
        if (typeof value2 == 'number') {
            for (let i = 0; i < value1.length; i++) {
                if (value1[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i] + value2);
                }
            }
        } else {
            if (value1.length != value2.length) throw Error("Two values have different lengths.");
            for (let i = 0; i < value1.length; i++) {
                if (value1[i] == null || value2[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i] + value2[i]);
                }
            }
        }
        return new Map([["plus", output]]);
    }


    public static modulo(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): Map<string, (number | null)[]> {
        if (value1 == undefined) throw Error("Missing value1.");
        if (value2 == undefined) throw Error("Missing value2.");
        let output: (number | null)[] = [];
        if (typeof value2 == 'number') {
            for (let i = 0; i < value1.length; i++) {
                if (value1[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i] % value2);
                }
            }
        } else {
            if (value1.length != value2.length) throw Error("Two values have different lengths.");
            for (let i = 0; i < value1.length; i++) {
                if (value1[i] == null || value2[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i] % value2[i]);
                }
            }
        }
        return new Map([["modulo", output]]);
    }

    public static multiply(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): Map<string, (number | null)[]> {
        if (value1 == undefined) throw Error("Missing value1.");
        if (value2 == undefined) throw Error("Missing value2.");
        let output: (number | null)[] = [];
        if (typeof value2 == 'number') {
            for (let i = 0; i < value1.length; i++) {
                if (value1[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i] * value2);
                }
            }
        } else {
            if (value1.length != value2.length) throw Error("Two values have different lengths.");
            for (let i = 0; i < value1.length; i++) {
                if (value1[i] == null || value2[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i] * value2[i]);
                }
            }
        }
        return new Map([["multiply", output]]);
    }


    public static divide(value1: (number | null)[] | undefined, value2: (number | null)[] | undefined | number): Map<string, (number | null)[]> {
        if (value1 == undefined) throw Error("Missing value1.");
        if (value2 == undefined) throw Error("Missing value2.");
        let output: (number | null)[] = [];
        if (typeof value2 == 'number') {
            for (let i = 0; i < value1.length; i++) {
                if (value1[i] == null || value2 == 0) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i] / value2);
                }
            }
        } else {
            if (value1.length != value2.length) throw Error("Two values have different lengths.");
            for (let i = 0; i < value1.length; i++) {
                if (value1[i] == null || value2[i] == null || value2[i] == 0) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i] / value2[i]);
                }
            }
        }
        return new Map([["divide", output]]);
    }

    public static stddev(value: (number | null)[] | undefined, average: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        if (value == undefined) throw Error("Missing value.");
        if (average == undefined) throw Error("Missing average.");
        if (value.length != average.length) throw Error("Value and average must have the same length.");
        if (period <= 0) throw Error("Period must be a positive integer.");
        let std: (number | null)[] = [];
        for(let i = 1; i<period; i++) std.push(null);
        for (let i = period - 1; i < average.length; i++) {
            if (average[i] == null) std.push(null)
            else {
                let n = i;
                let sum = 0;
                for (let l = 0; l < period; l++) {
                    while (value[n] == null) n--;
                    // @ts-ignore
                    sum += Math.pow((value[n] - average[i]), 2);
                    n--;
                }
                std.push(Math.sqrt(sum / period));
            }
        }
        return new Map([["stddev", std]]);
    }


    /**
     * Variance
     * @param value
     * @param average
     * @param period
     */
    public static var(value: (number | null)[] | undefined, average: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        if (value == undefined) throw Error("Missing value.");
        if (average == undefined) throw Error("Missing average.");
        if (value.length != average.length) throw Error("Value and average must have the same length.");
        if (period <= 0) throw Error("Period must be a positive integer.");
        let std: (number | null)[] = [];
        for(let i = 1; i<period; i++) std.push(null);
        for (let i = period - 1; i < average.length; i++) {
            if (average[i] == null) std.push(null)
            else {
                let n = i;
                let sum = 0;
                for (let l = 0; l < period; l++) {
                    while (value[n] == null) n--;
                    // @ts-ignore
                    sum += Math.pow((value[n] - average[i]), 2);
                    n--;
                }
                std.push(sum / period);
            }
        }
        return new Map([["var", std]]);
    }

    public static macdDefault = new Map([["fastPeriod", 12],["slowPeriod", 26],["signalPeriod", 9]]);

    public static macd(close: (number | null)[] | undefined, fastPeriod: number, slowPeriod: number, signalPeriod: number): Map<string, (number | null)[]> {
        if (close == undefined) throw Error("Missing close.");
        if (fastPeriod <= 0) throw Error("Fast period must be a positive integer.");
        if (slowPeriod <= 0) throw Error("Slow period must be a positive integer.");
        if (signalPeriod <= 0) throw Error("Signal period must be a positive integer.");
        if (slowPeriod <= fastPeriod) throw Error("Slow period must be longer than fast period.");
        let fast = this.ema(close, fastPeriod, 2);
        let slow = this.ema(close, slowPeriod, 2);

        let macd = this.minus(fast.get('ema'), slow.get('ema')).get('minus');
        let signal = this.ema(macd, signalPeriod, 2).get('ema');
        let hist = this.minus(macd, signal).get('minus');

        // @ts-ignore
        return new Map([
            ["macd", macd],
            ["macd_signal", signal],
            ["macd_hist", hist],
        ]);
    }

    public avgPrice(open: (number | null)[] | undefined, high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined) {
        if (open == undefined) throw Error("Missing open.");
        if (high == undefined) throw Error("Missing high.");
        if (low == undefined) throw Error("Missing low.");
        if (close == undefined) throw Error("Missing close.");
        if (open.length != high.length) throw Error("Open and high must have the same length.");
        if (open.length != low.length) throw Error("Open and low must have the same length.");
        if (open.length != close.length) throw Error("Open and close must have the same length.");
        let avgPrice: (number | null)[] = [];
        for(let i = 0; i<open.length; i++) {
            if(open[i]==null || high[i]==null || low[i]==null || close[i]==null) avgPrice.push(null);
            else { // @ts-ignore
                avgPrice.push((open[i] + high[i] + low[i] + close[i])/4);
            }
        }
        return new Map([["avgPrice", avgPrice]]);

    }


    public static bbandsDefault = new Map([["period", 5],["bandWidth", 2]]);
    public static bbands(close: (number | null)[] | undefined, period: number, bandWidth: number): Map<string, (number | null)[]> {
        if (close == undefined) throw Error("Missing close.");
        if (period <= 0) throw Error("Fast period must be a positive integer.");
        let sma = this.sma(close, period).get('sma');
        let dev = this.stddev(close, sma, period).get('stddev');
        dev = this.multiply(dev, bandWidth).get('multiply');
        let upper = this.plus(sma, dev).get('plus');
        let lower = this.minus(sma, dev).get('minus');

        // @ts-ignore
        return new Map([
            ["bbands_upper", upper],
            ["bbands_sma", sma],
            ["bbands_lower", lower],
        ]);
    }


    /**
     * Typical Price
     * @param high
     * @param low
     * @param close
     * @constructor
     */
    public TypPrice(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined) {
        if (high == undefined) throw Error("Missing high.");
        if (low == undefined) throw Error("Missing low.");
        if (close == undefined) throw Error("Missing close.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        if (high.length != close.length) throw Error("High and close must have the same length.");
        let avgPrice: (number | null)[] = [];
        for(let i = 0; i<open.length; i++) {
            if(high[i]==null || low[i]==null || close[i]==null) avgPrice.push(null);
            else { // @ts-ignore
                avgPrice.push((high[i] + low[i] + close[i])/3);
            }
        }
        return new Map([["TypPrice", avgPrice]]);

    }


    /**
     * Weighted Close Price
     * @param high
     * @param low
     * @param close
     */
    public wClPrice(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined) {
        if (high == undefined) throw Error("Missing high.");
        if (low == undefined) throw Error("Missing low.");
        if (close == undefined) throw Error("Missing close.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        if (high.length != close.length) throw Error("High and close must have the same length.");
        let avgPrice: (number | null)[] = [];
        for(let i = 0; i<open.length; i++) {
            if(high[i]==null || low[i]==null || close[i]==null) avgPrice.push(null);
            else { // @ts-ignore
                avgPrice.push((high[i] + low[i] + close[i]*2)/4);
            }
        }
        return new Map([["wClPrice", avgPrice]]);

    }








    /**
     * Volume-Weighted Average Price
     * @param close
     * @param volume
     * @param period
     */
    public static vwap(close: (number | null)[] | undefined, volume: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        return this.wsma(close, volume, period);
    }

    /**
     * Volume-Weighted Exponential Average Price
     * @param close
     * @param volume
     * @param period
     */
    public static vweap(close: (number | null)[] | undefined, volume: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        return this.wema(close, volume, period, 2);
    }


    /**
     * True Range
     * https://www.investopedia.com/terms/a/atr.asp
     * @param high
     * @param low
     * @param close
     */
    public static tRange(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined): Map<string, (number | null)[]> {
        if (high == undefined) throw Error("Missing high value.");
        if (low == undefined) throw Error("Missing low value.");
        if (close == undefined) throw Error("Missing close average.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        if (high.length != close.length) throw Error("High and close must have the same length.");
        let tr: (number | null)[] = [];
        tr.push(null);
        for (let i = 1; i < high.length; i++) {
            if (high[i] == null || low[i] == null || close[i - 1] == null) tr.push(null);
            else {
                // @ts-ignore
                let max = high[i] - low[i];
                // @ts-ignore
                max = Math.max(max, Math.abs(high[i] - close[i - 1]));
                // @ts-ignore
                max = Math.max(max, Math.abs(low[i] - close[i - 1]));
                tr.push(max);
            }
        }
        return new Map([["tr", tr]]);
    }

    /**
     * Average True Range
     * https://www.investopedia.com/terms/a/atr.asp
     *
     * @param high
     * @param low
     * @param close
     * @param period
     */
    public static atr(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        let tr = this.tRange(high, low, close).get('tr');
        // @ts-ignore
        return new Map([["atr", this.sma(tr, period).get('sma')]]);
    }
    public static atrDefault = new Map([["period", 14]]);

    /**
     * Chaikin A/D Line
     * @param high
     * @param low
     * @param close
     * @param volume
     */
    public static ad(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, volume: (number | null)[] | undefined): Map<string, (number | null)[]> {
        if (high == undefined) throw Error("Missing high value.");
        if (low == undefined) throw Error("Missing low value.");
        if (close == undefined) throw Error("Missing close average.");
        if (volume == undefined) throw Error("Missing volume average.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        if (high.length != close.length) throw Error("High and close must have the same length.");
        if (high.length != volume.length) throw Error("High and volume must have the same length.");
        let adl: (number | null)[] = [];
        let ad = 0;
        for (let i = 0; i < high.length; i++) {
            if (high[i] == null || low[i] == null || close[i] == null || volume[i] == null) adl.push(null);
            else { // @ts-ignore
                ad += (volume[i] * (close[i] - low[i] - (high[i] - close[i])) / (high[i] - low[i]));
                adl.push(ad);
            }
        }
        return new Map([["ad", adl]]);
    }

    /**
     * Chaikin A/D Oscillator
     * https://www.investopedia.com/terms/c/chaikinoscillator.asp#:~:text=To%20calculate%20the%20Chaikin%20oscillator,around%20the%20accumulation%2Ddistribution%20line.
     * @param high
     * @param low
     * @param close
     * @param volume
     * @param fastPeriod
     * @param slowPeriod
     */
    public static adOsc(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, volume: (number | null)[] | undefined, fastPeriod: number, slowPeriod: number): Map<string, (number | null)[]> {
        let ad = this.ad(high, low, close, volume).get("ad");
        // @ts-ignore
        return new Map([["adOsc", this.minus(this.ema(ad, fastPeriod).get("ema") - this.ema(ad, slowPeriod).get("ema")).get('minus')]]);
    }

    public static adOscDefault = new Map([["fastPeriod", 3], ["slowPeriod", 10]]);

    /**
     * Directional Movement
     * @param high
     * @param low
     */
    public static dm(high: (number | null)[] | undefined, low: (number | null)[] | undefined): Map<string, (number | null)[]> {
        if (high == undefined) throw Error("Missing high value.");
        if (low == undefined) throw Error("Missing low value.");
        if (high.length != low.length) throw Error("High and low must have the same length.");
        let pdm: (number | null)[] = [];
        let ndm: (number | null)[] = [];
        let lastHigh = null;
        let lastLow = null;
        pdm.push(null);
        ndm.push(null);
        for (let i = 1; i < high.length; i++) {
            if (high[i] == null || low[i] == null || high[i - 1] == null || low[i - 1] == null) {
                pdm.push(null);
                ndm.push(null);
            }
            else {
                if(lastHigh==null) {
                    pdm.push(null);
                    ndm.push(null);
                }
                else {
                    // @ts-ignore
                    let up = high[i] - lastHigh;
                    // @ts-ignore
                    let down = lastLow - low[i];
                    if (up > down && up > 0) pdm.push(up)
                    else pdm.push(0);
                    if (down > up && down > 0) ndm.push(down)
                    else ndm.push(0);
                }
                lastHigh = high[i];
                lastLow = low[i];
            }
        }
        return new Map([["pdm", pdm], ["ndm", ndm]]);
    }


    /**
     * Directional Index
     * https://www.investopedia.com/terms/a/adx.asp#:~:text=To%20get%20the%20ADX%2C%20continue,%2B%20current%20DX)%20%2F%2014.
     * https://www.investopedia.com/terms/p/positivedirectionalindicator.asp
     * https://en.wikipedia.org/wiki/Average_directional_movement_index
     * @param high
     * @param low
     * @param close
     * @param period
     */
    public static di(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        // @ts-ignore
        let atr: (number | null)[] = this.atr(high, low, close, period).get('atr');
        let dm = this.dm(high, low);
        // @ts-ignore
        let pdm: (number | null)[] = this.mma(dm.get('pdm'), period).get('mma');
        // @ts-ignore
        let ndm: (number | null)[] = this.mma(dm.get('ndm'), period).get('mma');
        // @ts-ignore
        let pdi: (number | null)[] = this.multiply(this.divide(pdm, atr).get('divide'), 100).get('multiply');
        // @ts-ignore
        let ndi: (number | null)[] = this.multiply(this.divide(ndm, atr).get('divide'), 100).get('multiply');
        return new Map([["pdi", pdi], ["ndi", ndi]]);
    }

    public static diDefault = new Map([["period", 14]]);

    /**
     * Directional Index
     * https://www.investopedia.com/terms/a/adx.asp#:~:text=To%20get%20the%20ADX%2C%20continue,%2B%20current%20DX)%20%2F%2014.
     * https://www.investopedia.com/terms/p/positivedirectionalindicator.asp
     * https://en.wikipedia.org/wiki/Average_directional_movement_index
     * @param high
     * @param low
     * @param close
     * @param period
     */
    public static dx(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        // @ts-ignore
        let di: (number | null)[] = this.di(high, low, close, period);
        // @ts-ignore
        let pdi: (number | null)[] = di.get('pdi');
        // @ts-ignore
        let ndi: (number | null)[] = di.get('ndi');
        let dx: (number | null)[] = [];
        // @ts-ignore
        for (let i = 0; i < high.length; i++) {
            if (pdi[i] == null) dx.push(null);
            else { // @ts-ignore
                if((pdi[i] + ndi[i])==0) dx.push(null)
                else {
                    // @ts-ignore
                    dx.push(100*(pdi[i] - ndi[i]) / (pdi[i] + ndi[i]));
                }
            }
        }
        return new Map([["dx", dx]]);
    }
    public static dxDefault = new Map([["period", 14]]);

    /**
     * Average Directional Movement Index
     * @param high
     * @param low
     * @param close
     * @param period
     */
    public static adx(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number): Map<string, (number | null)[]> {
        let dx = this.dx(high, low, close, period).get('dx');
        let adx = this.mma(dx, period).get('mma');
        // @ts-ignore
        return new Map([["adx", adx]]);
    }
    public static adxDefault = new Map([["period", 14]]);


    /**
     * Average Directional Movement Index Rating
     * https://www.daytrading.com/adx-adxr
     * @param high
     * @param low
     * @param close
     * @param period
     * @param adxPeriod
     */
    public static adxr(high: (number | null)[] | undefined, low: (number | null)[] | undefined, close: (number | null)[] | undefined, period: number, adxPeriod: number): Map<string, (number | null)[]> {
        if(period<0) throw Error("Period must be greater than 0.")
        let adx = this.adx(high, low, close, adxPeriod).get('adx');
        let i = 0;
        let c = 0;
        let start = 0;
        let adxr: (number | null)[] = [];
        // @ts-ignore
        while(i<adx.length) {
            // @ts-ignore
            if(adx[i] == null) {
                adxr.push(null)
            }
            else if(c<period) {
                adxr.push(null);
                c++;
            }
            else {
                // @ts-ignore
                while(adx[start]==null) start++;
                // @ts-ignore
                adxr.push((adx[i]+adx[start])/2);
                start++;
            }

        }

        // @ts-ignore
        return new Map([["adxr", adxr]]);
    }
    public static adxrDefault = new Map([["period", 10],["adxPeriod", 14]]);



    /**
     * Absolute Price Oscillator
     * @param close
     * @param fastPeriod
     * @param slowPeriod
     */
    public static apo(close: (number | null)[] | undefined, fastPeriod: number, slowPeriod: number): Map<string, (number | null)[]> {
        if (close == undefined) throw Error("Missing close.");
        if (fastPeriod <= 0) throw Error("Fast period must be a positive integer.");
        if (slowPeriod <= 0) throw Error("Slow period must be a positive integer.");
        if (slowPeriod <= fastPeriod) throw Error("Slow period must be longer than fast period.");
        let fast = this.ema(close, fastPeriod, 2).get('ema');
        let slow = this.ema(close, slowPeriod, 2).get('ema');

        let apo = this.minus(slow, fast).get('minus');

        // @ts-ignore
        return new Map([["apo", apo]]);
    }

    public static apoDefault = new Map([["fastPeriod", 12],["slowPeriod", 26],["signalPeriod", 9]]);




    /**
     * Highest value over a specified period
     * @param value
     * @param period
     */
    public static max(value: (number | null)[] | undefined, period:number): Map<string, (number | null)[]> {
        if(value==undefined) throw Error("Value is missing.");
        let c = 0;
        let start = 0;
        let max: (number | null)[] = [];
        for(let i=0; i< value.length; i++) {
            if(value[i] == null) max.push(null);
            else if(c<period) c++
            else {
                while(value[start] == null) start++;
                let m = value[i];
                for (let j=start+1;j<i;j++) {
                    if(value[j]!=null) {
                        // @ts-ignore
                        if(value[j]>m) m = value[j];
                    }
                }
                max.push(m);
                start++;
            }
        }
        return new Map([["max", max]]);
    }


    /**
     * Index of highest value over a specified period
     * @param value
     * @param period
     */
    public static maxIndex(value: (number | null)[] | undefined, period:number): Map<string, (number | null)[]> {
        if(value==undefined) throw Error("Value is missing.");
        let c = 0;
        let start = 0;
        let maxIndex: (number | null)[] = [];
        for(let i=0; i< value.length; i++) {
            if(value[i] == null) maxIndex.push(null);
            else if(c<period) c++
            else {
                while(value[start] == null) start++;
                let m = value[i];
                let index = i;
                for (let j=start+1;j<i;j++) {
                    if(value[j]!=null) {
                        // @ts-ignore
                        if(value[j]>m) {
                            m = value[j]
                            index = j;
                        }
                    }
                }
                maxIndex.push(index);
                start++;
            }
        }
        return new Map([["maxIndex", maxIndex]]);
    }


    /**
     * Lowest value over a specified period
     * @param value
     * @param period
     */
    public static min(value: (number | null)[] | undefined, period:number): Map<string, (number | null)[]> {
        if(value==undefined) throw Error("Value is missing.");
        let c = 0;
        let start = 0;
        let min: (number | null)[] = [];
        for(let i=0; i< value.length; i++) {
            if(value[i] == null) min.push(null);
            else if(c<period) c++
            else {
                while(value[start] == null) start++;
                let m = value[i];
                for (let j=start+1;j<i;j++) {
                    if(value[j]!=null) {
                        // @ts-ignore
                        if(value[j]<m) m = value[j];
                    }
                }
                min.push(m);
                start++;
            }
        }
        return new Map([["min", min]]);
    }


    /**
     * Index of lowest value over a specified period
     * @param value
     * @param period
     */
    public static minIndex(value: (number | null)[] | undefined, period:number): Map<string, (number | null)[]> {
        if(value==undefined) throw Error("Value is missing.");
        let c = 0;
        let start = 0;
        let minIndex: (number | null)[] = [];
        for(let i=0; i< value.length; i++) {
            if(value[i] == null) minIndex.push(null);
            else if(c<period) c++
            else {
                while(value[start] == null) start++;
                let m = value[i];
                let index = i;
                for (let j=start+1;j<i;j++) {
                    if(value[j]!=null) {
                        // @ts-ignore
                        if(value[j]<m) {
                            m = value[j];
                            index = j;
                        }
                    }
                }
                minIndex.push(index);
                start++;
            }
        }
        return new Map([["minIndex", minIndex]]);
    }

}

