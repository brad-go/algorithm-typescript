import Comparator, { CompareFunction } from '../../../utils';

const quickSort = <T>(
  array: T[],
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
): T[] => {
  if (array.length <= 1) return array;
  const comparator = new Comparator(compareFunction);

  const pivot = array[0];
  const centerArray = [pivot];

  const leftArray = [];
  const rightArray = [];

  for (let i = 1; i < array.length; i++) {
    const current = array[i];

    if (comparator.lessThan(current, pivot)) leftArray.push(current);
    else if (comparator.greaterThan(current, pivot)) rightArray.push(current);
    else centerArray.push(current);
  }

  const leftArraySorted = quickSort(leftArray, compareFunction);
  const rightArraySorted = quickSort(rightArray, compareFunction);

  return leftArraySorted.concat(centerArray, rightArraySorted);
};

export default quickSort;
