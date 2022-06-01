import BinarySearchTree from '../BinarySearchTree';
import TreeNode from '../TreeNode';

describe('Binary Search Tree', () => {
  it('should create binary search tree', () => {
    const tree = new BinarySearchTree();

    expect(tree).toBeDefined();
    expect(tree.root).toBeNull();
    expect(tree.isEmpty()).toBeTruthy();
    expect(tree.size()).toBe(0);
    expect(tree.height()).toBe(0);
  });

  describe('Insertion', () => {
    it('should insert values', () => {
      const tree = new BinarySearchTree();

      tree.insert(10);
      expect(tree.size()).toBe(1);

      tree.insert(20);
      expect(tree.size()).toBe(2);

      tree.insert(5);
      expect(tree.size()).toBe(3);

      expect(tree.height()).toBe(2);
      expect(tree.toArray(tree.inorderTraversal())).toEqual([5, 10, 20]);
    });

    it('should insert object values', () => {
      interface TestObj {
        key?: string;
        value: number;
        toString?: () => string;
      }

      const nodeValueCompareFunction = (a: TestObj, b: TestObj) => {
        const normalizedA = a || { value: null };
        const normalizedB = b || { value: null };

        if (normalizedA.value === normalizedB.value) return 0;

        return normalizedA.value < normalizedB.value ? -1 : 1;
      };

      const obj1 = { key: 'obj1', value: 1, toString: () => 'obj1' };
      const obj2 = { key: 'obj2', value: 2, toString: () => 'obj2' };
      const obj3 = { key: 'obj3', value: 3, toString: () => 'obj3' };

      const tree = new BinarySearchTree<TestObj>(nodeValueCompareFunction);

      tree.insert(obj2);
      tree.insert(obj1);
      tree.insert(obj3);

      expect(tree.toArray(tree.inorderTraversal())).toEqual([obj1, obj2, obj3]);
    });
  });

  describe('Searching', () => {
    const tree = new BinarySearchTree<number>();

    const a = new TreeNode(5, null);
    const b = new TreeNode(4, a);
    const c = new TreeNode(3, b);
    const d = new TreeNode(2, c);
    const e = new TreeNode(1, d);

    const f = new TreeNode(6, a);
    const g = new TreeNode(7, f);
    const h = new TreeNode(8, g);

    a.left = b;
    b.left = c;
    c.left = d;
    d.left = e;

    a.right = f;
    f.right = g;
    g.right = h;

    tree.root = a;

    it('should check if value exists', () => {
      expect(tree.contains(2)).toBeTruthy();
      expect(tree.contains(8)).toBeTruthy();
      expect(tree.contains(10)).toBeFalsy();
      expect(tree.contains(0)).toBeFalsy();
    });

    it('should find node with value', () => {
      expect(tree.find(5)).toBe(a);
      expect(tree.find(4)).toBe(b);
      expect(tree.find(3)).toBe(c);
      expect(tree.find(2)).toBe(d);
      expect(tree.find(1)).toBe(e);
      expect(tree.find(6)).toBe(f);
      expect(tree.find(7)).toBe(g);
      expect(tree.find(8)).toBe(h);
    });

    it('should find min node', () => {
      expect(tree.findMin()).toBe(e);
    });

    it('should find min node at subtree', () => {
      expect(tree.findMin(f)).toBe(f);
    });

    it('should find max node', () => {
      expect(tree.findMax()).toBe(h);
    });

    it('should find max node at subtree', () => {
      expect(tree.findMax(f)).toBe(h);
    });

    it('should find successor of node', () => {
      const i = new TreeNode(0);
      const j = new TreeNode(11);

      h.left = i;
      h.right = j;

      expect(tree.findSucessor(j)).toBe(null);
      expect(tree.findSucessor(a)).toBe(f);
      expect(tree.findSucessor(e)).toBe(d);
      expect(tree.findSucessor(f)).toBe(g);
    });

    it('should find predecessor of node', () => {
      expect(tree.findPredecessor(a)).toBe(b);
      expect(tree.findPredecessor(e)).toBe(null);
      expect(tree.findPredecessor(f)).toBe(a);
    });
  });

  describe('Deletion', () => {
    it('should remove leaf nodes', () => {
      const tree = new BinarySearchTree();

      tree.insert(10);
      tree.insert(20);
      tree.insert(5);

      expect(tree.toArray(tree.inorderTraversal())).toEqual([5, 10, 20]);

      const removed1 = tree.remove(5);
      expect(tree.toArray(tree.inorderTraversal())).toEqual([10, 20]);
      // expect(removed1?.value).toBe(5);

      const removed2 = tree.remove(20);
      expect(tree.toArray(tree.inorderTraversal())).toEqual([10]);
      // expect(removed2?.value).toBe(20);
    });

    it('should remove nodes with one child', () => {
      const tree = new BinarySearchTree();

      tree.insert(10);
      tree.insert(20);
      tree.insert(5);
      tree.insert(30);

      expect(tree.toArray(tree.inorderTraversal())).toEqual([5, 10, 20, 30]);

      tree.remove(20);
      expect(tree.toArray(tree.inorderTraversal())).toEqual([5, 10, 30]);

      tree.insert(1);
      expect(tree.toArray(tree.inorderTraversal())).toEqual([1, 5, 10, 30]);

      tree.remove(5);
      expect(tree.toArray(tree.inorderTraversal())).toEqual([1, 10, 30]);
    });

    it('should remove nodes with two children', () => {
      const tree = new BinarySearchTree();

      tree.insert(10);
      tree.insert(20);
      tree.insert(5);
      tree.insert(30);
      tree.insert(15);
      tree.insert(25);

      expect(tree.toArray(tree.inorderTraversal())).toEqual([
        5, 10, 15, 20, 25, 30,
      ]);
      expect(tree.find(20)?.left?.value).toBe(15);
      expect(tree.find(20)?.right?.value).toBe(30);

      tree.remove(20);
      expect(tree.toArray(tree.inorderTraversal())).toEqual([
        5, 10, 15, 25, 30,
      ]);

      tree.remove(15);
      expect(tree.toArray(tree.inorderTraversal())).toEqual([5, 10, 25, 30]);

      tree.remove(10);
      expect(tree.toArray(tree.inorderTraversal())).toEqual([5, 25, 30]);

      tree.remove(25);
      expect(tree.toArray(tree.inorderTraversal())).toEqual([5, 30]);

      tree.remove(5);
      expect(tree.toArray(tree.inorderTraversal())).toEqual([30]);
    });

    it('should throw Error when try to remove with no value in tree', () => {
      const tree = new BinarySearchTree();

      tree.insert(10);
      tree.insert(20);
      tree.insert(5);
      tree.insert(30);

      try {
        tree.remove(40);
      } catch (e) {
        expect(e).toEqual(new Error('Item not found in the tree'));
      }
    });
  });

  describe('Traversals', () => {
    const tree = new BinarySearchTree<number>();

    tree.insert(10);
    tree.insert(5);
    tree.insert(15);
    tree.insert(2);
    tree.insert(1);
    tree.insert(12);
    tree.insert(21);

    it('it should be possible to traverse in order', () => {
      const inorderNumbers = [1, 2, 5, 10, 12, 15, 21];
      let i = 0;

      for (const n of tree.inorderTraversal()) {
        expect(n).toBe(inorderNumbers[i]);
        i++;
      }
    });

    it('it should be possible to traverse pre order', () => {
      const preorderNumbers = [10, 5, 2, 1, 15, 12, 21];
      let i = 0;

      for (const n of tree.preorderTraversal()) {
        expect(n).toBe(preorderNumbers[i]);
        i++;
      }
    });

    it('it should be possible to traverse post order', () => {
      const postorderNumber = [1, 2, 5, 12, 21, 15, 10];
      let i = 0;

      for (const n of tree.postorderTraversal()) {
        expect(n).toBe(postorderNumber[i]);
        i++;
      }
    });
  });
});
