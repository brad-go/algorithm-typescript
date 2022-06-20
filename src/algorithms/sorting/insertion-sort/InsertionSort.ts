import Comparator, { CompareFunction } from '../../../utils/Comparator';

const insertionSort = <T>(
  array: T[],
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
) => {
  const comparator = new Comparator(compareFunction);

  for (let i = 1; i < array.length; i++) {
    let temp = array[i];
    let currentIndex = i;

    while (
      currentIndex > 0 &&
      comparator.lessThan(temp, array[currentIndex - 1])
    ) {
      array[currentIndex] = array[currentIndex - 1];
      currentIndex--;
    }

    array[currentIndex] = temp;
  }

  return array;
};

export default insertionSort;
