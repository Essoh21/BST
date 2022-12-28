import Node from "./Node.js";

class Tree {
    constructor(array) {
        this.array = this.removeDuplicatesAndSort(array);
        this.root = this.buildTree(this.array);
    }

    buildTree(array) {
        let middle = Math.floor((array.length - 1) / 2);
        if (array.length === 0) {
            return null;
        }

        const root = new Node(array[middle]);
        root.left = this.buildTree(array.slice(0, middle));
        root.right = this.buildTree(array.slice(middle + 1));
        return root;
    }

    insert(value, root = this.root) {
        if (root == null) {
            root = new Node(value);
            return root;
        }

        if (value < root.data) {
            root.left = this.insert(value, root.left)
        } else if (value > root.data) {
            root.right = this.insert(value, root.right);
        }
        return root;
    }

    remove(value, root = this.root) {
        if (root == null) {
            return root;
        }

        if (value < root.data) {
            root.left = this.remove(value, root.left);
        } else if (value > root.data) {
            root.right = this.remove(value, root.right);
        } else {
            if (root.left == null) {
                return root.right
            }

            if (root.right == null) {
                return root.left;
            }

            root.data = this.minValue(root.right);
            root.right = this.remove(root.data, root.right);
        }

        return root;

    }

    find(value, root = this.root) {
        if (root.data == value) {
            return root;
        }

        if (value < root.data) {
            return this.find(value, root.left);
        }

        return this.find(value, root.right);
    }

    levelOrder(callBack = null, root = this.root) {
        let Queue = [];
        let breadFirstValues = [];
        if (root == null) return;

        Queue.push(root);
        while (Queue.length > 0) {
            let currentNode = Queue.shift();
            callBack == null ? breadFirstValues.push(currentNode.data) : callBack(currentNode.data);
            if (!(currentNode.left == null)) Queue.push(currentNode.left);
            if (!(currentNode.right == null)) Queue.push(currentNode.right);
        }

        if (breadFirstValues.length > 0) return breadFirstValues;
    }

    inorder(callBack = null, root = this.root, outputArray = []) {
        if (root == null) return;

        this.inorder(callBack, root.left, outputArray);
        callBack == null ? outputArray.push(root.data) : callBack(root.data);
        this.inorder(callBack, root.right, outputArray);
        if (outputArray.length > 0) return outputArray;

    }

    preorder(callBack = null, root = this.root, outputArray = []) {
        if (root == null) return;
        callBack == null ? outputArray.push(root.data) : callBack(root.data);
        this.preorder(callBack, root.left, outputArray);
        this.preorder(callBack, root.right, outputArray);
        if (outputArray.length > 0) return outputArray;

    }


    postorder(callBack = null, root = this.root, outputArray = []) {
        if (root == null) return;
        this.postorder(callBack, root.left, outputArray);
        this.postorder(callBack, root.right, outputArray);
        callBack == null ? outputArray.push(root.data) : callBack(root.data);
        if (outputArray.length > 0) return outputArray;
    }

    height(givenNode) {
        if (givenNode == null) return 0;
        let left = this.height(givenNode.left);
        let right = this.height(givenNode.right);
        return Math.max(left, right) + 1;
    }

    depth(givenNode, root = this.root, count = 0) {
        if (givenNode == null || root == null) return;
        if (givenNode == root) return count;
        if (givenNode.data < root.data) {
            return (this.depth(givenNode, root.left, count += 1));
        }
        return this.depth(givenNode, root.right, count += 1);
    }

    isbalanced(tree = this.root) {
        if (tree == null) return true;
        let leftHeight = this.height(tree.left);
        let rightHeight = this.height(tree.right);
        if ((Math.abs(leftHeight - rightHeight) <= 1)
            && this.isbalanced(tree.left) == true
            && (this.isbalanced(tree.right) == true)) {
            return true;
        }

        return false;
    }

    rebalance(tree) {
        let treeNodesValues = this.inorder(null, tree);
        return this.buildTree(this.removeDuplicatesAndSort(treeNodesValues));
    }


    minValue(root = this.root) {
        let minimumValue = root.data;
        while (root.left != null) {
            minimumValue = root.left.data;
            root = root.left;
        }
        return minimumValue;
    }

    maxValue(root = this.root) {
        let maximumVal = root.data;
        while (root.right != null) {
            maximumVal = root.right.data;
            root = root.right;
        }
        return maximumVal;
    }
    removeDuplicatesAndSort(arrayObj) {
        return [...(new Set(arrayObj))].sort((a, b) => a - b);
    }
}

// const myTree = new Tree([1, 2, 3, 5, 83, 70, 6, 12, 15, 15, 85, 5]);


// const prettyPrint = (node, prefix = '', isLeft = true) => {
//     if (node.right !== null) {
//         prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
//     }
//     console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
//     if (node.left !== null) {
//         prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
//     }
// }
// prettyPrint(myTree.root);
// const myNode = myTree.find(70);
