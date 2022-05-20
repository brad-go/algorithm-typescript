import Queue from '../Queue';

describe('Queue', () => {
  it('should create empty queue', () => {
    const queue = new Queue();

    expect(queue).not.toBeNull();
    expect(queue.size()).toBe(0);
    expect(queue.isEmpty()).toBeTruthy();

    queue.enqueue(1);
    expect(queue.isEmpty()).toBeFalsy();
  });

  it('should enqueue data to queue', () => {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.toArray()).toEqual([1, 2]);
  });

  it('should peek data from queue', () => {
    const queue = new Queue();

    expect(queue.peekFront()).toBeNull();
    expect(queue.peekBack()).toBeNull();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.peekFront()).toBe(1);
    expect(queue.peekBack()).toBe(2);
  });

  it('should finds out if queue contains data', () => {
    const queue = new Queue();
    expect(queue.contains(1)).toBeFalsy();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.contains(1)).toBeTruthy();
    expect(queue.contains(2)).toBeTruthy();
    expect(queue.contains(3)).toBeFalsy();
  });

  it('should dequeue data from queue', () => {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBeNull();
    expect(queue.isEmpty()).toBeTruthy();
  });

  it('should clear the queue', () => {
    const queue = new Queue();

    queue.enqueue(1);
    queue.enqueue(2);
    queue.clear();

    expect(queue.isEmpty()).toBeTruthy();
  });

  it('should be iterable', () => {
    const queue = new Queue();
    const nums = [1, 2, 3];

    for (const n of nums) {
      queue.enqueue(n);
    }

    let i = 0;
    for (const n of queue) {
      expect(n).toBe(nums[i]);
      i++;
    }
  });

  it('should be possitble to enqueue/dequeue objects', () => {
    interface TestObj {
      [key: string]: string;
    }

    const queue = new Queue<TestObj>();

    queue.enqueue({ value: 'test1', key: 'key1' });
    queue.enqueue({ value: 'test2', key: 'key2' });

    const stringifier = (value: TestObj) => `${value.key}:${value.value}`;

    expect(queue.toArray().map((value) => stringifier(value))).toEqual([
      'key1:test1',
      'key2:test2',
    ]);
    expect(queue.dequeue()!.value).toBe('test1');
    expect(queue.dequeue()!.value).toBe('test2');
  });
});
