import {TALib} from "../src";

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


});