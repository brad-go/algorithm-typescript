import { CompareFunction } from '../../../../utils';
import SortTester from '../../SortTester';
import quickSort from '../QuickSortInPlace';

describe('Quick Sort In Place', () => {
  let quickSorting: <T>(
    array: T[],
    compareFunction?: CompareFunction<T>,
  ) => T[];

  beforeEach(() => {
    quickSorting = <T>(array: T[], compareFunction?: CompareFunction<T>) => {
      quickSort(array, 0, array.length - 1, compareFunction);
      return array;
    };
  });

  it('should be sort array', () => {
    SortTester.testSort(quickSorting);
  });

  it('should sort array with custom comparator', () => {
    SortTester.testSortWithCustomComparator(quickSorting);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumberSort(quickSorting);
  });
});
