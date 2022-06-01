import Comparator from '../../../utils/Comparator';

class TreeNode<T> {
  private _value: T;
  private _left: TreeNode<T> | null;
  private _right: TreeNode<T> | null;
  private _parent: TreeNode<T> | null;
  private compare: Comparator<T>;

  constructor(value: T, parent?: TreeNode<T> | null) {
    this._value = value;
    this._left = null;
    this._right = null;
    this._parent = parent || null;

    this.compare = new Comparator();
  }

  get value(): T {
    return this._value;
  }

  get left(): TreeNode<T> | null {
    return this._left;
  }

  get right(): TreeNode<T> | null {
    return this._right;
  }

  get parent(): TreeNode<T> | null {
    return this._parent;
  }

  set value(value: T) {
    this._value = value;
  }

  set left(node: TreeNode<T> | null) {
    if (this.left) this.left._parent = null;

    this._left = node;

    if (this.left) this.left._parent = this;
  }

  set right(node: TreeNode<T> | null) {
    if (this.right) this.right._parent = null;

    this._right = node;

    if (this.right) this.right._parent = this;
  }

  set parent(node: TreeNode<T> | null) {
    if (node === null) {
      this._parent = null;
      return;
    }

    if (this.compare.lessThan(this.value, node.value)) {
      node.left = this;
    } else {
      node.right = this;
    }

    this._parent = node;
  }
}

export default TreeNode;
