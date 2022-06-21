import SortTester from '../../SortTester';
import heapSort from '../HeapSort';

describe('Heap Sort', () => {
  it('should be sort array', () => {
    SortTester.testSort(heapSort);
  });

  it('should sort with custom comparator', () => {
    SortTester.testSortWithCustomComparator(heapSort);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumberSort(heapSort);
  });
});
