import Comparator, { CompareFunction } from './Comparator';

export const findMinValue = <T>(
  array: T[],
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
) => {
  if (!array || array.length <= 0) return 0;

  const comparator = new Comparator(compareFunction);

  let min = array[0];
  for (let i = 1; i < array.length; i++) {
    if (comparator.lessThan(array[i], min)) min = array[i];
  }

  return min;
};

export const findMaxValue = <T>(
  array: T[],
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
) => {
  if (!array || array.length <= 0) return 0;

  const comparator = new Comparator(compareFunction);

  let max = array[0];
  for (let i = 1; i < array.length; i++) {
    if (comparator.greaterThan(array[i], max)) max = array[i];
  }

  return max;
};
