import SortTester from '../../SortTester';
import quickSort from '../QuickSort';

describe('Quick Sort', () => {
  it('should be sort array', () => {
    SortTester.testSort(quickSort);
  });

  it('should sort array with custom comparator', () => {
    SortTester.testSortWithCustomComparator(quickSort);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumberSort(quickSort);
  });

  it('should do stable sorting', () => {
    SortTester.testSortStability(quickSort);
  });
});
