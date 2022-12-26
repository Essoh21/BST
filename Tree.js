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

    removeDuplicatesAndSort(arrayObj) {
        return [...(new Set(arrayObj))].sort((a, b) => a - b);
    }
}

const myTree = new Tree([1, 2, 3, 5, 6, 12, 15, 15, 85, 5]);

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}
prettyPrint(myTree.root);