import Comparator, { CompareFunction } from '../../../utils/Comparator';

const heapSort = <T>(
  array: T[],
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
) => {
  const heapSize = array.length;
  const comparator = new Comparator(compareFunction);

  buildMaxHeap(array, heapSize, comparator);

  for (let i = heapSize - 1; i > 0; i--) {
    swap(array, 0, i);
    heapify(array, i, 0, comparator);
  }

  return array;
};

// prettier-ignore
const buildMaxHeap = <T>(array: T[], heapSize: number, comparator: Comparator<T>,) => {
  const startIndex = Math.floor(heapSize / 2);

  for (let i = startIndex; i >= 0; i--) {
    heapify(array, heapSize, i, comparator);
  }
};

// prettier-ignore
const heapify = <T>(array: T[], heapSize: number, rootIndex: number, comparator: Comparator<T>) => {
  const leftChildeIndex = rootIndex * 2 + 1;
  const rightChildIndex = rootIndex * 2 + 2;

  let maxIndex = rootIndex;

  if (leftChildeIndex < heapSize && comparator.lessThan(array[maxIndex], array[leftChildeIndex])) {
    maxIndex = leftChildeIndex;
  }
  if (rightChildIndex < heapSize && comparator.lessThan(array[maxIndex], array[rightChildIndex])) {
    maxIndex = rightChildIndex;
  }

  if (maxIndex !== rootIndex) {
    swap(array, rootIndex, maxIndex);
    heapify(array, heapSize, maxIndex, comparator);
  }
};

const swap = <T>(array: T[], index1: number, index2: number) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
};

export default heapSort;
