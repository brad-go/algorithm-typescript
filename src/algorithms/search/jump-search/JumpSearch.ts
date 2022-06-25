import Comparator, { CompareFunction } from '../../../utils/Comparator';

const jumpSearch = <T>(
  sortedArray: T[],
  target: T,
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
): number => {
  const comparator = new Comparator(compareFunction);
  const arraySize = sortedArray.length;

  if (!arraySize) return -1;

  const jumpSize = Math.floor(Math.sqrt(arraySize));

  let blockStart = 0;
  let blockEnd = jumpSize;

  // prettier-ignore
  while (comparator.greaterThan(target, sortedArray[Math.min(blockEnd, arraySize) - 1])) {
    blockStart = blockEnd;
    blockEnd += jumpSize;

    if (blockStart > arraySize) return -1;
  }

  let currentIndex = blockStart;

  while (currentIndex < Math.min(blockEnd, arraySize)) {
    if (comparator.equal(sortedArray[currentIndex], target)) {
      return currentIndex;
    }

    currentIndex++;
  }

  return -1;
};

export default jumpSearch;
