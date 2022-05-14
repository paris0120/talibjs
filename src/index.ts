export class TALib {
    public static sma(value: (number|null)[], period: number): {sma:(number|null)[]} {
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
        return {sma:sma};
    }


    public static wsma(value: (number|null)[], weight: (number|null)[], period: number): {wsma:(number|null)[]} {
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
        return {wsma:sma};
    }


    public static wema(value: (number|null)[], weight: number[], period: number, smoothing: number): { wema:(number|null)[]} {
        let outputIndex = [];
        if(weight.length!=value.length) throw Error("Value and weight must have same length.");
        if(period<=0) throw Error("Period must be a positive number.");
        let sum = 0;
        let wsum = 0;
        let factor = smoothing/(1+period);
        let ema:(number|null)[] = [];
        for(let i=0;i<value.length;i++) {
            if(value[i]!=null) {
                // @ts-ignore
                sum=value[i]*weight[i]*factor + sum * (1-factor);
                wsum=weight[i]*factor + wsum * (1-factor);
                ema.push(sum/wsum);
            }
        }
        return {wema:ema};
    }


    public static ema(value: (number|null)[], period: number, smoothing: number): {ema:(number|null)[]} {
        let outputIndex = [];
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
        return {ema:ema};
    }


    public static minus(value1:(number|null)[], value2:(number|null)[]): { minus:(number|null)[] } {
        if(value1.length!=value2.length) throw Error("Two values have different lengths.");
        let output:(number|null)[] = [];
        for(let i = 0;i<value1.length;i++) {
            if(value2[i]==null || value2[i] == null) output.push(null);
            else { // @ts-ignore
                output.push(value1[i]-value2[i]);
            }
        }

        return {minus:output};
    }


    public static plus(value1:(number|null)[], value2:(number|null)[]): { plus:(number|null)[] } {
        if(value1.length!=value2.length) throw Error("Two values have different lengths.");
        let output:(number|null)[] = [];
        for(let i = 0;i<value1.length;i++) {
            if(value2[i]==null || value2[i] == null) output.push(null);
            else { // @ts-ignore
                output.push(value1[i]+value2[i]);
            }
        }
        return {plus:output};
    }

    public static divide(value1:(number|null)[], value2:(number|null)[]): { divide:(number|null)[] } {
        if(value1.length!=value2.length) throw Error("Two values have different lengths.");
        let output:(number|null)[] = [];
        for(let i = 0;i<value1.length;i++) {
            if(value2[i]==null || value2[i] == null) output.push(null);
            else { // @ts-ignore
                output.push(value1[i]/value2[i]);
            }
        }
        return {divide:output};
    }

    public static mod(value1:(number|null)[], value2:(number|null)[]): { mod:(number|null)[] } {
        if(value1.length!=value2.length) throw Error("Two values have different lengths.");
        let output:(number|null)[] = [];
        for(let i = 0;i<value1.length;i++) {
            if(value2[i]==null || value2[i] == null) output.push(null);
            else { // @ts-ignore
                output.push(value1[i]%value2[i]);
            }
        }
        return {mod:output};
    }

    public static multiply(value1:(number|null)[], value2:(number|null)[]): { multiply:(number|null)[] } {
        if(value1.length!=value2.length) throw Error("Two values have different lengths.");
        let output:(number|null)[] = [];
        for(let i = 0;i<value1.length;i++) {
            if(value2[i]==null || value2[i] == null) output.push(null);
            else { // @ts-ignore
                output.push(value1[i]*value2[i]);
            }
        }
        return {multiply:output};
    }

    public static stddev(value: (number|null)[], average: (number|null)[], period: number): {stddev:(number|null)[]} {
        let outputIndex = [];
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
        return {stddev:std};
    }

    public static macdDefault = {fastPeriod:12, slowPeriod:26, signalPeriod:9};
    public static macd(index: any[], close: (number|null)[], fastPeriod: number, slowPeriod: number, signalPeriod: number): { macd:(number|null)[], signal:(number|null)[], hist:(number|null)[]} {
        if(index!=null && index.length!=close.length) throw Error("Incompatible index");
        if(fastPeriod<=0) throw Error("Fast period must be a positive integer.");
        if(slowPeriod<=0) throw Error("Slow period must be a positive integer.");
        if(signalPeriod<=0) throw Error("Signal period must be a positive integer.");
        let fast = this.ema(close, fastPeriod, 2);
        let slow = this.ema(close, slowPeriod, 2);

        let macd = this.minus(fast.ema, slow.ema).minus;
        let signal = this.ema(macd, signalPeriod, 2).ema;
        let hist = this.minus(macd, signal).minus;

        return {macd:macd,signal:signal,hist:hist};
    }


}

