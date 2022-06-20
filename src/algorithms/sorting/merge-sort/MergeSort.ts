import Comparator, { CompareFunction } from '../../../utils/Comparator';

const mergeSort = <T>(
  array: T[],
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
): T[] => {
  if (array.length <= 1) return array;

  const middleIndex = Math.floor(array.length / 2);
  const leftArray = mergeSort(array.slice(0, middleIndex), compareFunction);
  // prettier-ignore
  const rightArray = mergeSort(array.slice(middleIndex, array.length), compareFunction);

  return merge(leftArray, rightArray, compareFunction);
};

const merge = <T>(
  leftArray: T[],
  rightArray: T[],
  compareFunction: CompareFunction<T>,
) => {
  const sortedArray = [];
  const comparator = new Comparator(compareFunction);

  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    let minElement = null;

    // prettier-ignore
    if (comparator.lessThanOrEqual(leftArray[leftIndex], rightArray[rightIndex])) {
      minElement = leftArray[leftIndex];
      leftIndex++;
    } else {
      minElement = rightArray[rightIndex];
      rightIndex++;
    }

    sortedArray.push(minElement);
  }

  return sortedArray
    .concat(leftArray.slice(leftIndex))
    .concat(rightArray.slice(rightIndex));
};

export default mergeSort;
