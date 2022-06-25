import SearchTester, { SearchFunction } from '../../SearchTester';
import interpolationSearch from '../InterpolationSearchRecursive';

describe('Interpolation Search', () => {
  it('should search value in number array', () => {
    SearchTester.testSearchNumber(
      interpolationSearch as SearchFunction<number>,
    );
  });

  it('should search value in float number array', () => {
    SearchTester.testSearchFloatNumber(
      interpolationSearch as SearchFunction<number>,
    );
  });
});
