import TreeNode from '../TreeNode';

describe('BinarySearchTreeNode', () => {
  it('should create list node with value', () => {
    const node = new TreeNode(1);

    expect(node.value).toBe(1);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
    expect(node.parent).toBeNull();
  });

  it('should set left and right node', () => {
    const rootNode = new TreeNode(2);
    const leftNode = new TreeNode(1);
    const rightNode = new TreeNode(3);

    rootNode.left = leftNode;
    rootNode.right = rightNode;

    expect(rootNode.value).toBe(2);
    expect(rootNode.left.value).toBe(1);
    expect(rootNode.right.value).toBe(3);

    const newLeftNode = new TreeNode(0);
    const newRightNode = new TreeNode(4);

    rootNode.left = newLeftNode;
    rootNode.right = newRightNode;

    expect(rootNode.left.value).toBe(0);
    expect(rootNode.right.value).toBe(4);
  });

  it('should set parent', () => {
    const rootNode = new TreeNode(2);
    const leftNode = new TreeNode(1);
    const rightNode = new TreeNode(3);

    rootNode.left = leftNode;
    rootNode.right = rightNode;

    expect(rootNode.parent).toBeNull();
    expect(rootNode.left.parent?.value).toBe(2);
    expect(rootNode.right.parent?.value).toBe(2);
    expect(rootNode.right.parent).toEqual(rootNode);
  });

  it('should be possible to set node values', () => {
    const node = new TreeNode('initial value');

    expect(node.value).toBe('initial value');

    node.value = 'new value';

    expect(node.value).toBe('new value');
  });

  it('should be possible to set parent of nodes', () => {
    const rootNode = new TreeNode(2);
    const leftNode = new TreeNode(1);
    const rightNode = new TreeNode(3);

    rootNode.parent = null;
    rootNode.left = null;
    rootNode.right = null;
    expect(rootNode.parent).toBeNull();

    leftNode.parent = rootNode;
    rightNode.parent = rootNode;

    expect(rootNode.left).toEqual(leftNode);
    expect(rootNode.right).toEqual(rightNode);
  });
});
