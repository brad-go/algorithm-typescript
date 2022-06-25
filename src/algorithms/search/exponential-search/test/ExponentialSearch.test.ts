import SearchTester from '../../SearchTester';
import exponentialSearch from '../ExponentialSearch';

describe('Binary Search', () => {
  it('should search value in number array', () => {
    SearchTester.testSearchNumber(exponentialSearch);
  });

  it('should search value in float number array', () => {
    SearchTester.testSearchFloatNumber(exponentialSearch);
  });

  it('should search value in char array', () => {
    SearchTester.testSearchChar(exponentialSearch);
  });

  it('should serach value in string array', () => {
    SearchTester.testSearchString(exponentialSearch);
  });

  it('should search value with custom comparator', () => {
    SearchTester.testSearchWithCustomComparator(exponentialSearch);
  });
});
