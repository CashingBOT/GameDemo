"use strict";
cc._RF.push(module, '7016252nxhOp451wwI/1ZvW', 'PlayerBulletsEmitter2');
// scripts/PlayerBulletsEmitter2.ts

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
var PlayerBulletsEmitter2 = /** @class */ (function (_super) {
    __extends(PlayerBulletsEmitter2, _super);
    function PlayerBulletsEmitter2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        _this.speed = 1000;
        _this.offset = 0;
        _this._emitSeq = 0;
        _this._keyDown = false;
        _this.emit = false;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    PlayerBulletsEmitter2.prototype.start = function () {
        cc.director.getCollisionManager().enabled = true;
    };
    PlayerBulletsEmitter2.prototype.onEnable = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    PlayerBulletsEmitter2.prototype.onDisable = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    PlayerBulletsEmitter2.prototype.emitOff = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    PlayerBulletsEmitter2.prototype.emitOn = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    PlayerBulletsEmitter2.prototype.update = function (dt) {
        //console.log(this._emitSeq);
        if (this._emitSeq > 0.2) {
            this._emitSeq = 0;
            if (this.emit) {
                this.emitter();
            }
        }
        this._emitSeq = this._emitSeq + dt;
    };
    PlayerBulletsEmitter2.prototype.emitter = function () {
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.x += this.offset;
        bullet.y = this.node.y + 5;
        bullet.parent = this.node.parent;
        var distance = cc.winSize.height - bullet.y - 10;
        var duration = (distance / this.speed) / 2;
        var moveBy = cc.moveTo(duration, cc.v2(bullet.x, 490));
        var reMoveSelf = cc.removeSelf();
        var sequence = cc.sequence(moveBy, reMoveSelf, cc.callFunc(function () { bullet.active = false; }));
        bullet.runAction(sequence);
    };
    PlayerBulletsEmitter2.prototype.onKeyDown = function (event) {
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
    PlayerBulletsEmitter2.prototype.onKeyUp = function (event) {
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
    ], PlayerBulletsEmitter2.prototype, "prefab", void 0);
    __decorate([
        property()
    ], PlayerBulletsEmitter2.prototype, "speed", void 0);
    __decorate([
        property()
    ], PlayerBulletsEmitter2.prototype, "offset", void 0);
    PlayerBulletsEmitter2 = __decorate([
        ccclass
    ], PlayerBulletsEmitter2);
    return PlayerBulletsEmitter2;
}(cc.Component));
exports.default = PlayerBulletsEmitter2;

cc._RF.pop();