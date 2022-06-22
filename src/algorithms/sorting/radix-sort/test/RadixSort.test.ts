import radixSort from '../RadixSort';
import SortTester, { SortFunction } from '../../SortTester';

describe('RadixSort', () => {
  it('should be sort array', () => {
    SortTester.testSort(radixSort as SortFunction<number>);
  });
});
