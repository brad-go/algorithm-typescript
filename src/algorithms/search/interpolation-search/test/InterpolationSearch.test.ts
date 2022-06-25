import SearchTester from '../../SearchTester';
import interpolationSearch from '../InterpolationSearch';

describe('Interpolation Search', () => {
  it('should search value in number array', () => {
    SearchTester.testSearchNumber(interpolationSearch);
  });

  it('should search value in float number array', () => {
    SearchTester.testSearchFloatNumber(interpolationSearch);
  });
});
