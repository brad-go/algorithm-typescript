import { MinHeap } from '../heap';
import Comparator from '../../utils/Comparator';

class PriorityQueue<T> extends MinHeap<T> {
  private priorities = new Map();

  constructor() {
    super();
    // 힙 요소의 값 대신 요소의 우선 순위를 고려하는 비교하는 사용자 지정 Comparator
    this.compare = new Comparator(this.comparePriority.bind(this));
  }

  // 큐가 가진 요소들의 개수를 반환한다. - O(1)
  size(): number {
    return super.size();
  }

  // 큐가 비었는지 확인한다. - O(1)
  isEmpty(): boolean {
    return super.isEmpty();
  }

  // 우선 순위 큐에 요소를 삽입한다. - O(log n)
  enqueue(item: T, priority: number = 0): PriorityQueue<T> {
    this.priorities.set(item, priority);
    super.add(item);

    return this;
  }

  // 우선 순위가 가장 낮은 요소를 제거한다. - O(log n)
  dequeue(): T | null {
    const deletedNode = super.poll();
    this.priorities.delete(deletedNode);

    return deletedNode;
  }

  // 우선 순위 큐에 요소가 있다면 제거한다. - O(n)
  remove(item: T, customFindingComparator?: Comparator<T>): T {
    const removedElement = super.remove(item, customFindingComparator);
    this.priorities.delete(item);

    return removedElement;
  }

  // 우선 순위 큐에서 입력받은 요소와 같은 요소의 인덱스를 반환한다. - O(n)
  findIndex(value: T): number {
    const elementIndex = this.heap.findIndex((el: T) =>
      this.compare.equal(el, value),
    );

    return elementIndex;
  }

  // 큐의 맨 앞 요소를 보여준다. - O(1)
  peek(): T | null {
    return super.peek();
  }

  // 힙에 요소가 존재하는지 확인한다. - O(n)
  contains(item: T): boolean {
    return super.contains(item);
  }

  // 큐를 초기화한다. -O(1)
  clear(): void {
    super.clear();
    this.priorities.clear();
  }

  // 큐가 가진 요소의 우선 순위를 변경한다. - O(n)
  changePriority(item: T, priority: number): PriorityQueue<T> {
    this.remove(item, new Comparator(this.compareValue));
    this.enqueue(item, priority);

    return this;
  }

  private compareValue(a: T, b: T) {
    if (a === b) return 0;

    return a < b ? -1 : 1;
  }

  // 큐의 우선 순위를 비교한다. - O(1)
  private comparePriority(a: T, b: T): number {
    if (this.priorities.get(a) === this.priorities.get(b)) return 0;

    return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
  }

  // 큐를 우선 순위 순서로 배열로 반환한다.
  toArray(): T[] {
    if (!this.heap.length) return [];

    const arr = [...this.priorities.entries()]
      .sort((a, b) => a[1] - b[1])
      .map((el) => el[0]);
    return arr;
  }

  toString(): string {
    const arr = this.toArray();
    if (!arr.length) return '';

    return arr.toString();
  }

  *iterator(): IterableIterator<T> {
    const arr = this.toArray();

    for (let i = 0; i < arr.length; i++) {
      yield arr[i];
    }
  }

  [Symbol.iterator]() {
    return this.iterator();
  }
}

export default PriorityQueue;
