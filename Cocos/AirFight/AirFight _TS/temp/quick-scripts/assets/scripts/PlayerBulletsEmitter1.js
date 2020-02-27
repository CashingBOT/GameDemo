(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/PlayerBulletsEmitter1.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '98ddfTyAaNAUpMfkAEiiwMp', 'PlayerBulletsEmitter1', __filename);
// scripts/PlayerBulletsEmitter1.ts

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
var PlayerBulletsEmitter1 = /** @class */ (function (_super) {
    __extends(PlayerBulletsEmitter1, _super);
    function PlayerBulletsEmitter1() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        _this.speed = 1000;
        _this.offset = 0;
        _this._emitSeq = 0;
        _this._keyDown = false;
        _this.emit = false;
        _this.bulletList = [];
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    PlayerBulletsEmitter1.prototype.start = function () {
        cc.director.getCollisionManager().enabled = true;
    };
    PlayerBulletsEmitter1.prototype.onEnable = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    PlayerBulletsEmitter1.prototype.onDisable = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    PlayerBulletsEmitter1.prototype.emitOff = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    PlayerBulletsEmitter1.prototype.emitOn = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    PlayerBulletsEmitter1.prototype.update = function (dt) {
        //console.log(this._emitSeq);
        if (this._emitSeq > 0.2) {
            this._emitSeq = 0;
            if (this.emit) {
                this.emitter();
                // for (let index = this.bulletList.length - 1; index >= 0; index--) {
                //     const element = this.bulletList[index];
                //     if (element.position.y >= 300) {
                //         element.active = false
                //         cc.removeSelf()
                //         console.log(element.position.y)
                //         break
                //     }
                // }
            }
        }
        this._emitSeq = this._emitSeq + dt;
    };
    PlayerBulletsEmitter1.prototype.emitter = function () {
        var bullet = cc.instantiate(this.prefab);
        this.bulletList.push(bullet);
        bullet.position = this.node.position;
        bullet.x += this.offset;
        bullet.y = this.node.y + 30;
        bullet.parent = this.node.parent;
        var distance = cc.winSize.height - bullet.y - 10;
        var duration = (distance / this.speed) / 2;
        var moveBy = cc.moveTo(duration, cc.v2(bullet.x, 490));
        var reMoveSelf = cc.removeSelf();
        var sequence = cc.sequence(moveBy, reMoveSelf, cc.callFunc(function () { bullet.active = false; }));
        bullet.runAction(sequence);
    };
    PlayerBulletsEmitter1.prototype.onKeyDown = function (event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.j:
                this.emit = true;
                if (!this._keyDown) {
                    this._keyDown = true;
                    this._emitSeq = 0;
                    this.emitter();
                }
                break;
        }
    };
    PlayerBulletsEmitter1.prototype.onKeyUp = function (event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.j:
                this.emit = false;
                this._keyDown = false;
                break;
        }
    };
    __decorate([
        property(cc.Prefab)
    ], PlayerBulletsEmitter1.prototype, "prefab", void 0);
    __decorate([
        property()
    ], PlayerBulletsEmitter1.prototype, "speed", void 0);
    __decorate([
        property()
    ], PlayerBulletsEmitter1.prototype, "offset", void 0);
    PlayerBulletsEmitter1 = __decorate([
        ccclass
    ], PlayerBulletsEmitter1);
    return PlayerBulletsEmitter1;
}(cc.Component));
exports.default = PlayerBulletsEmitter1;

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
        //# sourceMappingURL=PlayerBulletsEmitter1.js.map
        