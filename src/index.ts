export class TALib {
    public static sma(value: (number|null)[]|undefined, period: number): Map<string,(number|null)[]> {
        if(value==undefined) throw Error("Missing value.");
        if(period<=0) throw Error("Period must be a positive integer.");
        let sum = 0;
        let start = 0;
        let c = 1;
        let sma:(number|null)[] = [];
        for(let i=0;i<value.length;i++) {
            if(value[i]==null) sma.push(null);
            else {
                // @ts-ignore
                sum+=value[i];
                if(c>=period) {
                    sma.push(sum/period);
                    while(value[start] == null) {
                        start++;
                    }
                    // @ts-ignore
                    sum-=value[start];
                    start++;
                }
                else {
                    c++;
                    sma.push(null);
                }
            }
        }
        return new Map([["sma",sma]]);
    }


    public static wsma(value: (number|null)[]|undefined, weight: (number|null)[]|undefined, period: number): Map<string,(number|null)[]> {
        if(value==undefined) throw Error("Missing value.");
        if(weight==undefined) throw Error("Missing weight.");
        if(weight.length!=value.length) throw Error("Value and weight must have same length.");
        if(period<=0) throw Error("Period must be a positive integer.");
        let sum = 0;
        let wsum = 0;
        let start = 0;
        let c = 1;
        let sma:(number|null)[] = [];
        for(let i=0;i<value.length;i++) {
            if(value[i]==null || weight[i]==null) sma.push(null);
            else {
                // @ts-ignore
                sum+=value[i]*weight[i];
                // @ts-ignore
                wsum+=weight[i];
                if(c>=period) {
                    sma.push(wsum/sum);
                    while(value[start] == null) {
                        start++;
                    }
                    // @ts-ignore
                    sum-=value[start]*weight[start];;
                    // @ts-ignore
                    wsum+=weight[start];
                    start++;
                }
                else {
                    sma.push(null);
                    c++;
                }
            }
        }

        return new Map([["wsma",sma]]);
    }


    public static wema(value: (number|null)[]|undefined, weight: (number|null)[]|undefined, period: number, smoothing: number): Map<string,(number|null)[]> {
        if(value==undefined) throw Error("Missing value.");
        if(weight==undefined) throw Error("Missing weight.");
        if(weight.length!=value.length) throw Error("Value and weight must have same length.");
        if(period<=0) throw Error("Period must be a positive number.");
        let sum = 0;
        let wsum = 0;
        let factor = smoothing/(1+period);
        let ema:(number|null)[] = [];
        for(let i=0;i<value.length;i++) {
            if(value[i]==null || weight[i]==null) ema.push(null);
            else {
                // @ts-ignore
                sum=value[i]*weight[i]*factor + sum * (1-factor);
                // @ts-ignore
                wsum=weight[i]*factor + wsum * (1-factor);
                ema.push(sum/wsum);
            }
        }
        return new Map([["wema",ema]]);
    }


    public static ema(value: (number|null)[]|undefined, period: number, smoothing: number): Map<string,(number|null)[]> {
        if(value==undefined) throw Error("Missing value.");
        if(period<=0) throw Error("Period must be a positive number.");
        let sum = 0;
        let factor = smoothing/(1+period);
        let ema:(number|null)[] = [];
        for(let i=0;i<value.length;i++) {
            if(value[i]==null) ema.push(null)
            else {
                // @ts-ignore
                sum=value[i]*factor + sum * (1-factor);
                ema.push(sum/period);
            }
        }
        return new Map([["ema",ema]]);
    }



    public static minus(value1:(number|null)[]|undefined, value2:(number|null)[]|undefined|number): Map<string,(number|null)[]> {
        if(value1==undefined) throw Error("Missing value1.");
        if(value2==undefined) throw Error("Missing value2.");
        let output:(number|null)[] = [];
        if(typeof value2=='number') {
            for(let i = 0;i<value1.length;i++) {
                if(value1[i]==null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i]-value2);
                }
            }
        }
        else {
            if(value1.length!=value2.length) throw Error("Two values have different lengths.");
            for(let i = 0;i<value1.length;i++) {
                if(value1[i]==null || value2[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i]-value2[i]);
                }
            }
        }
        return new Map([["minus",output]]);
    }

    public static plus(value1:(number|null)[]|undefined, value2:(number|null)[]|undefined|number): Map<string,(number|null)[]> {
        if(value1==undefined) throw Error("Missing value1.");
        if(value2==undefined) throw Error("Missing value2.");
        let output:(number|null)[] = [];
        if(typeof value2=='number') {
            for(let i = 0;i<value1.length;i++) {
                if(value1[i]==null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i]+value2);
                }
            }
        }
        else {
            if(value1.length!=value2.length) throw Error("Two values have different lengths.");
            for(let i = 0;i<value1.length;i++) {
                if(value1[i]==null || value2[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i]+value2[i]);
                }
            }
        }
        return new Map([["plus",output]]);
    }


    public static modulo(value1:(number|null)[]|undefined, value2:(number|null)[]|undefined|number): Map<string,(number|null)[]> {
        if(value1==undefined) throw Error("Missing value1.");
        if(value2==undefined) throw Error("Missing value2.");
        let output:(number|null)[] = [];
        if(typeof value2=='number') {
            for(let i = 0;i<value1.length;i++) {
                if(value1[i]==null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i]%value2);
                }
            }
        }
        else {
            if(value1.length!=value2.length) throw Error("Two values have different lengths.");
            for(let i = 0;i<value1.length;i++) {
                if(value1[i]==null || value2[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i]%value2[i]);
                }
            }
        }
        return new Map([["modulo",output]]);
    }

    public static multiply(value1:(number|null)[]|undefined, value2:(number|null)[]|undefined|number): Map<string,(number|null)[]> {
        if(value1==undefined) throw Error("Missing value1.");
        if(value2==undefined) throw Error("Missing value2.");
        let output:(number|null)[] = [];
        if(typeof value2=='number') {
            for(let i = 0;i<value1.length;i++) {
                if(value1[i]==null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i]*value2);
                }
            }
        }
        else {
            if(value1.length!=value2.length) throw Error("Two values have different lengths.");
            for(let i = 0;i<value1.length;i++) {
                if(value1[i]==null || value2[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i]*value2[i]);
                }
            }
        }
        return new Map([["multiply",output]]);
    }


    public static divide(value1:(number|null)[]|undefined, value2:(number|null)[]|undefined|number): Map<string,(number|null)[]> {
        if(value1==undefined) throw Error("Missing value1.");
        if(value2==undefined) throw Error("Missing value2.");
        let output:(number|null)[] = [];
        if(typeof value2=='number') {
            for(let i = 0;i<value1.length;i++) {
                if(value1[i]==null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i]/value2);
                }
            }
        }
        else {
            if(value1.length!=value2.length) throw Error("Two values have different lengths.");
            for(let i = 0;i<value1.length;i++) {
                if(value1[i]==null || value2[i] == null) output.push(null);
                else { // @ts-ignore
                    output.push(value1[i]/value2[i]);
                }
            }
        }
        return new Map([["divide",output]]);
    }

    public static stddev(value: (number|null)[]|undefined, average: (number|null)[]|undefined, period: number): Map<string,(number|null)[]> {
        if(value==undefined) throw Error("Missing value.");
        if(average==undefined) throw Error("Missing average.");
        if(value.length!=average.length) throw Error("Value and average must have the same length.");
        if(period<=0) throw Error("Period must be a positive integer.");
        let std:(number|null)[] = [];
        for(let i=period-1;i<average.length;i++) {
            if(average[i]==null) std.push(null)
            else {
                let n = i;
                let sum = 0;
                for(let l = 0;l<period;l++) {
                    while (value[n] == null) n--;
                    // @ts-ignore
                    sum+=(value[n]-average[i])^2;
                    n--;
                }
                std.push(sum/period);
            }
        }
        return new Map([["stddev",std]]);
    }

    public static macdDefault = {fastPeriod:12, slowPeriod:26, signalPeriod:9};
    public static macd(close: (number|null)[]|undefined, fastPeriod: number, slowPeriod: number, signalPeriod: number): Map<string,(number|null)[]> {
        if(close==undefined) throw Error("Missing close.");
        if(fastPeriod<=0) throw Error("Fast period must be a positive integer.");
        if(slowPeriod<=0) throw Error("Slow period must be a positive integer.");
        if(signalPeriod<=0) throw Error("Signal period must be a positive integer.");
        if(slowPeriod<=fastPeriod) throw Error("Slow period must be longer than fast period.");
        let fast = this.ema(close, fastPeriod, 2);
        let slow = this.ema(close, slowPeriod, 2);

        let macd = this.minus(fast.get('ema'), slow.get('ema')).get('minus');
        let signal = this.ema(macd, signalPeriod, 2).get('ema');
        let hist = this.minus(macd, signal).get('minus');

        // @ts-ignore
        return new Map([
            ["macd",macd],
            ["macd_signal",signal],
            ["macd_hist",hist],
        ]);
    }


    public static bbandsDefault = {period:5, bandWidth:2};
    public static bbands(close: (number|null)[]|undefined, period: number, bandWidth: number): Map<string,(number|null)[]> {
        if(close==undefined) throw Error("Missing close.");
        if(period<=0) throw Error("Fast period must be a positive integer.");
        let sma = this.sma(close, period).get('sma');
        let dev = this.stddev(close, sma, period).get('stddev');
        dev = this.multiply(dev, bandWidth).get('multiply');
        let upper = this.plus(sma, dev).get('plus');
        let lower = this.minus(sma, dev).get('minus');

        // @ts-ignore
        return new Map([
            ["bbands_upper",upper],
            ["bbands_sma",sma],
            ["bbands_lower",lower],
        ]);
    }

    /**
     * Volume-Weighted Average Price
     * @param close
     * @param volume
     * @param period
     */
    public static vwap(close: (number|null)[]|undefined, volume: (number|null)[]|undefined, period: number) {
        return this.wsma(close, volume, period);
    }

    /**
     * Volume-Weighted Exponential Average Price
     * @param close
     * @param volume
     * @param period
     */
    public static vweap(close: (number|null)[]|undefined, volume: (number|null)[]|undefined, period: number) {
        return this.wema(close, volume, period, 2);
    }

}

