import SortTester from '../../SortTester';
import coutingSort from '../CountingSort';

describe('BubbleSort', () => {
  it('should sort array', () => SortTester.testSort(coutingSort));

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumberSort(coutingSort);
  });
});
