// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerBulletsEmitter extends cc.Component {

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    @property()
    speed = 1000;

    @property()
    offset = 0;

    private _emitSeq = 0;
    private _keyDown = false;
    private emit = false;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        cc.director.getCollisionManager().enabled = true;
    }

    onEnable() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // TODO
        cc.systemEvent.on(cc.Event.EventMouse.EventMouse.BUTTON_RIGHT,)
    }

    onDisable() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    public emitOff() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    public emitOn() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    update(dt) {
        //console.log(this._emitSeq);
        if (this._emitSeq > 0.2) {
            this._emitSeq = 0;
            if (this.emit) {
                this.emitter();
            }
        }
        this._emitSeq = this._emitSeq + dt;
    }

    public emitter() {
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.x += this.offset;
        bullet.y = this.node.y + 5;
        bullet.parent = this.node.parent;
        let distance = cc.winSize.height - bullet.y - 10
        let duration = (distance / this.speed) / 2;
        let moveBy = cc.moveTo(duration, cc.v2(bullet.x, 490));
        let reMoveSelf = cc.removeSelf();
        let sequence = cc.sequence(moveBy, reMoveSelf, cc.callFunc(() => { bullet.active = false }));
        bullet.runAction(sequence);
    }

    public onKeyDown(event) {
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
    }

    public onKeyUp(event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.j:
                this.emit = false;
                this._keyDown = false;
                break;
        }
    }
}
