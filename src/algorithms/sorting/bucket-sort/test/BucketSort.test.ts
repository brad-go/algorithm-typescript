import SortTester, { SortFunction } from '../../SortTester';
import bucketSort from '../BucketSort';

describe('Bucket Sort', () => {
  it('should be sort array', () => {
    SortTester.testSort(bucketSort as SortFunction<number>);
  });

  it('should sort negative numbers', () => {
    SortTester.testNegativeNumberSort(bucketSort as SortFunction<number>);
  });
});
