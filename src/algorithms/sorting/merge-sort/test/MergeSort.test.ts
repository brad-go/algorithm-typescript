import mergeSort from '../MergeSort';
import SortTester from '../../SortTester';

describe('Merge Sort', () => {
  it('should be sort array', () => {
    SortTester.testSort(mergeSort);
  });

  it('should sort array with custom comparator', () => {
    SortTester.testSortWithCustomComparator(mergeSort);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumberSort(mergeSort);
  });

  it('should do stable sorting', () => {
    SortTester.testSortStability(mergeSort);
  });
});
