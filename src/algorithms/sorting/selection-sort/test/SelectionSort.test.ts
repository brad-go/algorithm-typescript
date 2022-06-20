import selectionSort from '../SelectionSort';
import SortTester from '../../SortTester';

describe('SelectionSort', () => {
  it('should sort array', () => {
    SortTester.testSort(selectionSort);
  });

  it('should sort array with custom comparator', () => {
    SortTester.testSortWithCustomComparator(selectionSort);
  });

  it('should sort negative number', () => {
    SortTester.testNegativeNumberSort(selectionSort);
  });
});
