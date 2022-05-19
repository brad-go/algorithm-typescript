class DoublyLinkedListNode<T> {
  value: T;
  next: DoublyLinkedListNode<T> | null;
  prev: DoublyLinkedListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export default DoublyLinkedListNode;
