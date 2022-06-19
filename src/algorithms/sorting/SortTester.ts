import { CompareFunction } from '../../utils';

export interface SortFunction<T> {
  (array: T[], compareFunction?: CompareFunction<T>): T[];
}

export const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export const reverseArray = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
export const notSortedArray = [12, 8, 5, 10, 1, 9, 11, 7, 3, 2, 6, 4];
export const reaptingArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
export const negativeArray = [-1, 0, 5, -10, 20, 13, -7, 3, 2, -3];
export const negativeArraySorted = [-10, -7, -3, -1, 0, 2, 3, 5, 13, 20];

class SortTester {
  static testSort(sortFunction: SortFunction<number>) {
    const sort: SortFunction<number> = sortFunction;

    expect(sort([])).toEqual([]);
    expect(sort([1])).toEqual([1]);
    expect(sort([1, 2])).toEqual([1, 2]);
    expect(sort([2, 1])).toEqual([1, 2]);
    expect(sort([3, 4, 2, 1, 0, 0, 4, 3, 4, 2])).toEqual([
      0, 0, 1, 2, 2, 3, 3, 4, 4, 4,
    ]);
    expect(sort(sortedArray)).toEqual(sortedArray);
    expect(sort(reverseArray)).toEqual(sortedArray);
    expect(sort(notSortedArray)).toEqual(sortedArray);
    expect(sort(reaptingArray)).toEqual(reaptingArray);
  }

  static testNegativeNumberSort(sortFunction: SortFunction<number>) {
    const sort: SortFunction<number> = sortFunction;

    expect(sort(negativeArray)).toEqual(negativeArraySorted);
  }

  static testSortWithCustomComparator(sortFunction: SortFunction<string>) {
    const customCompareFn = (a: string, b: string) => {
      console.log(a.length, b.length);
      if (a.length === b.length) return 0;

      return a.length < b.length ? -1 : 1;
    };

    const sort: SortFunction<string> = sortFunction;

    expect(sort([''], customCompareFn)).toEqual(['']);
    expect(sort(['a'], customCompareFn)).toEqual(['a']);
    expect(sort(['aa', 'a'], customCompareFn)).toEqual(['a', 'aa']);
    // prettier-ignore
    expect(sort(['aa', 'q', 'bbbb', 'ccc'], customCompareFn)).toEqual(['q', 'aa', 'ccc', 'bbbb']);
    expect(sort(['aa', 'aa'], customCompareFn)).toEqual(['aa', 'aa']);
  }

  static testSortStability(sortFunction: SortFunction<string>) {
    const customCompareFn = (a: string, b: string) => {
      if (a.length === b.length) return 0;

      return a.length < b.length ? -1 : 1;
    };

    const sort: SortFunction<string> = sortFunction;

    expect(sort(['bb', 'aa', 'c'], customCompareFn)).toEqual(['c', 'bb', 'aa']);
    // prettier-ignore
    expect(sort(['aa', 'q', 'a', 'bbbb', 'ccc'], customCompareFn)).toEqual(['q', 'a', 'aa', 'ccc', 'bbbb']);
  }
}

export default SortTester;
