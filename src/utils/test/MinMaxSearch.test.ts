import { findMinValue, findMaxValue } from '../MinMaxSearch';

describe('Min Max Search', () => {
  describe('Min Value Search', () => {
    it('should find minimum value', () => {
      const arr = [-4, -19, 0, 5, 93, 20];
      expect(findMinValue(arr)).toBe(-19);
    });

    it('should return false value when input array has problem', () => {
      const arr: number[] = [];
      expect(findMinValue(arr)).toBeFalsy();
    });

    it('should find minimum value with custom compare function', () => {
      const arr = ['a', 'bb', 'ccc', 'dddd', 'eeeee'];
      const customComapareFunction = (a: string, b: string) => {
        if (a.length === b.length) return 0;

        return a.length < b.length ? -1 : 1;
      };

      expect(findMinValue(arr, customComapareFunction)).toBe('a');
    });
  });

  describe('Max Value Search', () => {
    it('should find maximum value', () => {
      const arr = [-4, -19, 0, 5, 93, 20];
      expect(findMaxValue(arr)).toBe(93);
    });

    it('should return false value when input array has problem', () => {
      const arr: number[] = [];
      expect(findMaxValue(arr)).toBeFalsy();
    });

    it('should find maximum value with custom compare function', () => {
      const arr = ['a', 'bb', 'ccc', 'dddd', 'eeeee'];
      const customComapareFunction = (a: string, b: string) => {
        if (a.length === b.length) return 0;

        return a.length < b.length ? -1 : 1;
      };

      expect(findMaxValue(arr, customComapareFunction)).toBe('eeeee');
    });
  });
});
