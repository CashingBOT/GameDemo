/******************
 * Interface
 * Creator: Resol
 * ************** */

export class BTreeNode {
    root;
    data;
    left;
    right;
    constructor(data) {
        this.root = this;
        this.data = data;
        this.left = null;
        this.right = null;
    }
}