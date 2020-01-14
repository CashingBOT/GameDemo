"use strict";
cc._RF.push(module, 'e3f263IHDRE8p73/9hkHecS', 'PlayerBulletsEmitter1');
// scripts/PlayerBulletsEmitter1.js

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
        offset: 0
    },

    ctor: function ctor() {
        this._emitSeq = 0;
        this._keyDown = false;
        this.emit = false;
    },


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        cc.director.getCollisionManager().enabled = true;
    },
    onEnable: function onEnable() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onDisable: function onDisable() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    emitOff: function emitOff() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    emitOn: function emitOn() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    update: function update(dt) {
        //console.log(this._emitSeq);
        if (this._emitSeq > 0.2) {
            this._emitSeq = 0;
            if (this.emit) {
                this.emitter();
            }
        }
        this._emitSeq = this._emitSeq + dt;
    },


    emitter: function emitter() {
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.x += this.offset;
        bullet.y = this.node.y + 30;
        bullet.parent = this.node.parent;
        var distance = cc.winSize.height - bullet.y - 100;
        var duration = distance / this.speed;
        var moveBy = cc.moveBy(duration, cc.v2(0, distance));
        var reMoveSelf = cc.removeSelf();
        var sequence = cc.sequence(moveBy, reMoveSelf);
        bullet.runAction(sequence);
    },

    onKeyDown: function onKeyDown(event) {
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
    },
    onKeyUp: function onKeyUp(event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.j:
                this.emit = false;
                this._keyDown = false;
                break;
        }
    }
});

cc._RF.pop();