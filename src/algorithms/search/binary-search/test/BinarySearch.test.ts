import SearchTester from '../../SearchTester';
import binarySearch from '../BinarySearch';

describe('Binary Search', () => {
  it('should search value in number array', () => {
    SearchTester.testSearchNumber(binarySearch);
  });

  it('should search value in float number array', () => {
    SearchTester.testSearchFloatNumber(binarySearch);
  });

  it('should search value in char array', () => {
    SearchTester.testSearchChar(binarySearch);
  });

  it('should serach value in string array', () => {
    SearchTester.testSearchString(binarySearch);
  });

  it('should search value with custom comparator', () => {
    SearchTester.testSearchWithCustomComparator(binarySearch);
  });
});
