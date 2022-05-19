import DoublyLinkedListNode from './DoublyLinkedListNode';
import * as utils from '../../utils';

class DoublyLinkedList<T> {
  private head: DoublyLinkedListNode<T> | undefined;
  private tail: DoublyLinkedListNode<T> | undefined;
  private length: number = 0;

  // 리스트의 길이 반환 - O(1)
  size(): number {
    return this.length;
  }

  // 리스트가 비었다면 treu, 아니면 false - O(1)
  isEmpty(): boolean {
    return !this.length;
  }

  // 리스트 맨 앞에 노드 추가 - O(1)
  addFirst(value: T): this {
    const newNode = new DoublyLinkedListNode(value);

    if (this.head) {
      this.head.prev = newNode;
      newNode.next = this.head;
    } else this.tail = newNode;

    this.head = newNode;
    this.length++;

    return this;
  }

  // 리스트 맨 뒤에 노드 추가 - O(1)
  addLast(value: T): this {
    const newNode = new DoublyLinkedListNode(value);

    if (this.tail) {
      this.tail.next = newNode;
      newNode.prev = this.tail;
    } else this.head = newNode;

    this.tail = newNode;
    this.length++;

    return this;
  }

  // 인덱스가 있다면 해당 위치에 추가, 없다면 맨 뒤에 노드 추가
  add(value: T, idx?: number): this | null {
    if (idx === undefined || idx === this.size()) return this.addLast(value);
    if (idx === 0) return this.addFirst(value);
    if (idx < 0 || idx >= this.size() || !this.head) return null;

    const newNode = new DoublyLinkedListNode(value);
    let current = this.head;

    for (let i = 0; i < idx - 1; i++) {
      current = current.next!;
    }

    current.next!.prev = newNode;
    newNode.next = current.next;

    newNode.prev = current;
    current.next = newNode;

    this.length++;

    return this;
  }

  // 인덱스에 해당하는 요소 가져오기 - O(n)
  get(idx: number): T | null {
    if (idx < 0 || idx >= this.size() || !this.head) return null;

    let current = this.head;
    let i = 0;

    while (i < idx) {
      current = current.next!;
      i++;
    }

    return current.value;
  }

  // 맨 앞에 값 가져오기 - O(1)
  peekFirst(): T | null {
    if (!this.head) return null;

    return this.head.value;
  }

  // 맨 뒤의 값 가져오기 - O(1)
  peekLast(): T | null {
    if (!this.tail) return null;

    return this.tail.value;
  }

  // 리스트에 존재하는 특정 값의 인덱스 번호를 반환- O(n)
  indexOf(value: T, equalsFunction?: utils.EqualsFunction<T>): number {
    if (!this.head) return -1;

    const equalsFunc = equalsFunction || utils.defaultEquals;

    let idx = 0;
    let current = this.head;

    while (!equalsFunc(current.value, value)) {
      if (!current.next) return -1;

      current = current.next!;
      idx++;
    }

    return idx;
  }

  // 리스트에 특정 값이 존재하는지 boolean 값을 반환 - O(n)
  contains(value: T, equalsFunction?: utils.EqualsFunction<T>): boolean {
    const idx = this.indexOf(
      value,
      equalsFunction ? equalsFunction : undefined,
    );

    return idx !== -1;
  }

  // 특정 위치의 요소의 값을 변경하기 - O(n)
  set(value: T, idx: number): this | null {
    if (idx < 0 || idx >= this.size() || !this.head) return null;

    let current = this.head;
    let i = 0;

    while (i < idx) {
      current = current.next!;
      i++;
    }

    current.value = value;
    current.next!.prev = current;
    current.prev!.next = current;

    return this;
  }

  // 맨 앞 제거 - O(1)
  removeFirst(): T | null {
    if (!this.head) return null;

    const deletedValue = this.head.value;

    if (this.head.next) {
      this.head.next.prev = null;
      this.head = this.head.next;
    } else this.head = undefined;

    this.length--;

    return deletedValue;
  }

  // 맨 뒤 제거 - O(1)
  removeLast(): T | null {
    if (!this.tail) return null;

    const deletedValue = this.tail.value;

    if (this.tail.prev) {
      this.tail.prev.next = null;
      this.tail = this.tail.prev;
    } else this.tail = undefined;

    this.length--;

    return deletedValue;
  }

  // 인덱스가 있다면 특정 인덱스의 요소 제거, 없다면 첫번째 요소 제거 - O(n)
  remove(idx?: number): T | null {
    if (!idx) return this.removeFirst();
    if (idx === this.size() - 1) return this.removeLast();
    if (idx < 0 || idx >= this.size() || !this.head) return null;

    let current = this.head;
    let i = 0;

    while (i < idx) {
      current = current.next!;
      i++;
    }

    current.prev!.next = current.next;
    current.next!.prev = current.prev;

    this.length--;

    return current.value;
  }

  // 리스트 초기화 - O(1)
  clear(): void {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
  }

  // 리스트의 값들을 배열로 반환 - O(n);
  toArray(): T[] {
    return [...this];
  }

  // 배열의 값들의 리스트에 추가 - O(k)
  fromArray(arr: T[]): this {
    for (let elem of arr) {
      this.add(elem);
    }

    return this;
  }

  // generator 함수 - for of 사용 가능
  *iterator(): IterableIterator<T> {
    if (!this.head) return;

    let current = this.head;

    while (current) {
      yield current.value;
      current = current.next!;
    }
  }

  // iterable로 만들기 위한 작업
  [Symbol.iterator]() {
    return this.iterator();
  }
}

export default DoublyLinkedList;
