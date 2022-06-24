import Comparator, { CompareFunction } from '../../../utils';

const linearSearch = <T>(
  array: T[],
  value: T,
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
) => {
  const comparator = new Comparator(compareFunction);

  for (let i = 0; i < array.length; i++) {
    if (comparator.equal(array[i], value)) return i;
  }
  return -1;
};

export default linearSearch;
