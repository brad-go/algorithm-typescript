import Stack from '../Stack';

describe('Stack', () => {
  it('should create empty stack', () => {
    const stack = new Stack();

    expect(stack).not.toBeNull();
    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).toBeTruthy();

    stack.push(1);
    expect(stack.isEmpty()).toBeFalsy();
  });

  it('shoud stack data to stack', () => {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);

    expect(stack.toArray()).toEqual([1, 2]);
  });

  it('should peek data from stack', () => {
    const stack = new Stack();
    expect(stack.peek()).toBeNull();

    stack.push(1);
    stack.push(2);

    expect(stack.peek()).toBe(2);
    expect(stack.peek()).toBe(2);
  });

  it('should finds out if list contains data', () => {
    const stack = new Stack();
    expect(stack.contains(1)).toBeFalsy();

    stack.push(1);
    stack.push(2);

    expect(stack.contains(1)).toBeTruthy();
    expect(stack.contains(2)).toBeTruthy();
    expect(stack.contains(3)).toBeFalsy();
  });

  it('should pop data from stack', () => {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);

    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
    expect(stack.pop()).toBeNull();
    expect(stack.isEmpty()).toBeTruthy();
  });

  it('should clear the stack', () => {
    const stack = new Stack();

    stack.push(1);
    stack.push(2);
    stack.push(3);
    stack.clear();

    expect(stack.isEmpty()).toBeTruthy();
  });

  it('shoude be itreable', () => {
    const stack = new Stack();
    const nums = [1, 2, 3];

    for (const n of nums) {
      stack.push(n);
    }

    let i = 0;
    for (const n of stack) {
      expect(n).toBe(nums[i]);
      i++;
    }
  });

  it('should be possible to push/pop objects', () => {
    interface TestObj {
      [key: string]: string;
    }

    const stack = new Stack<TestObj>();

    stack.push({ value: 'test1', key: 'key1' });
    stack.push({ value: 'test2', key: 'key2' });

    const stringifier = (value: TestObj) => `${value.key}:${value.value}`;

    expect(stack.toArray().map((value) => stringifier(value))).toEqual([
      'key1:test1',
      'key2:test2',
    ]);
    expect(stack.pop()!.value).toBe('test2');
    expect(stack.pop()!.value).toBe('test1');
  });
});
