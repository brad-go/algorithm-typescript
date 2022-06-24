import Comparator, { CompareFunction } from '../../../utils/Comparator';

const quickSort = <T>(
  array: T[],
  left = 0,
  right = array.length - 1,
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
) => {
  if (left >= right) return;

  const pivot = partition(array, left, right, compareFunction);

  if (left < pivot - 1) quickSort(array, left, pivot - 1, compareFunction);
  if (pivot < right) quickSort(array, pivot, right, compareFunction);

  return array;
};

// prettier-ignore
const partition = <T>(array: T[], left: number, right: number, compareFunction: CompareFunction<T>) => {
  const pivot = array[Math.floor((left + right) / 2)];
  const comparator = new Comparator(compareFunction);

  while (left <= right) {
    while (comparator.lessThan(array[left], pivot)) left++;
    while (comparator.greaterThan(array[right], pivot)) right--;

    if (left <= right) {
      swap(array, left, right);
      left++;
      right--;
    }
  }

  return left;
};

const swap = <T>(array: T[], index1: number, index2: number) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

export default quickSort;
