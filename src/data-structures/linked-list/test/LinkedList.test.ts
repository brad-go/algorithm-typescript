import LinkedList from '../LinkedList';

describe('LinkedList', () => {
  describe('should create empty linked list', () => {
    const linkedList = new LinkedList();

    it('isEmpty function returns true on empty lists', () => {
      expect(linkedList.isEmpty()).toBeTruthy();
    });

    it('peek function return null on empty lists', () => {
      expect(linkedList.peekFirst()).toBeNull();
      expect(linkedList.peekLast()).toBeNull();
    });

    it('remove function returns null on empty lists', () => {
      expect(linkedList.removeFirst()).toBeNull();
      expect(linkedList.removeLast()).toBeNull();
      expect(linkedList.remove(3)).toBeNull();
      expect(linkedList.remove(-1)).toBeNull();
    });

    it('get function returns null on empty lists', () => {
      expect(linkedList.get(1)).toBeNull();
    });

    it('returns empty array when replacing empty list with array', () => {
      expect(linkedList.toArray()).toEqual([]);
    });
  });

  describe('add node to linked list', () => {
    it('should append node to linked list', () => {
      const linkedList = new LinkedList();

      linkedList.add(1);
      linkedList.add(2);

      expect(linkedList.toArray()).toEqual([1, 2]);
      expect(linkedList.size()).toBe(2);
    });

    it('should prepend node to linked list', () => {
      const linkedList = new LinkedList();

      linkedList.addFirst(2);
      expect(linkedList.get(0)).toBe(2);

      linkedList.add(1);
      linkedList.addFirst(3);

      expect(linkedList.toArray()).toEqual([3, 2, 1]);
      expect(linkedList.size()).toBe(3);

      linkedList.add(0, 0);

      expect(linkedList.toArray()).toEqual([0, 3, 2, 1]);
    });

    it('should insert node to linked list', () => {
      const linkedList = new LinkedList();

      linkedList.add(4, 3);
      expect(linkedList.get(0)).toBeNull();

      linkedList.add(1);
      linkedList.add(2);
      linkedList.add(10);
      linkedList.add(4, 1);
      linkedList.add(3, 3);

      expect(linkedList.toArray()).toEqual([1, 4, 2, 3, 10]);
      expect(linkedList.size()).toBe(5);
    });
  });

  describe('find node', () => {
    const linkedList = new LinkedList();

    it('should return -1 on empty lists', () => {
      expect(linkedList.indexOf(3)).toBe(-1);
    });

    describe('find node on lists with value', () => {
      beforeEach(() => {
        linkedList.add(1);
        linkedList.add(2);
        linkedList.add(3);
      });

      afterEach(() => {
        linkedList.clear();
      });

      it('should get nodes on lists with index', () => {
        expect(linkedList.get(0)).toBe(1);
        expect(linkedList.get(1)).toBe(2);
        expect(linkedList.get(2)).toBe(3);
      });

      it('should get index of nodes', () => {
        expect(linkedList.indexOf(1)).toBe(0);
        expect(linkedList.indexOf(2)).toBe(1);
        expect(linkedList.indexOf(3)).toBe(2);
        expect(linkedList.indexOf(4)).toBe(-1);
      });

      it('should finds out if list contians node', () => {
        expect(linkedList.contains(1)).toBeTruthy();
        expect(linkedList.contains(3)).toBeTruthy();
        expect(linkedList.contains(8)).toBeFalsy();
      });

      it('should peek head of the lists', () => {
        expect(linkedList.peekFirst()).toBe(1);

        linkedList.addFirst(4);
        expect(linkedList.peekFirst()).toBe(4);
      });

      it('should peek tail of the lists', () => {
        expect(linkedList.peekLast()).toBe(3);

        linkedList.addLast(4);
        expect(linkedList.peekLast()).toBe(4);
      });
    });

    describe('should find node by means of custom comapare function', () => {
      interface Custom {
        value: number;
        customValue: string;
      }
      const linkedList2: LinkedList<Custom> = new LinkedList();

      const comparatorFunction = (a: Custom, b: Custom): boolean => {
        return a.customValue === b.customValue;
      };

      const a = { value: 1, customValue: 'test1' };
      const b = { value: 2, customValue: 'test2' };
      const c = { value: 3, customValue: 'test3' };

      linkedList2.add(a);
      linkedList2.add(b);
      linkedList2.add(c);

      expect(linkedList2.contains(a, comparatorFunction)).toBeTruthy();
    });
  });

  describe('set value of node from specific index of lists', () => {
    const linkedList = new LinkedList();

    beforeEach(() => {
      linkedList.add(1);
      linkedList.add(2);
      linkedList.add(3);
      linkedList.add(4);
      linkedList.add(5);
    });

    afterEach(() => {
      linkedList.clear();
    });

    it('should set value of node from head of lists', () => {
      linkedList.set(10, 0);
      expect(linkedList.toArray()).toEqual([10, 2, 3, 4, 5]);
    });

    it('should set value of node from tail of lists', () => {
      linkedList.set(10, 4);
      expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 10]);
    });

    it('should set value of node from specific index of lists', () => {
      linkedList.set(10, 3);
      expect(linkedList.toArray()).toEqual([1, 2, 3, 10, 5]);
    });

    it('should return null to set a value from out of bounds of lists', () => {
      expect(linkedList.set(10, -1)).toBeNull();
      expect(linkedList.toArray()).toEqual([1, 2, 3, 4, 5]);
    });
  });

  describe('remove node by index from linked list', () => {
    const linkedList: LinkedList<number> = new LinkedList();

    it('should returns null on empty lists', () => {
      expect(linkedList.remove(3)).toBeNull();
      expect(linkedList.removeFirst()).toBeNull();
      expect(linkedList.removeLast()).toBeNull();
    });

    describe('removes on lists with values', () => {
      beforeEach(() => {
        linkedList.add(1);
        linkedList.add(2);
        linkedList.add(3);
        linkedList.add(4);
        linkedList.add(5);
      });

      afterEach(() => {
        linkedList.clear();
      });

      it('should removes from head ot the lists without index', () => {
        const deletedNodeValue = linkedList.remove();
        expect(deletedNodeValue).toBe(1);
      });

      it('should removes from head of the lists', () => {
        const deletedNodeValue = linkedList.removeFirst();
        expect(deletedNodeValue).toBe(1);
        expect(linkedList.toArray()).toEqual([2, 3, 4, 5]);
      });

      it('should removes from tail of the lists', () => {
        const deletedNodeValue = linkedList.removeLast();
        expect(deletedNodeValue).toBe(5);
        expect(linkedList.toArray()).toEqual([1, 2, 3, 4]);
      });

      it('should removes from specific index of the lists', () => {
        const deletedNodeValue = linkedList.remove(2);
        expect(deletedNodeValue).toBe(3);
        expect(linkedList.get(2)).toBe(4);
      });

      it('should removes from tail ot the lists with index that size -1', () => {
        const deletedNodeValue = linkedList.remove(4);
        expect(deletedNodeValue).toBe(5);
      });

      it('should removes from out of bounds index of the lists', () => {
        expect(linkedList.remove(-1)).toBeNull();
        expect(linkedList.remove(5)).toBeNull();
      });

      it('removes all nodes step by step', () => {
        const value = linkedList.removeFirst();
        expect(value).toBe(1);
        expect(linkedList.size()).toBe(4);

        const value2 = linkedList.removeFirst();
        expect(value2).toBe(2);
        expect(linkedList.size()).toBe(3);

        const value3 = linkedList.removeFirst();
        expect(value3).toBe(3);
        expect(linkedList.size()).toBe(2);

        const value4 = linkedList.removeFirst();
        expect(value4).toBe(4);
        expect(linkedList.size()).toBe(1);

        const value5 = linkedList.removeFirst();
        expect(value5).toBe(5);
        expect(linkedList.size()).toBe(0);
      });
    });
  });

  describe('others', () => {
    const linkedList = new LinkedList();

    it('should creates linked list from array', () => {
      const array = [1, 2, 3];
      linkedList.fromArray(array);
      expect(Array.from(linkedList)).toEqual([1, 2, 3]);
    });

    it('should be iterable', () => {
      const array = [1, 2, 3];

      let i = 0;
      for (const n of linkedList) {
        expect(n).toBe(array[i]);
        i++;
      }
    });
  });
});
