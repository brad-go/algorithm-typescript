import SortTester from '../../SortTester';
import insertionSort from '../InsertionSort';

describe('Insertion Sort', () => {
  it('should be sort array', () => {
    SortTester.testSort(insertionSort);
  });

  it('should sort array with custom comparator', () => {
    SortTester.testSortWithCustomComparator(insertionSort);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumberSort(insertionSort);
  });

  it('should do stable sorting', () => {
    SortTester.testSortStability(insertionSort);
  });
});
