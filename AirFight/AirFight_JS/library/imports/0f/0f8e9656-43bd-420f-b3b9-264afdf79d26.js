"use strict";
cc._RF.push(module, '0f8e9ZWQ71CD7O5Jkr9950m', 'EnemyBulletsEmitter');
// scripts/EnemyBulletsEmitter.js

"use strict";

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
        offset: 0
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.schedule(this.emitter, this.rate);
    },


    //start() {},

    // update(dt){}

    emitter: function emitter() {
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.y = this.node.y - 20;
        bullet.x = this.node.x + 1;
        bullet.x += this.offset;
        bullet.parent = this.node.parent;
        var distance = cc.winSize.height + this.node.y;
        var duration = distance / this.speed;
        var moveBy = cc.moveBy(duration, cc.v2(0, -distance));
        var reMoveSelf = cc.removeSelf();
        var sequence = cc.sequence(moveBy, reMoveSelf);
        bullet.runAction(sequence);
    }
});

cc._RF.pop();