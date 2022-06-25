import Comparator, { CompareFunction } from '../../../utils';

const interpolationSearch = (
  sortedArray: number[],
  target: number,
  leftIndex = 0,
  rightIndex = sortedArray.length - 1,
  compareFunction: CompareFunction<number> = Comparator.defaultCompareFunction,
): number => {
  if (leftIndex > rightIndex) return -1;

  const comparator = new Comparator(compareFunction);

  const valueDelta = target - sortedArray[leftIndex]; // X - arr[low]
  const indexDelta = rightIndex - leftIndex; // high - low
  const rangeDelta = sortedArray[rightIndex] - sortedArray[leftIndex]; // arr[high] - arr[low]

  if (valueDelta < 0) return -1;
  if (!rangeDelta) return sortedArray[leftIndex] === target ? leftIndex : -1;

  const middleIndex =
    leftIndex + Math.floor((valueDelta * indexDelta) / rangeDelta);

  if (comparator.equal(sortedArray[middleIndex], target)) return middleIndex;

  if (comparator.lessThan(sortedArray[middleIndex], target)) {
    return interpolationSearch(sortedArray, target, middleIndex + 1, rightIndex, compareFunction); // prettier-ignore
  }
  if (comparator.greaterThan(sortedArray[middleIndex], target)) {
    return interpolationSearch(sortedArray, target, leftIndex, middleIndex - 1, compareFunction); // prettier-ignore
  }

  return -1;
};

export default interpolationSearch;
