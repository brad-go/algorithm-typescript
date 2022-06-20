import Comparator, { CompareFunction } from '../../../utils/Comparator';

const selectionSort = <T>(
  originalArray: T[],
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
) => {
  const array = [...originalArray];
  const comparator = new Comparator(compareFunction);

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < array.length; j++) {
      if (comparator.lessThan(array[j], array[minIndex])) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }

  return array;
};

export default selectionSort;
