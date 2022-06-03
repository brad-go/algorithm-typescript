import Comparator, { CompareFunction } from '../../utils';

abstract class Heap<T> {
  // 요소들을 담기 위한 동적인 배열
  private _heap: T[];
  private _compare: Comparator<T>;

  constructor(elements?: Iterable<T>, compareFunction?: CompareFunction<T>) {
    this._heap = [];
    this._compare = new Comparator(compareFunction);

    // 사용자가 요소들을 제공한다면, 추가하는 노드들의 힙을 만족하도록 각 노드들의 위치를 조정
    if (elements) {
      this._heap = [...elements]; // [...elements]
      this.heapify();
    }
  }

  get heap() {
    return this._heap;
  }

  get compare() {
    return this._compare;
  }

  set compare(comparator: Comparator<T>) {
    this._compare = comparator;
  }

  // 힙의 크기를 반환 - O(1)
  size(): number {
    return this._heap.length;
  }

  // 힙이 비었다면 true, 아니라면 false - O(1)
  isEmpty(): boolean {
    return !this.size();
  }

  // 힙을 문자열로 반환 - 0(1)
  toString() {
    return this._heap.toString();
  }

  // 힙의 특성을 유지한 채로 힙에 요소를 추가 - O(log n)
  add(element: T): this {
    this._heap.push(element);
    this.swim();

    return this;
  }

  // 힙의 최상위 요소를 보여준다. - O(1)
  peek(): T | null {
    if (this.isEmpty()) return null;

    return this._heap[0];
  }

  // 힙에 요소가 존재하면 true, 아니면 false - O(n)
  contains(element: T): boolean {
    return this._heap.includes(element);
  }

  // 힙의 최상위 요소(루트 노드)를 제거하고 반환 - O(log n)
  poll(): T | null {
    if (this.isEmpty()) return null;

    return this.removeAt(0);
  }

  // 요소가 존재하면 삭제한다. - O(n)
  remove(element: T, comparator: Comparator<T> = this.compare): T {
    const elementIndex = this._heap.findIndex((h: T) =>
      comparator.equal(element, h),
    );

    if (elementIndex === -1) throw new Error('No element in heap');

    const deleted = this.removeAt(elementIndex); // O(log n)
    return deleted;
  }

  // 힙 초기화 - O(1)
  clear(): void {
    this._heap.length = 0;
  }

  private heapify(): void {
    if (!this._heap.length) return;

    // 자식 노드들이 생길 때마다 노드의 개수가 2배씩 증가하기 때문에 1/2의 위치에서 비교 시작
    const MAX_INDEX_TO_COMPARE = Math.max(0, Math.floor(this.size() / 2) - 1);
    for (let i = MAX_INDEX_TO_COMPARE; i >= 0; i--) {
      this.sink(i);
    }

    // max 힙의 경우
    // 배열 자체를 힙으로 만드는 과정이기 때문에 하나씩 요소를 집어 넣는 것과는 결과가 다르다.
    // 하나씩 넣는 것과 같은 방식으로 구현하고 싶다면 17-21줄을 지우고 아래로 대체한다.
    //for (let i = 1; i <= this.size() - 1; i++) {
    //     this.swim(i);
    //   }
  }

  // 힙의 조건에 맞게 하위 요소의 위치로 sink시킨다. - O(log n)
  // sink한다는 것은 상위 요소와 하위 요소의 비교를 통해 힙의 조건에 맞는 하위 요소와 바꾸는 것
  // min heap의 경우 더 작은 요소와 바꾸고 max heap은 더 큰 요소와 바꾼다.
  // 최악의 경우 요소를 트리 전체의 높이 만큼 sink하므로 O(log n)의 시간 복잡도를 가진다.
  private sink(startIndex: number): void {
    let currentIndex = startIndex || 0;

    while (this.hasLeftChild(currentIndex)) {
      // 자식들의 인덱스를 가져온다.
      const leftChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);

      // 자식 인덱스들 비교
      const compareLeftAndRightChild =
        this.hasRightChild(currentIndex) &&
        this.isCorrectOrder(rightChildIndex, leftChildIndex);

      // MinHeap은 더 작은 자식, MaxHeap은 더 큰 자식을 다음 인덱스로 설정
      let nextIndex = compareLeftAndRightChild
        ? rightChildIndex
        : leftChildIndex;

      // 현재 요소가 자식보다 작으면 루프를 중지하고 빠져나온다. - MinHeap
      // 현재 요소가 자식보다 크면 루프를 중지하고 빠져나온다. - MaxHeap
      if (this.isCorrectOrder(currentIndex, nextIndex)) break;

      // 아니라면 바꿔준다.
      this.swap(currentIndex, nextIndex); // O(1);
      currentIndex = nextIndex; // 현재 인덱스를 자식 인덱스로 설정하고 루프를 반복
    }
  }

  // 힙 조건에 성립될 때까지 상위 인덱스로 요소를 swim 시킨다. - O(log n)
  // swim한다는 것은 하위 요소를 상위 요소와 비교해 올바른 순서가 될때까지 끌어 올리는 것
  // 최악의 경우 트리 전체를 헤엄쳐 올라가기 때문에 O(log n)의 시간 복잡도를 가진다.
  private swim(startIndex?: number): void {
    let childIndex = startIndex || this._heap.length - 1;
    // startIndex가 0이 들어올 경우 마지막 인덱스로 넘어가는 것 방지
    if (startIndex === 0) childIndex = 0;

    // 입력받은 인덱스의 부모가 존재하고, 부모 인덱스보다 작을 때까지 부모 인덱스와 맞바꾸기
    while (
      this.hasParent(childIndex) &&
      // this.isCorrectOrder(childIndex, this.getParentIndex(childIndex))
      !this.isCorrectOrder(this.getParentIndex(childIndex), childIndex)
    ) {
      this.swap(childIndex, this.getParentIndex(childIndex));

      childIndex = this.getParentIndex(childIndex);
    }
  }

  private removeAt(indexToRemove: number): T {
    const indexOfLastElement = this.size() - 1;
    // heapifying 이후에 return 할 수 있게 하기 위해 삭제할 요소를 저장
    const removedElement = this._heap[indexToRemove];

    // 삭제할 요소를 마지막 요소와 위치 변경하고 제거
    this.swap(indexToRemove, indexOfLastElement);
    this._heap.pop();

    // 힙이 비었다면 삭제된 요소를 반환
    if (!this._heap.length) return removedElement;

    // 삭제하고 있는 요소가 마지막 요소라면 heapify (sink/swim) 할 필요가 없음
    const isLastElementBeingRemoved = indexToRemove === indexOfLastElement;
    if (isLastElementBeingRemoved) return removedElement;

    // sinking(아래로 heapify) 시도
    const indexToBeHeapified = indexToRemove;
    const elementToBeHeapified = this._heap[indexToBeHeapified];
    this.sink(indexToBeHeapified);

    // sinking이 안된다면 swim 시도
    if (this._heap[indexToBeHeapified] === elementToBeHeapified) {
      this.swim(indexToBeHeapified);
    }

    return removedElement;
  }

  // O(1)
  private swap(idx1: number, idx2: number): void {
    const temp = this._heap[idx1];
    this._heap[idx1] = this._heap[idx2];
    this._heap[idx2] = temp;
  }

  // O(1)
  private hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this._heap.length;
  }

  // O(1)
  private hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this._heap.length;
  }

  // O(1)
  private hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0;
  }

  // O(1)
  private getLeftChildIndex(parentIndex: number): number {
    return parentIndex * 2 + 1;
  }

  // O(1)
  private getRightChildIndex(parentIndex: number): number {
    return parentIndex * 2 + 2;
  }

  // O(1)
  private getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2);
  }

  // 힙 요소들이 올바른 순서로 존재하는지 체크
  // MinHeap의 경우 첫번째 요소가 두번째보다 작거나 같아야 한다.
  // MaxHeap의 경우 첫번째 요소가 두번째보다 크거나 같아야 한다.
  protected abstract isCorrectOrder(idx1: number, idx2: number): boolean;
}

export default Heap;
