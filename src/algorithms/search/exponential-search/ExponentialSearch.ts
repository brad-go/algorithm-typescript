import Comparator, { CompareFunction } from '../../../utils';

const exponentialSearch = <T>(
  array: T[],
  target: T,
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
): number => {
  const comparator = new Comparator(compareFunction);

  if (comparator.equal(array[0], target)) return 0;

  let index = 1;
  while (
    index < array.length &&
    comparator.lessThanOrEqual(array[index], target)
  ) {
    index *= 2;
  }

  return binarySearch(array, target, index / 2, Math.min(index, array.length - 1), compareFunction); // prettier-ignore
};

const binarySearch = <T>(
  array: T[],
  target: T,
  startIndex: number,
  endIndex: number,
  compareFunction: CompareFunction<T>,
): number => {
  const comparator = new Comparator(compareFunction);

  while (startIndex <= endIndex) {
    const middleIndex = Math.floor((startIndex + endIndex) / 2);

    if (comparator.lessThan(array[middleIndex], target)) {
      startIndex = middleIndex + 1;
    } else if (comparator.greaterThan(array[middleIndex], target)) {
      endIndex = middleIndex - 1;
    } else return middleIndex;
  }

  return -1;
};

export default exponentialSearch;
