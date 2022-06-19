import bubbleSort from '../BubbleSort';
import SortTester from '../../SortTester';

describe('BubbleSort', () => {
  it('should sort array', () => SortTester.testSort(bubbleSort));

  it('should sort array with custom comparator', () => {
    SortTester.testSortWithCustomComparator(bubbleSort);
  });

  it('should do stable sorting', () => {
    SortTester.testSortStability(bubbleSort);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumberSort(bubbleSort);
  });
});
