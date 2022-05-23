import {TALib} from "../src";

let open = [146.28,145.7,145.47,145.47,145.12,145.02,145.25,145.19,144.97,144.95];
let high = [146.59,145.74,145.7,145.47,145.12,145.26,145.27,145.25,145.01,145.13];
let low = [145.85,145.53,145.4,145.0,144.92,145.0,145.12,144.91,144.92,144.93];
let close = [146.2,145.58,145.47,145.12,145.03,145.11,145.25,144.98,144.98,145.1];
let volume = [9294955,1013555,1010936,1036917,841699,947339,771789,1480890,1308324,967320];




describe('testing index file', () => {
    test('+ - * / %', () => {
        expect(TALib.plus([1,2,3], 4).get('plus')).toEqual([5,6,7]);
        expect(TALib.plus([1,2,3], [4,5,6]).get('plus')).toEqual([5,7,9]);
        expect(TALib.minus([1,2,3], 4).get('minus')).toEqual([-3,-2,-1]);
        expect(TALib.minus([1,2,3], [4,5,6]).get('minus')).toEqual([-3,-3,-3]);
    });


    test('std', () => {
        expect(TALib.sma([1,2,3,4,5], 4).get('sma')).toEqual([null,null,null, 2.5, 3.5]);
        expect(TALib.stddev([0,0,0,0,0], TALib.sma([0,0,0,0,0], 4).get('sma'), 4).get('stddev')).toEqual([null,null,null, 0, 0]);
        expect(TALib.stddev([1,2,3,4,5], TALib.sma([1,2,3,4,5], 4).get('sma'), 4).get('stddev')).toEqual([null,null,null, 1.118033988749895, 1.118033988749895]);

    });

    test('moving average ', () => {
        expect(TALib.sma(close, 4).get('sma')).toEqual([null,null,null, 145.5925, 145.3 , 145.1825, 145.1275, 145.0925, 145.08  , 145.07750000000001]);

    });



    test('adx', () => {

        //expect(TALib.tr(high, low, close).get('tr')).toEqual([null,0.67, 0.3 , 0.47, 0.2 , 0.26, 0.16, 0.34, 0.09, 0.2]);
        //expect(TALib.atr(high, low, close, 4).get('atr')).toEqual([null,null,null,null,0.41, 0.3725, 0.319375, 0.32453125, 0.26589844, 0.24942383]);
        expect(TALib.adx(high, low, close, 4).get('adx')).toEqual([null,null,null,null,null,null,null, 71.38958582, 71.34203284, 60.06560322]);



    });

});