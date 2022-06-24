import SortTester from '../../SortTester';
import shellSort from '../ShellSort';

describe('Shell Sort', () => {
  it('should be sort array', () => {
    SortTester.testSort(shellSort);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumberSort(shellSort);
  });

  it('should sort with custom comparator', () => {
    SortTester.testSortWithCustomComparator(shellSort);
  });
});
