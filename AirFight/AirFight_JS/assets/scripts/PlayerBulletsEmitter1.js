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
        offset: 0,
    },

    ctor() {
        this._emitSeq = 0;
        this._keyDown = false;
        this.emit = false;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.director.getCollisionManager().enabled = true;
    },

    onEnable() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    },

    onDisable() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    },

    emitOff(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    },

    emitOn(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    },

    update(dt){
        //console.log(this._emitSeq);
        if (this._emitSeq > 0.2)
        {
            this._emitSeq = 0;
            if(this.emit){
                this.emitter();
            }
        }
        this._emitSeq = this._emitSeq + dt;
    },

    emitter: function(){
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.x += this.offset;
        bullet.y = this.node.y + 30;
        bullet.parent = this.node.parent;
        let distance = cc.winSize.height - bullet.y - 100
        let duration = distance / this.speed;
        let moveBy = cc.moveBy(duration,cc.v2(0,distance));
        let reMoveSelf = cc.removeSelf();
        let sequence = cc.sequence(moveBy,reMoveSelf);
        bullet.runAction(sequence);
    },

    onKeyDown(event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.j:
                this.emit = true;
                if(!this._keyDown) {
                    this._keyDown = true;
                    this._emitSeq = 0;
                    this.emitter();
                }
                break;
        }
    },

    onKeyUp(event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.j:
                this.emit = false;
                this._keyDown = false;
                break;
        }
    },
})
