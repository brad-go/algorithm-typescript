// import PriorityQueue from '../PriorityQueue';
import PriorityQueue from '../PriorityQueue';

describe('PriorityQueue', () => {
  describe('Inspection', () => {
    it('should create default priority queue', () => {
      const priorityQueue = new PriorityQueue();

      expect(priorityQueue).toBeDefined();
      expect(priorityQueue.size()).toBe(0);
      expect(priorityQueue.isEmpty()).toBeTruthy();
    });
  });

  describe('Insertion', () => {
    it('should insert items to the queue and respect priorities', () => {
      const priorityQueue = new PriorityQueue();

      priorityQueue.enqueue(10, 1);
      expect(priorityQueue.peek()).toBe(10);

      priorityQueue.enqueue(5, 2);
      expect(priorityQueue.peek()).toBe(10);

      priorityQueue.enqueue(100);
      expect(priorityQueue.peek()).toBe(100);
    });

    it('should be possible to use objects in priority queue', () => {
      const priorityQueue = new PriorityQueue();

      const user1 = { name: 'Mike' };
      const user2 = { name: 'Bill' };
      const user3 = { name: 'Jane' };

      priorityQueue.enqueue(user1, 1);
      expect(priorityQueue.peek()).toBe(user1);

      priorityQueue.enqueue(user2, 2);
      expect(priorityQueue.peek()).toBe(user1);

      priorityQueue.enqueue(user3, 0);
      expect(priorityQueue.peek()).toBe(user3);
    });
  });

  describe('Deletion', () => {
    let priorityQueue: PriorityQueue<number>;

    beforeEach(() => {
      priorityQueue = new PriorityQueue();

      priorityQueue.enqueue(10, 1);
      priorityQueue.enqueue(5, 2);
      priorityQueue.enqueue(100, 0);
      priorityQueue.enqueue(200, 0);
    });

    it('should poll form queue with respect to priorities', () => {
      expect(priorityQueue.dequeue()).toBe(100);
      expect(priorityQueue.dequeue()).toBe(200);
      expect(priorityQueue.dequeue()).toBe(10);
      expect(priorityQueue.dequeue()).toBe(5);
    });

    it('should possible to clear the queue', () => {
      priorityQueue.clear();
      expect(priorityQueue.isEmpty()).toBeTruthy();
    });
  });

  describe('Searching', () => {
    let priorityQueue: PriorityQueue<number>;

    beforeEach(() => {
      priorityQueue = new PriorityQueue();

      priorityQueue.enqueue(10, 1);
      priorityQueue.enqueue(5, 2);
      priorityQueue.enqueue(100, 0);
      priorityQueue.enqueue(200, 0);
      priorityQueue.enqueue(15, 15);
    });

    it('should be possible to serach in priority queue by value', () => {
      expect(priorityQueue.contains(70)).toBeFalsy();
      expect(priorityQueue.contains(15)).toBeTruthy();
    });

    it('should be possible to find index in priority queue by value', () => {
      expect(priorityQueue.findIndex(10)).toBe(2);
      expect(priorityQueue.findIndex(15)).toBe(4);
    });
  });

  describe('Change Priority', () => {
    let priorityQueue: PriorityQueue<number>;

    beforeEach(() => {
      priorityQueue = new PriorityQueue();

      priorityQueue.enqueue(10, 1);
      priorityQueue.enqueue(5, 2);
      priorityQueue.enqueue(100, 0);
      priorityQueue.enqueue(200, 0);
    });

    it('should be possible to change priority of head node', () => {
      expect(priorityQueue.peek()).toBe(100);

      priorityQueue.changePriority(100, 10);
      priorityQueue.changePriority(10, 20);

      expect(priorityQueue.dequeue()).toBe(200);
      expect(priorityQueue.dequeue()).toBe(5);
      expect(priorityQueue.dequeue()).toBe(100);
      expect(priorityQueue.dequeue()).toBe(10);
    });

    it('should be possible to change priority of internal nodes', () => {
      expect(priorityQueue.peek()).toBe(100);

      priorityQueue.changePriority(200, 10);
      priorityQueue.changePriority(10, 20);

      priorityQueue.enqueue(15, 15);

      expect(priorityQueue.dequeue()).toBe(100);
      expect(priorityQueue.dequeue()).toBe(5);
      expect(priorityQueue.dequeue()).toBe(200);
      expect(priorityQueue.dequeue()).toBe(15);
      expect(priorityQueue.dequeue()).toBe(10);
    });
  });

  describe('Conversion', () => {
    let priorityQueue: PriorityQueue<number>;

    beforeEach(() => {
      priorityQueue = new PriorityQueue();

      priorityQueue.enqueue(10, 1);
      priorityQueue.enqueue(5, 2);
      priorityQueue.enqueue(100, 0);
      priorityQueue.enqueue(200, 0);
      priorityQueue.enqueue(15, 15);
    });

    describe('Array', () => {
      it('should possible to be converted to an array', () => {
        expect(priorityQueue.toArray()).toEqual([100, 200, 10, 5, 15]);
      });

      it('should return empty array when the queue is empty', () => {
        priorityQueue.clear();
        expect(priorityQueue.toArray()).toEqual([]);
      });
    });

    describe('String', () => {
      it('should be possible to be converted to a string', () => {
        expect(priorityQueue.toString()).toBe('100,200,10,5,15');
      });

      it('should return empty string when the queue is empty', () => {
        priorityQueue.clear();
        expect(priorityQueue.toString()).toBe('');
      });
    });
  });

  describe('Iterator', () => {
    let priorityQueue: PriorityQueue<number>;

    beforeEach(() => {
      priorityQueue = new PriorityQueue();
    });

    it('should be iterable', () => {
      priorityQueue.enqueue(10, 1);
      priorityQueue.enqueue(5, 2);
      priorityQueue.enqueue(100, 0);
      priorityQueue.enqueue(200, 0);
      priorityQueue.enqueue(15, 15);

      const expectedArray = [100, 200, 10, 5, 15];

      let i = 0;
      for (let n of priorityQueue) {
        expect(n).toBe(expectedArray[i]);
        i++;
      }
    });

    it('should not be iterate over an empty queue', () => {
      let count = 0;

      for (let n of priorityQueue) {
        count++;
      }

      expect(count).toBe(0);
    });
  });
});
