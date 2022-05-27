import Heap from './Heap';
import * as utils from '../../utils';

class MinHeap<T> extends Heap<T> {
  constructor(
    elements?: Iterable<T>,
    compareFunction?: utils.CompareFunction<T>,
  ) {
    super(elements, compareFunction);
  }

  // 힙 요소들이 올바른 순서로 존재하는지 체크
  // MinHeap의 경우 첫번째 요소가 두번째보다 작거나 같아야 한다.
  // MaxHeap의 경우 첫번째 요소가 두번째보다 크거나 같아야 한다.
  protected isCorrectOrder(idx1: number, idx2: number) {
    return this.compare(this.heap[idx1], this.heap[idx2]) <= 0;
  }
}

export default MinHeap;
