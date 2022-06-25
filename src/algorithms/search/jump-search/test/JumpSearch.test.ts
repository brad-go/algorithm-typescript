import SearchTester from '../../SearchTester';
import jumpSearch from '../JumpSearch';

describe('Linear Search', () => {
  it('should search value in number array', () => {
    SearchTester.testSearchNumber(jumpSearch);
  });

  it('should search value in float number array', () => {
    SearchTester.testSearchFloatNumber(jumpSearch);
  });

  it('should search value in char array', () => {
    SearchTester.testSearchChar(jumpSearch);
  });

  it('should serach value in string array', () => {
    SearchTester.testSearchString(jumpSearch);
  });

  it('should search value with custom comparator', () => {
    SearchTester.testSearchWithCustomComparator(jumpSearch);
  });
});
