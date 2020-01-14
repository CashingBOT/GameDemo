(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Enemy1.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '30a151/38VHB5F+scL2f9ML', 'Enemy1', __filename);
// scripts/Enemy1.ts

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
var Enemy1 = /** @class */ (function (_super) {
    __extends(Enemy1, _super);
    function Enemy1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 100;
        _this.life = 3;
        _this.isDead = false;
        _this.active = false;
        _this.type = 1;
        return _this;
    }
    // onLoad() {}
    Enemy1.prototype.unuse = function () {
        this.node.stopAllActions();
        this.active = false;
    };
    // LIFE-CYCLE CALLBACKS:
    Enemy1.prototype.reuse = function () {
        var _this = this;
        this.active = true;
        this.life = 3;
        this.isDead = false;
        cc.loader.loadRes('飞机2a', cc.SpriteFrame, function (err, res) {
            if (err) {
                console.log('error');
                return;
            }
            _this.getComponent(cc.Sprite).spriteFrame = res;
        });
    };
    // start() {}
    Enemy1.prototype.update = function (dt) {
        if (this.life <= 0 && !this.isDead) {
            this.dead();
        }
    };
    Enemy1.prototype.dead = function (noEvent) {
        var _this = this;
        if (!this.isDead) {
            this.explode(function () {
                if (!noEvent) {
                    var event = new cc.Event.EventCustom('enemyDestory', true);
                    event.setUserData(_this);
                    _this.node.dispatchEvent(event);
                }
            });
            this.node.parent.getComponent('Game').gainScoreEnemy1();
            this.isDead = true;
        }
    };
    Enemy1.prototype.explode = function (fun) {
        var _this = this;
        var urls = ['飞机2a爆炸1', '飞机2a爆炸2', '飞机2a爆炸3', '飞机2a爆炸4'];
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
    Enemy1.prototype.emitter = function () {
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
        var seq = cc.sequence(moveBy, callBack);
        enemy.runAction(seq);
    };
    Enemy1.prototype.onCollisionStay = function (other, self) {
        this.life--;
        if (other.node.name == "PlayerBullets") {
            other.node.active = false;
        }
        //console.log('on collision enter');
        //console.log('Enemy1Life: ' + this.life);
    };
    __decorate([
        property()
    ], Enemy1.prototype, "speed", void 0);
    __decorate([
        property()
    ], Enemy1.prototype, "life", void 0);
    Enemy1 = __decorate([
        ccclass
    ], Enemy1);
    return Enemy1;
}(cc.Component));
exports.default = Enemy1;

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
        //# sourceMappingURL=Enemy1.js.map
        