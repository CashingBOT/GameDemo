(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/EnemyBulletsEmitter2.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '95b79E/0vtHJLWp0NZSL3F/', 'EnemyBulletsEmitter2', __filename);
// scripts/EnemyBulletsEmitter2.js

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

    emitter1: function emitter1() {
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.y = this.node.y - 50;
        bullet.x = this.node.x + 1;
        bullet.x += this.offset;
        bullet.parent = this.node.parent;
        var distance = cc.winSize.height + this.node.y;
        var duration = distance / this.speed;
        var moveBy = cc.moveBy(duration, cc.v2(0, -distance));
        var reMoveSelf = cc.removeSelf();
        var sequence = cc.sequence(moveBy, reMoveSelf);
        bullet.runAction(sequence);
    },

    emitter2: function emitter2() {
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.y = this.node.y - 50;
        bullet.x = this.node.x + 1;
        bullet.x += this.offset;
        bullet.parent = this.node.parent;
        var distance = cc.winSize.height + this.node.y;
        var duration = distance / this.speed;
        var moveBy = cc.moveBy(duration, cc.v2(50, -distance));
        var reMoveSelf = cc.removeSelf();
        var sequence = cc.sequence(moveBy, reMoveSelf);
        bullet.runAction(sequence);
    },

    emitter3: function emitter3() {
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.y = this.node.y - 50;
        bullet.x = this.node.x + 1;
        bullet.x += this.offset;
        bullet.parent = this.node.parent;
        var distance = cc.winSize.height + this.node.y;
        var duration = distance / this.speed;
        var moveBy = cc.moveBy(duration, cc.v2(-50, -distance));
        var reMoveSelf = cc.removeSelf();
        var sequence = cc.sequence(moveBy, reMoveSelf);
        bullet.runAction(sequence);
    },

    emitter: function emitter() {
        this.emitter1();
        this.emitter2();
        this.emitter3();
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=EnemyBulletsEmitter2.js.map
        