/******************
 * Interface
 * Creator: Resol
 * ************** */

export interface Block {
    w: number,
    h: number,
    fit: any;
    node: cc.Node;
}


export let Packer = function (w, h) {
    this.init(w, h);
};

Packer.prototype = {
    init: function (w, h) {
        this.root = { x: 0, y: 0, w: w, h: h }; // Canvas
    },

    fit: function (blocks) {
        let n,
            node, // Container
            block; // What you want to pack
        for (n = 0; n < blocks.length; n++) {
            block = blocks[n];
            if (node = this.findNode(this.root, block.w, block.h)) {
                block.fit = this.splitNode(node, block.w, block.h);
                // cc.log(block);
            }
        }
    },

    findNode: function (node, w, h) {
        if (node.used)
            return this.findNode(node.right, w, h) || this.findNode(node.down, w, h);
        else if ((w <= node.w) && (h <= node.h))
            return node;
        else
            return null;
    },

    splitNode: function (node, w, h) {
        node.used = true;
        node.down = { x: node.x, y: node.y - h, w: node.w, h: node.h - h };
        node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
        return node;
    }
};