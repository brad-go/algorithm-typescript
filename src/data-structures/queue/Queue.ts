import LinkedList from '../linked-list';

class Queue<T> {
  private list: LinkedList<T> = new LinkedList();

  // 큐의 길이 반환 - O(1)
  size(): number {
    return this.list.size();
  }

  // 큐가 비었다면 true, 아니라면 false 반환 - O(1)
  isEmpty(): boolean {
    return !this.list.size();
  }

  // 큐에 들은 모든 요소 제거 - O(1)
  clear(): void {
    this.list.clear();
  }

  // 큐의 요소 집어넣기 - O(1)
  enqueue(value: T): void {
    this.list.add(value);
  }

  // 큐에서 요소 꺼내기 - O(1)
  dequeue(): T | null {
    if (this.isEmpty()) return null;
    return this.list.removeFirst();
  }

  // 큐의 맨 앞의 요소 가져오기 - O(1)
  peekFront(): T | null {
    if (this.isEmpty()) return null;
    return this.list.peekFirst();
  }

  // 큐의 맨 뒤의 요소 가져오기 - O(1)
  peekBack(): T | null {
    if (this.isEmpty()) return null;
    return this.list.peekLast();
  }

  // 해당 값이 큐에 존재하는지 확인하기 - O(n)
  contains(value: T): boolean {
    return this.list.contains(value);
  }

  // 큐를 배열로 전환하기
  toArray() {
    return this.list.toArray();
  }

  // iterable로 만들기
  [Symbol.iterator](): Iterator<T> {
    return this.list.iterator();
  }
}

export default Queue;
