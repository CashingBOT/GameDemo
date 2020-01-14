(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Enemy3.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '22db30R4T5EJqYETgznFETd', 'Enemy3', __filename);
// scripts/Enemy3.js

'use strict';

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
        life: 5
    },

    ctor: function ctor() {
        this.isDead = false;
        this.type = 3;
    },


    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    unuse: function unuse() {
        this.node.stopAllActions();
    },
    reuse: function reuse() {
        var _this = this;

        this.life = 5;
        this.isDead = false;
        cc.loader.loadRes('飞机4a', cc.SpriteFrame, function (err, res) {
            if (err) {
                console.log('error');
                return;
            }
            _this.getComponent(cc.Sprite).spriteFrame = res;
        });
    },
    start: function start() {},
    update: function update(dt) {
        if (this.life <= 0 && !this.isDead) {
            this.dead();
        }
    },
    dead: function dead(noEvent) {
        var _this2 = this;

        if (!this.isDead) {
            this.explode(function () {
                if (!noEvent) {

                    var event = new cc.Event.EventCustom('enemyDestory', true);
                    event.setUserData(_this2);
                    _this2.node.dispatchEvent(event);
                }
            });
            this.node.parent.getComponent('Game').gainScoreEnemy2();
            this.isDead = true;
        }
    },
    explode: function explode(fun) {
        var _this3 = this;

        var urls = ['飞机4a爆炸1', '飞机4a爆炸2', '飞机4a爆炸3', '飞机4a爆炸4'];
        cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, res) {
            if (err) {
                console.log('error');
                return;
            }
            _this3.node.runAction(cc.sequence(cc.callFunc(function () {
                _this3.getComponent(cc.Sprite).spriteFrame = res[0];
            }), cc.delayTime(0.075), cc.callFunc(function () {
                _this3.getComponent(cc.Sprite).spriteFrame = res[1];
            }), cc.delayTime(0.075), cc.callFunc(function () {
                _this3.getComponent(cc.Sprite).spriteFrame = res[2];
            }), cc.delayTime(0.075), cc.callFunc(function () {
                _this3.getComponent(cc.Sprite).spriteFrame = res[3];
            }), cc.delayTime(0), cc.callFunc(function () {
                fun();
            })));
        });
    },


    emitter: function emitter() {
        var _this4 = this;

        var enemy = this.node;
        enemy.position = this.node.position;
        enemy.y = this.node.y;
        enemy.parent = this.node.parent;
        var distance = cc.winSize.height + this.node.y;
        var duration = distance / this.speed;
        var moveBy = cc.moveBy(duration, cc.v2(0, -distance));
        var callBack = cc.callFunc(function () {
            var event = new cc.Event.EventCustom('enemyDestory', true);
            event.setUserData(_this4);
            _this4.node.dispatchEvent(event);
        }, this);
        // let sequence = cc.sequence(moveBy, reMoveSelf);
        var seq = cc.sequence(moveBy, callBack);
        enemy.runAction(seq);
    },

    onCollisionStay: function onCollisionStay(other, self) {
        this.life--;
        if (other.node.name == "PlayerBullets") {
            other.node.active = false;
        }
        //console.log('on collision enter');
        //console.log('Enemy1Life: ' + this.life);
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
        //# sourceMappingURL=Enemy3.js.map
        