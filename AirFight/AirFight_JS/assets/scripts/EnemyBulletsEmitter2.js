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
        prefab: cc.Prefab,
        speed: 1000,
        rate: 1,
        offset: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.schedule(this.emitter, this.rate);      
    },

    //start() {},

    // update(dt){}

    emitter1: function () {
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.y = this.node.y - 50;
        bullet.x = this.node.x + 1;
        bullet.x += this.offset;
        bullet.parent = this.node.parent;
        let distance = (cc.winSize.height + this.node.y);
        let duration = distance / this.speed;
        let moveBy = cc.moveBy(duration, cc.v2(0, -distance));
        let reMoveSelf = cc.removeSelf();
        let sequence = cc.sequence(moveBy, reMoveSelf);
        bullet.runAction(sequence);
    },

    emitter2: function () {
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.y = this.node.y - 50;
        bullet.x = this.node.x + 1;
        bullet.x += this.offset;
        bullet.parent = this.node.parent;
        let distance = (cc.winSize.height + this.node.y);
        let duration = distance / this.speed;
        let moveBy = cc.moveBy(duration, cc.v2(50, -distance));
        let reMoveSelf = cc.removeSelf();
        let sequence = cc.sequence(moveBy, reMoveSelf);
        bullet.runAction(sequence);
    },

    emitter3: function () {
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.y = this.node.y - 50;
        bullet.x = this.node.x + 1;
        bullet.x += this.offset;
        bullet.parent = this.node.parent;
        let distance = (cc.winSize.height + this.node.y);
        let duration = distance / this.speed;
        let moveBy = cc.moveBy(duration, cc.v2(-50, -distance));
        let reMoveSelf = cc.removeSelf();
        let sequence = cc.sequence(moveBy, reMoveSelf);
        bullet.runAction(sequence);
    },

    emitter: function () {
        this.emitter1()
        this.emitter2()
        this.emitter3()
    },
})
