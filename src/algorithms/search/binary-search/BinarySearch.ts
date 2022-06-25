import Comparator, { CompareFunction } from '../../../utils/Comparator';

const binarySearch = <T>(
  sortedArray: T[],
  target: T,
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
): number => {
  const comparator = new Comparator(compareFunction);

  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  while (startIndex <= endIndex) {
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    const currentElement = sortedArray[middleIndex];

    if (comparator.lessThan(currentElement, target)) {
      startIndex = middleIndex + 1;
    } else if (comparator.greaterThan(currentElement, target)) {
      endIndex = middleIndex - 1;
    } else {
      return middleIndex;
    }
  }

  return -1;
};

export default binarySearch;
