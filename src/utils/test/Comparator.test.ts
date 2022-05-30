import Comparator from '../Comparator';

describe('Comparator', () => {
  describe('Default comparator function', () => {
    const comparator = new Comparator();

    it('should be possible to compare equivalence', () => {
      expect(comparator.equal(0, 0)).toBeTruthy();
      expect(comparator.equal(0, 1)).toBeFalsy();
      expect(comparator.equal('a', 'a')).toBeTruthy();
    });

    it('should be possible to compare whether it is small or not', () => {
      expect(comparator.lessThan(1, 2)).toBeTruthy();
      expect(comparator.lessThan(-1, 2)).toBeTruthy();
      expect(comparator.lessThan('a', 'b')).toBeTruthy();
      expect(comparator.lessThan('a', 'ab')).toBeTruthy();
      expect(comparator.lessThan(10, 2)).toBeFalsy();
      expect(comparator.lessThanOrEqual(1, 1)).toBeTruthy();
      expect(comparator.lessThanOrEqual(0, 0)).toBeTruthy();
    });

    it('should be possible to compare whether it is large or not', () => {
      expect(comparator.greaterThan(0, 0)).toBeFalsy();
      expect(comparator.greaterThan(10, 0)).toBeTruthy();
      expect(comparator.greaterThanOrEqual(10, 0)).toBeTruthy();
      expect(comparator.greaterThanOrEqual(10, 10)).toBeTruthy();
      expect(comparator.greaterThanOrEqual(0, 10)).toBeFalsy();
    });
  });

  describe('Custom Comparator function', () => {
    const comparator = new Comparator((a: string, b: string) => {
      if (a.length === b.length) return 0;

      return a.length < b.length ? -1 : 1;
    });

    it('should compare with custom comparator function', () => {
      expect(comparator.equal('a', 'b')).toBeTruthy();
      expect(comparator.equal('a', '')).toBeFalsy();
      expect(comparator.lessThan('b', 'aa')).toBeTruthy();
      expect(comparator.greaterThanOrEqual('a', 'aa')).toBeFalsy();
      expect(comparator.greaterThanOrEqual('aa', 'a')).toBeTruthy();
      expect(comparator.greaterThanOrEqual('a', 'a')).toBeTruthy();
    });

    it('should be reversable', () => {
      comparator.reverse();

      expect(comparator.equal('a', 'b')).toBeTruthy();
      expect(comparator.equal('a', '')).toBeFalsy();
      expect(comparator.lessThan('b', 'aa')).toBeFalsy();
      expect(comparator.greaterThanOrEqual('a', 'aa')).toBeTruthy();
      expect(comparator.greaterThanOrEqual('aa', 'a')).toBeFalsy();
      expect(comparator.greaterThanOrEqual('a', 'a')).toBeTruthy();
    });
  });
});
