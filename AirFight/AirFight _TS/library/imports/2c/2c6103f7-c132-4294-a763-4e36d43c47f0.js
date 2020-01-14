"use strict";
cc._RF.push(module, '2c610P3wTJClKdjTjbUPEfw', 'PlayerBulletsEmitter');
// scripts/PlayerBulletsEmitter.ts

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
var PlayerBulletsEmitter = /** @class */ (function (_super) {
    __extends(PlayerBulletsEmitter, _super);
    function PlayerBulletsEmitter() {
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
    PlayerBulletsEmitter.prototype.start = function () {
        cc.director.getCollisionManager().enabled = true;
    };
    PlayerBulletsEmitter.prototype.onEnable = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // TODO
        cc.systemEvent.on(cc.Event.EventMouse.EventMouse.BUTTON_RIGHT);
    };
    PlayerBulletsEmitter.prototype.onDisable = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    PlayerBulletsEmitter.prototype.emitOff = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    PlayerBulletsEmitter.prototype.emitOn = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    PlayerBulletsEmitter.prototype.update = function (dt) {
        //console.log(this._emitSeq);
        if (this._emitSeq > 0.2) {
            this._emitSeq = 0;
            if (this.emit) {
                this.emitter();
            }
        }
        this._emitSeq = this._emitSeq + dt;
    };
    PlayerBulletsEmitter.prototype.emitter = function () {
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
    PlayerBulletsEmitter.prototype.onKeyDown = function (event) {
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
    PlayerBulletsEmitter.prototype.onKeyUp = function (event) {
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
    ], PlayerBulletsEmitter.prototype, "prefab", void 0);
    __decorate([
        property()
    ], PlayerBulletsEmitter.prototype, "speed", void 0);
    __decorate([
        property()
    ], PlayerBulletsEmitter.prototype, "offset", void 0);
    PlayerBulletsEmitter = __decorate([
        ccclass
    ], PlayerBulletsEmitter);
    return PlayerBulletsEmitter;
}(cc.Component));
exports.default = PlayerBulletsEmitter;

cc._RF.pop();