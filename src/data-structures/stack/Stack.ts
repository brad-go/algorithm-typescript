import LinkedList from '../linked-list';

class Stack<T> {
  private list: LinkedList<T> = new LinkedList();

  // 스택의 길이 반환 - O(1)
  size(): number {
    return this.list.size();
  }

  // 스택이 비었다면 true, 아니라면 false 반환 - O(1)
  isEmpty(): boolean {
    return !this.list.size();
  }

  // 스택에 들은 모든 요소 제거 - O(1)
  clear(): void {
    this.list.clear();
  }

  // 스택의 요소 집어넣기 - O(1)
  push(value: T): void {
    this.list.add(value);
  }

  // 스택에서 요소 꺼내기 - O(1)
  pop(): T | null {
    if (this.isEmpty()) return null;
    return this.list.removeLast();
  }

  // 스택의 맨 위의 요소 가져오기 - O(1)
  peek(): T | null {
    if (this.isEmpty()) return null;
    return this.list.peekLast();
  }

  // 해당 값이 스택에 존재하는지 확인하기 - O(n)
  contains(value: T): boolean {
    return this.list.contains(value);
  }

  // 스택을 배열로 전환하기
  toArray() {
    return this.list.toArray();
  }

  // iterable로 만들기
  [Symbol.iterator](): Iterator<T> {
    return this.list.iterator();
  }
}

export default Stack;
