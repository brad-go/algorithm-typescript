import LinkedList from '../linked-list';

class Deque<T> {
  private list: LinkedList<T> = new LinkedList();

  // 덱의 길이 반환 - O(1)
  size(): number {
    return this.list.size();
  }

  // 덱이 비었다면 true, 아니라면 false 반환 - O(1)
  isEmpty(): boolean {
    return !this.list.size();
  }

  // 덱에 들은 모든 요소 제거 - O(1)
  clear(): void {
    this.list.clear();
  }

  // 덱의 맨 뒤에 요소 집어넣기 - O(1)
  pushFront(value: T): void {
    this.list.addFirst(value);
  }

  // 덱의 맨 뒤에 요소 집어넣기 - O(1)
  pushBack(value: T): void {
    this.list.addLast(value);
  }

  // 덱에서 맨 앞에서 요소 꺼내기 - O(1)
  popFront(): T | null {
    if (this.isEmpty()) return null;
    return this.list.removeFirst();
  }

  // 덱에서 맨 뒤에서 요소 꺼내기 - O(1)
  popBack(): T | null {
    if (this.isEmpty()) return null;
    return this.list.removeLast();
  }

  // 덱의 맨 앞의 요소 가져오기 - O(1)
  peekFront(): T | null {
    if (this.isEmpty()) return null;
    return this.list.peekFirst();
  }

  // 덱의 맨 뒤의 요소 가져오기 - O(1)
  peekBack(): T | null {
    if (this.isEmpty()) return null;
    return this.list.peekLast();
  }

  // 해당 값이 덱에 존재하는지 확인하기 - O(n)
  contains(value: T): boolean {
    return this.list.contains(value);
  }

  // 덱을 배열로 전환하기
  toArray() {
    return this.list.toArray();
  }

  // iterable로 만들기
  [Symbol.iterator](): Iterator<T> {
    return this.list.iterator();
  }
}

export default Deque;
