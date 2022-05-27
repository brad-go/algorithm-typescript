import MaxHeap from '../MaxHeap';

describe('MaxHeap', () => {
  let heap: MaxHeap<number>;

  beforeEach(() => {
    heap = new MaxHeap();
  });

  it('should create an empty max heap', () => {
    expect(heap).toBeDefined();
    expect(heap.size()).toBe(0);
    expect(heap.peek()).toBeNull();
    expect(heap.isEmpty()).toBeTruthy();
  });

  it('should be possible to create heap with iterable and heapify it', () => {
    const heap = new MaxHeap([8, 3, 10]);
    expect(heap.size()).toBe(3);
    expect(heap.peek()).toBe(10);
    expect(heap.toString()).toBe('10,3,8');

    const heap2 = new MaxHeap([]);
    expect(heap2.size()).toBe(0);
    expect(heap2.peek()).toBeNull();
    expect(heap2.toString()).toBe('');

    const heap3 = new MaxHeap([1, 2, 3, 4, 5]);
    expect(heap3.size()).toBe(5);
    expect(heap3.peek()).toBe(5);
    expect(heap3.toString()).toBe('5,4,3,1,2');
  });

  it('should add items to the heap and heapify it up (swim)', () => {
    heap.add(5);
    expect(heap.isEmpty()).toBeFalsy();
    expect(heap.peek()).toBe(5);
    expect(heap.toString()).toBe('5');

    heap.add(3);
    expect(heap.peek()).toBe(5);
    expect(heap.toString()).toBe('5,3');

    heap.add(10);
    expect(heap.size()).toBe(3);
    expect(heap.peek()).toBe(10);
    expect(heap.toString()).toBe('10,3,5');
  });

  it('should be possible to check that the heap contains element', () => {
    heap.add(5);
    expect(heap.contains(5)).toBeTruthy();
    expect(heap.contains(3)).toBeFalsy();
  });

  it('should poll items from the heap and heapify it down (sink)', () => {
    heap.add(5);
    heap.add(3);
    heap.add(10);

    expect(heap.size()).toBe(3);
    expect(heap.toString()).toBe('10,3,5');

    expect(heap.poll()).toBe(10);
    expect(heap.toString()).toBe('5,3');

    expect(heap.poll()).toBe(5);
    expect(heap.toString()).toBe('3');

    expect(heap.poll()).toBe(3);
    expect(heap.toString()).toBe('');

    expect(heap.poll()).toBeNull();
    expect(heap.size()).toBe(0);
  });

  it('should be possible to remove items from heap with heapify down', () => {
    heap.add(3);
    heap.add(12);
    heap.add(10);
    heap.add(11);
    heap.add(11);

    expect(heap.toString()).toBe('12,11,10,3,11');

    expect(heap.remove(12).toString()).toBe('11,11,10,3');
    expect(heap.remove(11).peek()).toBe(11);
    expect(heap.remove(11).toString()).toBe('10,3');
    expect(heap.remove(10).peek()).toBe(3);
  });

  it('should be possible to remove items from heap with heapify up', () => {
    heap.add(3);
    heap.add(10);
    heap.add(5);
    heap.add(6);
    heap.add(7);
    heap.add(4);
    heap.add(6);
    heap.add(8);
    heap.add(2);
    heap.add(1);

    expect(heap.toString()).toBe('10,8,6,7,6,4,5,3,2,1');
    expect(heap.remove(4).toString()).toBe('10,8,6,7,6,1,5,3,2');
    expect(heap.remove(3).toString()).toBe('10,8,6,7,6,1,5,2');
    expect(heap.remove(5).toString()).toBe('10,8,6,7,6,1,2');
    expect(heap.remove(10).toString()).toBe('8,7,6,2,6,1');
    expect(heap.remove(6).toString()).toBe('8,7,1,2,6');
    expect(heap.remove(2).toString()).toBe('8,7,1,6');
    expect(heap.remove(1).toString()).toBe('8,7,6');
    expect(heap.remove(6).toString()).toBe('8,7');
    expect(heap.remove(7).toString()).toBe('8');
    expect(heap.remove(8).toString()).toBe('');
  });

  it('should throw error if there is no element to remove', () => {
    heap.add(5);
    heap.add(3);
    heap.add(10);

    try {
      heap.remove(4);
    } catch (e) {
      expect(e).toEqual(new Error('No element in heap'));
    }
  });

  it('should be possible to clear the heap', () => {
    heap.add(3);
    heap.add(10);
    heap.add(5);

    heap.clear();

    expect(heap.isEmpty()).toBeTruthy();
  });

  it('should work extensively', () => {
    heap.add(8);
    heap.add(3);
    heap.add(10);

    expect(heap.peek()).toBe(10);
    expect(heap.poll()).toBe(10);

    heap.add(9);
    heap.add(2);
    heap.add(-5);
    heap.add(20);

    expect(heap.poll()).toBe(20);
    expect(heap.poll()).toBe(9);
    expect(heap.poll()).toBe(8);
    expect(heap.poll()).toBe(3);
    expect(heap.poll()).toBe(2);
    expect(heap.poll()).toBe(-5);
  });
});
