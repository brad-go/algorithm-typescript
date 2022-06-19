import Comparator, { CompareFunction } from '../../../utils';

const bubbleSort = <T>(
  array: T[],
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
): T[] => {
  const comparator = new Comparator<T>(compareFunction);

  for (let i = 1; i < array.length; i++) {
    for (let j = 0; j < array.length - i; j++) {
      if (comparator.greaterThan(array[j], array[j + 1])) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        /* const temp = array[a];
          array[a] = array[b];
          array[b] = temp; */
      }
    }
  }

  return array;
};

export default bubbleSort;
