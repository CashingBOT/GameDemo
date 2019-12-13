"use strict";
cc._RF.push(module, '8bf67QU0CpFLrjDRNW/I7Yj', 'Enemy3');
// scripts/Enemy3.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Enemy3 = /** @class */ (function (_super) {
    __extends(Enemy3, _super);
    function Enemy3() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 100;
        _this.life = 9;
        _this.isDead = false;
        _this.type = 3;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Enemy3.prototype.unuse = function () {
        this.node.stopAllActions();
    };
    Enemy3.prototype.reuse = function () {
        var _this = this;
        this.life = 9;
        this.isDead = false;
        cc.loader.loadRes('飞机4a', cc.SpriteFrame, function (err, res) {
            if (err) {
                console.log('error');
                return;
            }
            _this.getComponent(cc.Sprite).spriteFrame = res;
        });
    };
    // start() {}
    Enemy3.prototype.update = function (dt) {
        if (this.life <= 0 && !this.isDead) {
            this.dead();
        }
    };
    Enemy3.prototype.dead = function (noEvent) {
        var _this = this;
        if (!this.isDead) {
            this.explode(function () {
                if (!noEvent) {
                    var event = new cc.Event.EventCustom('enemyDestory', true);
                    event.setUserData(_this);
                    _this.node.dispatchEvent(event);
                }
            });
            this.node.parent.getComponent('Game').gainScoreEnemy3();
            this.isDead = true;
        }
    };
    Enemy3.prototype.explode = function (fun) {
        var _this = this;
        var urls = ['飞机4a爆炸1', '飞机4a爆炸2', '飞机4a爆炸3', '飞机4a爆炸4'];
        cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, res) {
            if (err) {
                console.log('error');
                return;
            }
            _this.node.runAction(cc.sequence(cc.callFunc(function () {
                _this.getComponent(cc.Sprite).spriteFrame = res[0];
            }), cc.delayTime(0.075), cc.callFunc(function () {
                _this.getComponent(cc.Sprite).spriteFrame = res[1];
            }), cc.delayTime(0.075), cc.callFunc(function () {
                _this.getComponent(cc.Sprite).spriteFrame = res[2];
            }), cc.delayTime(0.075), cc.callFunc(function () {
                _this.getComponent(cc.Sprite).spriteFrame = res[3];
            }), cc.delayTime(0), cc.callFunc(function () {
                fun();
            })));
        });
    };
    Enemy3.prototype.emitter = function () {
        var _this = this;
        var enemy = this.node;
        enemy.position = this.node.position;
        enemy.y = this.node.y;
        enemy.parent = this.node.parent;
        var distance = (cc.winSize.height + this.node.y);
        var duration = distance / this.speed;
        var moveBy = cc.moveBy(duration, cc.v2(0, -distance));
        var callBack = cc.callFunc(function () {
            var event = new cc.Event.EventCustom('enemyDestory', true);
            event.setUserData(_this);
            _this.node.dispatchEvent(event);
        }, this);
        // let sequence = cc.sequence(moveBy, reMoveSelf);
        var seq = cc.sequence(moveBy, callBack);
        enemy.runAction(seq);
    };
    Enemy3.prototype.onCollisionStay = function (other, self) {
        this.life--;
        if (other.node.name == "PlayerBullets") {
            other.node.active = false;
        }
        //console.log('on collision enter');
        //console.log('Enemy1Life: ' + this.life);
    };
    __decorate([
        property()
    ], Enemy3.prototype, "speed", void 0);
    __decorate([
        property()
    ], Enemy3.prototype, "life", void 0);
    Enemy3 = __decorate([
        ccclass
    ], Enemy3);
    return Enemy3;
}(cc.Component));
exports.default = Enemy3;

cc._RF.pop();