import LinkedListNode from './LinkedListNode';
import Comparator, { CompareFunction } from '../../utils';

class LinkedList<T> {
  private head: LinkedListNode<T> | undefined;
  private tail: LinkedListNode<T> | undefined;
  private length = 0;

  private compare: Comparator<T>;
  constructor(comparatorFunction?: CompareFunction<T>) {
    this.compare = new Comparator(comparatorFunction);
  }

  // 리스트의 길이 반환 - O(1)
  size(): number {
    return this.length;
  }

  // 리스트가 비었다면 true, 아니라면 false
  isEmpty(): boolean {
    return !this.length;
  }

  // 리스트 맨 앞에 노드 추가
  addFirst(value: T): this {
    const newNode = new LinkedListNode(value);

    if (this.head) newNode.next = this.head;
    else this.tail = newNode;

    this.head = newNode;
    this.length++;

    return this;
  }

  // 리스트 맨 뒤에 노드 추가
  addLast(value: T): this {
    const newNode = new LinkedListNode(value);

    if (this.tail) this.tail.next = newNode;
    else this.head = newNode;

    this.tail = newNode;
    this.length++;

    return this;
  }

  // 인덱스가 있다면 해당 위치에 추가, 없다면 맨 뒤에 노드 추가
  add(value: T, idx?: number): this {
    if (idx === undefined || idx === this.size()) return this.addLast(value);
    if (idx < 0 || idx >= this.size() || !this.head) return this;
    if (idx === 0) return this.addFirst(value);

    const newNode = new LinkedListNode(value);
    let current = this.head;

    for (let i = 0; i < idx - 1; i++) {
      current = current.next!;
    }

    newNode.next = current.next;
    current.next = newNode;
    this.length++;

    return this;
  }

  // 인덱스에 해당하는 요소 가져오기
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

  // 맨 앞에 값 가져오기
  peekFirst(): T | null {
    if (!this.head) return null;

    return this.head.value;
  }

  // 맨 뒤의 값 가져오기
  peekLast(): T | null {
    if (!this.tail) return null;

    return this.tail.value;
  }

  // 리스트에 존재하는 특정 값의 인덱스 번호를 반환
  indexOf(value: T): number {
    if (!this.head) return -1;

    let idx = 0;
    let current = this.head;

    while (!this.compare.equal(current.value, value)) {
      if (!current.next) return -1;

      current = current.next!;
      idx++;
    }

    return idx;
  }

  // 리스트에 특정 값이 존재하는지 boolean 값을 반환
  contains(value: T): boolean {
    const idx = this.indexOf(value);

    return idx !== -1;
  }

  // 특정 인덱스의 값을 업데이트
  set(value: T, idx: number): this | null {
    if (idx < 0 || idx >= this.size() || !this.head) return null;

    let current = this.head;
    let i = 0;

    while (i < idx) {
      current = current.next!;
      i++;
    }

    current.value = value;
    return this;
  }

  // 맨 앞 제거
  removeFirst(): T | null {
    if (!this.head) return null;

    const value = this.head.value;

    if (this.head.next) {
      this.head = this.head.next;
    } else this.head = undefined;

    this.length--;
    return value;
  }

  // 맨 뒤 제거
  removeLast(): T | null {
    if (!this.tail) return null;

    const value = this.tail.value;
    let current = this.head!;
    let i = 0;

    while (i < this.length - 2) {
      current = current.next!;
      i++;
    }

    current.next = null;
    this.tail = current;
    this.length--;

    return value;
  }

  // 특정 인덱스의 요소를 제거하거나 맨 뒤의 요소 제거
  remove(idx?: number): T | null {
    if (!idx) return this.removeFirst();
    if (idx < 0 || idx >= this.size() || !this.head) return null;
    if (idx === this.size() - 1) return this.removeLast();

    let deletedNode = null;
    let current = this.head;
    let i = 0;

    while (i < idx - 1) {
      current = current.next!;
      i++;
    }

    deletedNode = current.next!;
    current.next = current.next!.next;
    this.length--;

    return deletedNode.value;
  }

  // 모든 노드 제거
  clear(): this {
    this.head = undefined;
    this.tail = undefined;
    this.length = 0;
    return this;
  }

  // 리스트를 배열로 전환해서 반환
  toArray(): T[] {
    return [...this];
  }

  // 배열을 받아서 그 값들을 리스트에 추가
  fromArray(arr: T[]): this {
    for (const elem of arr) {
      this.add(elem);
    }

    return this;
  }

  *iterator(): IterableIterator<T> {
    if (!this.head) return;

    let current = this.head;

    while (current) {
      yield current.value;
      current = current.next!;
    }
  }

  [Symbol.iterator]() {
    return this.iterator();
  }
}

export default LinkedList;
