// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        speed: 100,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.emitter();
    },

    // update (dt) {},

    emitter: function () {
        var bombItem = this.node;
        bombItem.position = this.node.position;
        bombItem.y = this.node.y;
        bombItem.parent = this.node.parent;
        let distance = (cc.winSize.height + this.node.y);
        let duration = distance / this.speed;
        let moveBy = cc.moveBy(duration, cc.v2(0, -distance));
        let reMoveSelf = cc.removeSelf();
        let sequence = cc.sequence(moveBy, reMoveSelf);
        bombItem.runAction(sequence);
    },
});
