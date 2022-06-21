import { MinHeap } from '../../../data-structures/heap';
import Comparator, { CompareFunction } from '../../../utils';

const heapSort = <T>(
  array: T[],
  compareFunction: CompareFunction<T> = Comparator.defaultCompareFunction,
) => {
  const sortedArray = [];
  const minHeap = new MinHeap(undefined, compareFunction);

  // 배열의 모든 요소를 최소 힙에 넣어주기
  array.forEach((element) => {
    minHeap.add(element);
  });

  // 가장 작은 요소가 항상 루트 노드에 위치하고 있다.
  while (!minHeap.isEmpty()) {
    const nextMinElement = minHeap.poll();

    sortedArray.push(nextMinElement);
  }

  return sortedArray;
};

export default heapSort;
