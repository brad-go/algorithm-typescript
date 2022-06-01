import TreeNode from './TreeNode';
import Stack from '../../stack';
import Comparator, { CompareFunction } from '../../../utils';

class BinarySearchTree<T> {
  private _root: TreeNode<T> | null = null;
  private treeSize: number = 0;
  private compare: Comparator<T>;

  constructor(compareFunction?: CompareFunction<T>) {
    this.compare = new Comparator(compareFunction);
  }

  get root(): TreeNode<T> | null {
    return this._root;
  }

  set root(node: TreeNode<T> | null) {
    this._root = node;
  }

  size(): number {
    return this.treeSize;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  height(): number {
    return this.heightHelper(this.root);
  }

  // O(n) - 트리 안에 있는 모든 노드를 재귀한다.
  private heightHelper(node: TreeNode<T> | null): number {
    if (node === null) return 0;

    return (
      Math.max(this.heightHelper(node.left), this.heightHelper(node.right)) + 1
    );
  }

  // O(h) - 트리에 새로운 노드를 삽입한다.
  insert(value: T) {
    if (this.root === null) this.root = new TreeNode(value);
    else this.insertNode(this.root, value);

    this.treeSize++;
  }

  // 트리를 따라 아래로 내려가며 자리를 찾는다.
  private insertNode(node: TreeNode<T>, value: T) {
    if (this.compare.lessThan(value, node.value)) {
      if (node.left === null) node.left = new TreeNode(value);
      else this.insertNode(node.left, value);
    } else {
      if (node.right === null) node.right = new TreeNode(value);
      else this.insertNode(node.right, value);
    }
  }

  // O(h) - 트리를 따라 아래로 내려가며 추적하므로
  contains(value: T): boolean {
    return !!this.find(value);
  }

  // O(h) - 트리를 따라 아래로 내려가며 추적하므로
  find(value: T): TreeNode<T> | null {
    let cur = this.root;

    while (cur !== null && cur.value !== value) {
      if (this.compare.lessThan(value, cur.value)) cur = cur.left;
      else cur = cur.right;
    }

    return cur;
  }

  // O(h) - 트리를 따라 아래로 내려가며 추적하므로
  // 기본적으로 최상위 노드에서부터 최소 노드를 찾거나 지정된 루트안의 하위 트리 중 최소 노드를 찾는다.
  findMin(node?: TreeNode<T> | null): TreeNode<T> | null {
    let cur = node || this.root;

    while (cur && cur.left !== null) cur = cur.left;

    return cur;
  }

  // O(h) - 트리를 따라 아래로 내려가며 추적하므로
  // 기본적으로 최상위 노드에서부터 최대 노드를 찾거나 지정된 루트안의 하위 트리 중 최대 노드를 찾는다.
  findMax(node?: TreeNode<T> | null): TreeNode<T> | null {
    let cur = node || this.root;

    while (cur && cur.right !== null) cur = cur.right;

    return cur;
  }

  // O(h) - 트리를 따라 아래로 내려가며 추적하므로
  // sucessor: 중위 순회 기준 바로 다음에 오는 노드
  findSucessor(node: TreeNode<T> | null): TreeNode<T> | null {
    // 오른쪽 자식이 존재한다면, successor는 대상 노드의 오른쪽 서브트리 중 최소 값
    const rightChildExists = node?.right !== null;
    if (rightChildExists) return this.findMin(node?.right);

    // 오른쪽 자식이 존재하지 않는다면, successor는 현재 노드의 조상 중 최소값이며 왼쪽 자식도 현재 노드의 조상이다.
    let cur = node;
    let parent = node.parent;

    // 현재 노드(cur)에서 트리 위쪽으로 이동하여 부모의 왼쪽 자식 노드를 찾는다.
    // 노드가 부모의 오른쪽 자식인 경우 이것은 즉, 이진 트리의 successor쪽으로 넘어가지 않았음을 뜻한다.
    while (parent !== null && cur === parent.right) {
      cur = parent;
      parent = parent.parent;
    }

    return parent;
  }

  // O(h) - 트리를 따라 아래로 내려가며 추적하므로
  // predecessor: 중위 순회 기준 바로 이전의 노드
  findPredecessor(node: TreeNode<T> | null): TreeNode<T> | null {
    //왼쪽 자식이 존재한다면, predecessor는 대상 노드 왼쪽의 서브트리 중 최대 값
    const leftChildExists = node?.left !== null;
    if (leftChildExists) return this.findMax(node?.left);

    // 왼쪽 자식이 존재하지 않는다면, predecessor는 현재 노드의 조상 중 최소값이며 오른쪽 자식도 현재 노드의 조상이다.
    let cur = node;
    let parent = node.parent;

    // 현재 노드(cur)에서 트리 위쪽으로 이동하여 부모의 오른쪽 자식 노드를 찾는다.
    // 노드가 부모의 왼쪽 자식인 경우 이것은 즉, 이진 트리의 predecessor쪽으로 넘어가지 않았음을 뜻한다.
    while (parent !== null && cur === parent.left) {
      cur = parent;
      parent = parent.parent;
    }

    return parent;
  }

  // O(h) - 최악의 경우 노드의 sucessor를 찾아야 하기 때문에
  // 이것은 findMin()이 O(h)시간이 걸린다는 뜻이다.
  remove(value: T): TreeNode<T> | null {
    const node = this.find(value);

    if (!node) throw new Error('Item not found in the tree');

    // 1. 단말 노드라면, 단순히 현재 노드의 부모 노드의 포인터를 수정하고 삭제할 수 있다.
    // 2. 노드가 한 자식 노드가 있다면, 해당 노드를 삭제할 노드의 위치로 이동시키고 삭제할 수 있다.
    // 3. 노드가 두 자식 노드가 있다면, BST의 특성을 유지하기 위해 노드의 sucessor를 찾아 대체하고 삭제할 수 있다.

    if (node.left === null) {
      // 노드가 오른쪽 자식만 있다면, 노드의 오른쪽 자식으로 대체하거나 null이 된다.
      this.transplant(node, node.right);
    } else if (node.right === null) {
      // 노드가 왼쪽 자식만 있다면, 왼쪽 자식 노드로 대체
      this.transplant(node, node.left);
    } else {
      // 두 자식 노드를 가지고 있다면
      const sucessor = this.findSucessor(node)!; // O(h)

      if (node.right === sucessor) {
        // 만약 노드의 sucessor가 노드의 오른쪽 자식이라면, sucessor와 현재 노드를 교체한다.

        this.transplant(node, sucessor);

        // 노드의 왼쪽 서브 트리와 sucessor를 연결한다.
        sucessor.left = node.left;
        sucessor.left.parent = sucessor;
      } else {
        // 반면에 sucessor는 오른쪽 하위 트리 내에 있지만, 노드이 오른쪽 자식이 아니다.
        // 그러므로 sucessor를 오른쪽 자식 노드로 교체한 다음 노드를 sucessor의 위치로 바꾼다.
        // 참고: 여기서는 sucessor가 null일 수 없다. 노드에 두 개의 자식 노드가 있으므로 successor는 필히 존재한다.

        // 노드와 sucessor를 교체하기 전에, sucessor와 sucessor의 오른쪽 서브 트리를 교체한다.
        this.transplant(sucessor, sucessor.right);

        // 노드의 오른쪽 서브트리를 successor에 연결한다.
        sucessor.right = node.right;
        sucessor.right.parent = sucessor;

        this.transplant(node, sucessor);

        // 노드의 왼쪽 서브트리를 successor에 연결한다.
        sucessor.left = node.left;
        sucessor.left.parent = sucessor;
      }
    }

    this.treeSize--;

    return node;
  }

  // 위치를 바꾸고 싶은 노드의 하위 트리를 대체할 노드의 하위 트리로 바꾼다.
  // 이제 위치를 바꿀 노드의 부모는 대체할 노드의 부모가 된다.
  // 이 함수는 대체할 노드의 왼쪽, 오른쪽 자식의 값을 변경하지 않는다.
  private transplant(
    nodeToReplace: TreeNode<T>,
    replacementNode: TreeNode<T> | null,
  ): void {
    if (nodeToReplace.parent === null) {
      this.root = replacementNode;
    } else if (nodeToReplace === nodeToReplace.parent.left) {
      nodeToReplace.parent.left = replacementNode;
    } else {
      nodeToReplace.parent.right = replacementNode;
    }

    if (replacementNode) replacementNode.parent = nodeToReplace.parent;
  }

  inorderTraversal(): IterableIterator<T> {
    return this.inorderIterator();
  }

  private *inorderIterator(): IterableIterator<T> {
    let node = this.root;
    const stack = new Stack<TreeNode<T>>();

    while (stack) {
      while (node !== null) {
        stack.push(node);
        node = node.left;
      }

      if (stack.isEmpty()) return null;

      node = stack.pop()!;

      const value = node.value;
      node = node.right;

      yield value;
    }
  }

  preorderTraversal(): IterableIterator<T> {
    return this.preorderIterator();
  }

  private *preorderIterator(): IterableIterator<T> {
    let node = this.root;
    const stack = new Stack<TreeNode<T>>();

    if (node !== null) stack.push(node);

    while (stack) {
      if (stack.isEmpty()) return null;

      node = stack.pop()!;

      const value = node.value;

      if (node.right !== null) stack.push(node.right);
      if (node.left !== null) stack.push(node.left);

      yield value;
    }
  }

  postorderTraversal(): IterableIterator<T> {
    return this.postorderIterator();
  }

  private *postorderIterator(): IterableIterator<T> {
    let node = this.root;

    const stack1 = new Stack<TreeNode<T>>();
    const stack2 = new Stack<TreeNode<T>>();

    if (node !== null) stack1.push(node);

    while (!stack1.isEmpty()) {
      node = stack1.pop()!;
      stack2.push(node);

      if (node.left !== null) stack1.push(node.left);
      if (node.right !== null) stack1.push(node.right);
    }

    while (stack2) {
      if (stack2.isEmpty()) return null;

      const { value } = stack2.pop()!;
      yield value;
    }
  }

  toArray(callback: IterableIterator<T>) {
    const traverse = [];

    for (const a of callback) {
      traverse.push(a);
    }

    return traverse;
  }
}

export default BinarySearchTree;
