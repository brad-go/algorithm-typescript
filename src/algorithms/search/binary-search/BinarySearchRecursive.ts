import Comparator, { CompareFunction } from '../../../utils/Comparator';

const binarySearch = <T>(
  sortedArray: T[],
  target: T,
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
): number => {
  let startIndex = 0;
  let endIndex = sortedArray.length - 1;

  return binarySearchRecursive(sortedArray, target, startIndex, endIndex, compareFunction); // prettier-ignore
};

const binarySearchRecursive = <T>(
  array: T[],
  target: T,
  startIndex: number,
  endIndex: number,
  compareFunction: CompareFunction<T>,
): number => {
  if (startIndex > endIndex) return -1;

  const comparator = new Comparator(compareFunction);

  const middleIndex = Math.floor((startIndex + endIndex) / 2);
  const currentElement = array[middleIndex];

  if (comparator.lessThan(currentElement, target)) {
    return binarySearchRecursive(array, target, middleIndex + 1, endIndex, compareFunction); // prettier-ignore
  } else if (comparator.greaterThan(currentElement, target)) {
    return binarySearchRecursive(array, target, startIndex, middleIndex - 1, compareFunction); // prettier-ignore
  } else {
    return middleIndex;
  }
};

export default binarySearch;
