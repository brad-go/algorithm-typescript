import DoublyLinkedList from '../DoublyLinkedList';

describe('DoublyLinkedList', () => {
  describe('Empty linked list', () => {
    let linkedList: DoublyLinkedList<number>;

    beforeEach(() => {
      linkedList = new DoublyLinkedList();
    });

    it('should create empty linked list', () => {
      expect(linkedList.isEmpty()).toBeTruthy();
      expect(linkedList.size()).toBe(0);
      expect(linkedList.toArray()).toEqual([]);
    });

    it('should returnss null on empty linked list', () => {
      expect(linkedList.peekFirst()).toBeNull();
      expect(linkedList.peekLast()).toBeNull();
      expect(linkedList.removeFirst()).toBeNull();
      expect(linkedList.removeLast()).toBeNull();
      expect(linkedList.remove()).toBeNull();
      expect(linkedList.remove(3)).toBeNull();
      expect(linkedList.remove(-1)).toBeNull();
      expect(linkedList.get(1)).toBeNull();
    });
  });

  describe('adds on to linked list', () => {
    let linkedList: DoublyLinkedList<number>;

    beforeEach(() => {
      linkedList = new DoublyLinkedList();
    });

    afterEach(() => {
      linkedList.clear();
    });

    it('should append node to linked list', () => {
      linkedList.add(1);
      linkedList.add(2);

      expect(linkedList.toArray()).toEqual([1, 2]);
      expect(linkedList.size()).toBe(2);
    });

    it('should prepend node to linked list', () => {
      linkedList.addFirst(1);
      linkedList.addFirst(2);

      expect(linkedList.toArray()).toEqual([2, 1]);
      expect(linkedList.size()).toBe(2);
    });

    it('should add node at specific index', () => {
      linkedList.add(1, 0);
      expect(linkedList.toArray()).toEqual([1]);
      expect(linkedList.size()).toBe(1);

      linkedList.add(2, 1);
      expect(linkedList.toArray()).toEqual([1, 2]);
      expect(linkedList.size()).toBe(2);

      linkedList.add(3, 1);
      expect(linkedList.toArray()).toEqual([1, 3, 2]);
      expect(linkedList.size()).toBe(3);

      linkedList.add(4, 2);
      expect(linkedList.toArray()).toEqual([1, 3, 4, 2]);
      expect(linkedList.size()).toBe(4);

      linkedList.add(5, 0);
      expect(linkedList.toArray()).toEqual([5, 1, 3, 4, 2]);
      expect(linkedList.size()).toBe(5);
    });

    it('should return null when adding at index out of bounds', () => {
      linkedList.add(1, 0);
      expect(linkedList.add(2, 3)).toBeNull();
    });
  });

  describe('finds in linked list', () => {
    let linkedList: DoublyLinkedList<number>;

    beforeEach(() => {
      linkedList = new DoublyLinkedList();
    });

    afterEach(() => {
      linkedList.clear();
    });

    it('should get value of nodes by index', () => {
      linkedList.add(1);
      linkedList.add(2);
      linkedList.add(3);

      expect(linkedList.get(0)).toBe(1);
      expect(linkedList.get(1)).toBe(2);
      expect(linkedList.get(2)).toBe(3);
    });

    it('should get index of nodes by value', () => {
      expect(linkedList.indexOf(1)).toBe(-1);

      linkedList.add(1);
      linkedList.add(2);
      linkedList.add(3);

      expect(linkedList.indexOf(1)).toBe(0);
      expect(linkedList.indexOf(2)).toBe(1);
      expect(linkedList.indexOf(3)).toBe(2);
      expect(linkedList.indexOf(4)).toBe(-1);
    });

    it('should find out if linked list contains node', () => {
      expect(linkedList.contains(1)).toBeFalsy();

      linkedList.add(1);
      linkedList.add(2);
      linkedList.add(3);

      expect(linkedList.contains(1)).toBeTruthy();
      expect(linkedList.contains(3)).toBeTruthy();
      expect(linkedList.contains(8)).toBeFalsy();
    });

    it('should peeks head of the linked list', () => {
      linkedList.addFirst(1);
      expect(linkedList.peekFirst()).toBe(1);

      linkedList.addFirst(2);
      expect(linkedList.peekFirst()).toBe(2);
    });

    it('should peeks head of the linked list', () => {
      linkedList.addLast(1);
      expect(linkedList.peekLast()).toBe(1);

      linkedList.addLast(2);
      expect(linkedList.peekLast()).toBe(2);
    });
  });

  describe('finds in linked list with custom compare function', () => {
    it('should find node by means of custom compare function', () => {
      interface Custom {
        value: number;
        customValue: string;
      }

      const comparatorFunction = (a: Custom, b: Custom): number => {
        if (a.customValue === b.customValue) return 0;

        return a.customValue < b.customValue ? -1 : 1;
      };

      const linkedList2: DoublyLinkedList<Custom> = new DoublyLinkedList(
        comparatorFunction,
      );

      const a = { value: 1, customValue: 'test1' };
      const b = { value: 2, customValue: 'test2' };
      const c = { value: 3, customValue: 'test3' };

      linkedList2.add(a);
      linkedList2.add(b);
      linkedList2.add(c);

      expect(linkedList2.contains(a)).toBeTruthy();
    });
  });

  describe('updates node value in linked list', () => {
    let linkedList: DoublyLinkedList<number>;

    beforeEach(() => {
      linkedList = new DoublyLinkedList();

      linkedList.add(1);
      linkedList.add(2);
      linkedList.add(3);
    });

    afterEach(() => {
      linkedList.clear();
    });

    it('should update value of node at specific index', () => {
      linkedList.set(10, 1);
      expect(linkedList.toArray()).toEqual([1, 10, 3]);
    });

    it('should return null when setting at index out of bounds', () => {
      expect(linkedList.set(10, 4)).toBeNull();
    });
  });

  describe('removes node from linked list', () => {
    let linkedList: DoublyLinkedList<number>;

    beforeEach(() => {
      linkedList = new DoublyLinkedList();
    });

    afterEach(() => {
      linkedList.clear();
    });

    it('should return null when removing at in index out of bounds', () => {
      expect(linkedList.remove(5)).toBeNull();
    });

    it('should remove from head of linked list', () => {
      linkedList.add(8);
      linkedList.add(3);

      linkedList.removeFirst();
      expect(linkedList.size()).toBe(1);
      expect(linkedList.peekFirst()).toBe(3);
    });

    it('should remove from tail of linked list', () => {
      linkedList.add(8);
      linkedList.add(3);

      linkedList.removeLast();
      expect(linkedList.size()).toBe(1);
      expect(linkedList.peekFirst()).toBe(8);

      linkedList.removeLast();
      expect(linkedList.size()).toBe(0);
    });

    it('should remove node from specific index of linked list', () => {
      linkedList.add(1);
      linkedList.add(2);
      linkedList.add(3);
      linkedList.add(4);
      linkedList.add(5);

      const deletedValue = linkedList.remove(0);
      expect(deletedValue).toBe(1);
      expect(linkedList.size()).toBe(4);
      expect(linkedList.toArray()).toEqual([2, 3, 4, 5]);

      const deletedValue2 = linkedList.remove(3);
      expect(deletedValue2).toBe(5);
      expect(linkedList.size()).toBe(3);
      expect(linkedList.toArray()).toEqual([2, 3, 4]);

      const deletedValue3 = linkedList.remove(1);
      expect(deletedValue3).toBe(3);
      expect(linkedList.size()).toBe(2);
      expect(linkedList.toArray()).toEqual([2, 4]);

      const deletedValue4 = linkedList.remove(1);
      expect(deletedValue4).toBe(4);
      expect(linkedList.size()).toBe(1);
      expect(linkedList.toArray()).toEqual([2]);

      const deletedValue5 = linkedList.remove(0);
      expect(deletedValue5).toBe(2);
      expect(linkedList.size()).toBe(0);
      expect(linkedList.toArray()).toEqual([]);
    });
  });

  describe('array and list', () => {
    let linkedList: DoublyLinkedList<number>;

    beforeEach(() => {
      linkedList = new DoublyLinkedList();
    });

    afterEach(() => {
      linkedList.clear();
    });

    it('should create list from array', () => {
      const array = [1, 2, 3];
      linkedList.fromArray(array);
      expect(Array.from(linkedList)).toEqual([1, 2, 3]);
    });

    it('should create array from list', () => {
      linkedList.add(1);
      linkedList.add(2);
      linkedList.add(3);
      expect(linkedList.toArray()).toEqual([1, 2, 3]);
    });
  });

  describe('iterator', () => {
    let linkedList: DoublyLinkedList<number>;

    beforeEach(() => {
      linkedList = new DoublyLinkedList();
    });

    afterEach(() => {
      linkedList.clear();
    });

    it('should be iterable', () => {
      const array = [1, 2, 3];
      linkedList.fromArray(array);

      let i = 0;
      for (const n of linkedList) {
        expect(n).toBe(array[i]);
        i += 1;
      }
    });

    it('should not be iterate over an empty list', () => {
      let count = 0;

      for (const n of linkedList) {
        count += 1;
      }

      expect(count).toBe(0);
    });
  });
});
