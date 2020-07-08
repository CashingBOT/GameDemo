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

    // emitter: function () {
    //     //var bezier1 = [cc.v2(0, 500), cc.v2(-500, 250), cc.v2(500,-250)];
    //     //var bezier2 = [cc.v2(0, 0), cc.v2(500, -250), cc.v2(0, -600)];
    //     var powerItem = this.node;
    //     powerItem.position = this.node.position;
    //     let moveBy1 = cc.bezierTo(10, bezier1);
    //     //let moveBy2 = cc.bezierTo(10, bezier2);
    //     let reMoveSelf = cc.removeSelf();
    //     let sequence = cc.sequence(moveBy1, reMoveSelf);
    //     powerItem.runAction(sequence);
    // },

    emitter: function () {
        var lifeItem = this.node;
        lifeItem.position = this.node.position;
        lifeItem.y = this.node.y;
        lifeItem.parent = this.node.parent;
        let distance = (cc.winSize.height + this.node.y);
        let duration = distance / this.speed;
        let moveBy = cc.moveBy(duration, cc.v2(0, -distance));
        let reMoveSelf = cc.removeSelf();
        let sequence = cc.sequence(moveBy, reMoveSelf);
        lifeItem.runAction(sequence);
    },
});
