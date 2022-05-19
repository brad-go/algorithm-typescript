import DoublyLinkedListNode from '../DoublyLinkedListNode';

describe('DoublyLinkedListNode', () => {
  it('should create list node with value', () => {
    const node = new DoublyLinkedListNode(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
    expect(node.prev).toBeNull();
  });

  it('should create list node with object as a value', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new DoublyLinkedListNode(nodeValue);

    expect(node.value.value).toBe(1);
    expect(node.value.key).toBe('test');
    expect(node.next).toBeNull();
    expect(node.prev).toBeNull();
  });

  it('should link nodes together', () => {
    const node2 = new DoublyLinkedListNode(2);
    const node1 = new DoublyLinkedListNode(1);
    const node3 = new DoublyLinkedListNode(3);

    node1.next = node2;
    node3.next = node1;
    node3.prev = node2;

    expect(node1.next).toBeDefined();
    expect(node1.prev).toBeNull();
    expect(node2.next).toBeNull();
    expect(node2.prev).toBeNull();
    expect(node3.prev).toBeDefined();
    expect(node3.prev).toBeDefined();
    expect(node1.value).toBe(1);
    expect(node1.next.value).toBe(2);
    expect(node3.next.value).toBe(1);
    expect(node3.prev.value).toBe(2);
  });

  it('should convert node to string with custom stringifier', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new DoublyLinkedListNode(nodeValue);
    const toStringCallback = (value: { value: number; key: string }) =>
      `value: ${value.value}, key: ${value.key}`;

    expect(toStringCallback(node.value)).toBe('value: 1, key: test');
  });
});
