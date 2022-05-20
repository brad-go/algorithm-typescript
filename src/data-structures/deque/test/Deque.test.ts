import Deque from '../Deque';

describe('Deque', () => {
  it('should create empty deque', () => {
    const deque = new Deque();

    expect(deque).not.toBeNull();
    expect(deque.size()).toBe(0);
    expect(deque.isEmpty()).toBeTruthy();

    deque.pushBack(1);
    expect(deque.isEmpty()).toBeFalsy();
  });

  it('should push data to front of deque', () => {
    const deque = new Deque();

    deque.pushFront(1);
    deque.pushFront(2);

    expect(deque.toArray()).toEqual([2, 1]);
  });

  it('should push data to back of deque', () => {
    const deque = new Deque();

    deque.pushBack(1);
    deque.pushBack(2);

    expect(deque.toArray()).toEqual([1, 2]);
  });

  it('should peek data from deque', () => {
    const deque = new Deque();

    expect(deque.peekFront()).toBeNull();
    expect(deque.peekBack()).toBeNull();

    deque.pushBack(1);
    deque.pushBack(2);

    expect(deque.peekFront()).toBe(1);
    expect(deque.peekBack()).toBe(2);
  });

  it('should finds out if deque contains data', () => {
    const deque = new Deque();
    expect(deque.contains(1)).toBeFalsy();

    deque.pushBack(1);
    deque.pushBack(2);

    expect(deque.contains(1)).toBeTruthy();
    expect(deque.contains(2)).toBeTruthy();
    expect(deque.contains(3)).toBeFalsy();
  });

  it('should pop data from front of deque', () => {
    const deque = new Deque();

    deque.pushBack(1);
    deque.pushBack(2);

    expect(deque.popFront()).toBe(1);
    expect(deque.popFront()).toBe(2);
    expect(deque.popFront()).toBeNull();
    expect(deque.isEmpty()).toBeTruthy();
  });

  it('should pop data from back of deque', () => {
    const deque = new Deque();

    deque.pushBack(1);
    deque.pushBack(2);

    expect(deque.popBack()).toBe(2);
    expect(deque.popBack()).toBe(1);
    expect(deque.popBack()).toBeNull();
    expect(deque.isEmpty()).toBeTruthy();
  });

  it('should clear the deque', () => {
    const deque = new Deque();

    deque.pushBack(1);
    deque.pushBack(2);
    deque.clear();

    expect(deque.isEmpty()).toBeTruthy();
  });

  it('should be iterable', () => {
    const deque = new Deque();
    const nums = [1, 2, 3];

    for (const n of nums) {
      deque.pushBack(n);
    }

    let i = 0;
    for (const n of deque) {
      expect(n).toBe(nums[i]);
      i++;
    }
  });

  it('should be possitble to endeque/dedeque objects', () => {
    interface TestObj {
      [key: string]: string;
    }

    const deque = new Deque<TestObj>();

    deque.pushBack({ value: 'test1', key: 'key1' });
    deque.pushBack({ value: 'test2', key: 'key2' });

    const stringifier = (value: TestObj) => `${value.key}:${value.value}`;

    expect(deque.toArray().map((value) => stringifier(value))).toEqual([
      'key1:test1',
      'key2:test2',
    ]);
    expect(deque.popFront()!.value).toBe('test1');
    expect(deque.popFront()!.value).toBe('test2');
  });
});
