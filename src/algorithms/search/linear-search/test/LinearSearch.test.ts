import SearchTester from '../../SearchTester';
import linearSearch from '../LinearSearch';

describe('Linear Search', () => {
  it('should search value in number array', () => {
    SearchTester.testSearchNumber(linearSearch);
  });

  it('should search value in float number array', () => {
    SearchTester.testSearchFloatNumber(linearSearch);
  });

  it('should search value in char array', () => {
    SearchTester.testSearchChar(linearSearch);
  });

  it('should serach value in string array', () => {
    SearchTester.testSearchString(linearSearch);
  });

  it('should search value with custom comparator', () => {
    SearchTester.testSearchWithCustomComparator(linearSearch);
  });
});
