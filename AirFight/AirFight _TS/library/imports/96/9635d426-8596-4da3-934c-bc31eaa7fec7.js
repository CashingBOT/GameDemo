"use strict";
cc._RF.push(module, '9635dQmhZZNo5NMvDHqp/7H', 'Enemy2');
// scripts/Enemy2.ts

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
var Enemy2 = /** @class */ (function (_super) {
    __extends(Enemy2, _super);
    function Enemy2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 100;
        _this.life = 18;
        _this.isDead = false;
        _this.type = 2;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Enemy2.prototype.start = function () {
        // this.emitter();
    };
    Enemy2.prototype.unuse = function () {
        this.node.stopAllActions();
    };
    Enemy2.prototype.reuse = function () {
        var _this = this;
        this.life = 18;
        this.isDead = false;
        cc.loader.loadRes('飞机3a', cc.SpriteFrame, function (err, res) {
            if (err) {
                console.log('error');
                return;
            }
            _this.getComponent(cc.Sprite).spriteFrame = res;
        });
    };
    Enemy2.prototype.update = function (dt) {
        if (this.life <= 0) {
            this.dead();
        }
        if (this.node.position.y <= 250) {
            this.node.getComponent('EnemyBulletsEmitter2').enabled = true;
            this.node.parent.getComponent('Spawn').stopped();
        }
    };
    Enemy2.prototype.dead = function (noEvent) {
        var _this = this;
        if (!this.isDead) {
            this.explode(function () {
                if (!noEvent) {
                    var event = new cc.Event.EventCustom('enemyDestory', true);
                    event.setUserData(_this);
                    _this.node.dispatchEvent(event);
                }
            });
            this.node.parent.getComponent('Game').gainScoreEnemy2();
            this.isDead = true;
        }
    };
    Enemy2.prototype.explode = function (fun) {
        var _this = this;
        var urls = ['飞机3a爆炸1', '飞机3a爆炸2', '飞机3a爆炸3', '飞机3a爆炸4', '飞机3a爆炸5'];
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
            }), cc.delayTime(0.075), cc.callFunc(function () {
                _this.getComponent(cc.Sprite).spriteFrame = res[4];
            }), cc.delayTime(0), cc.callFunc(function () {
                fun();
            })));
        });
    };
    Enemy2.prototype.emitter = function () {
        var _this = this;
        var enemy = this.node;
        enemy.position = this.node.position;
        enemy.y = this.node.y;
        enemy.parent = this.node.parent;
        var distance = (cc.winSize.height + this.node.y);
        var duration = distance / this.speed;
        var moveTo = cc.moveTo(duration, cc.v2(0, 250));
        var callBack = cc.callFunc(function () {
            var event = new cc.Event.EventCustom('enemyDestory', true);
            event.setUserData(_this);
            _this.node.dispatchEvent(event);
        }, this);
        // let sequence = cc.sequence(moveBy, reMoveSelf);
        // let seq = cc.sequence(moveTo, callBack)
        enemy.runAction(moveTo);
    };
    Enemy2.prototype.onCollisionStay = function (other, self) {
        this.life--;
        if (other.node.name == "PlayerBullets") {
            other.node.active = false;
        }
        //console.log('on collision enter');
        //console.log('Enemy1Life: ' + this.life);
    };
    __decorate([
        property()
    ], Enemy2.prototype, "speed", void 0);
    __decorate([
        property()
    ], Enemy2.prototype, "life", void 0);
    Enemy2 = __decorate([
        ccclass
    ], Enemy2);
    return Enemy2;
}(cc.Component));
exports.default = Enemy2;

cc._RF.pop();