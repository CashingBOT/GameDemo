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
        flySpeed: 5,
        life: 3,
        powerTime: 30,

        lifeTag: {
            default: null,
            type: cc.Node
        },

        enemy1: {
            default: null,
            type: cc.Prefab
        },

        enemy2: {
            default: null,
            type: cc.Prefab
        },

        enemy3: {
            default: null,
            type: cc.Prefab
        },
    },

    ctor() {
        this.isDead = false;
        this._emitSeq = 0;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //定义移动开关
        this.accLeft = false;
        this.accRight = false;
        this.accUp = false;
        this.accDown = false;
        this.isStart = false;
        this.powerOn = false;
        this.bomber = false;
        this.touchStart = false;
        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this)
        this.node.off(cc.Node.EventType.TOUCH_START, () => {
            this.touchStart = true
        }, this)
        this.node.off(cc.Node.EventType.TOUCH_END, () => {
            this.touchStart = false
        }, this)
    },

    start() {

    },


    gameStart() {
        this.isStart = true;
    },

    update(dt) {
        if (!this.isStart) { return; }
        if (this.touchStart) {
            if (this._emitSeq > 0.2) {
                this._emitSeq = 0;
                this.node.getComponent('PlayerBulletsEmitter1').emitter()
            }
            this._emitSeq = this._emitSeq + dt;
        }
        //根据要移动的方向更新主角速度
        //左右移动
        let dirc = cc.v2(0, 0)
        let speed = 0
        if (this.accLeft) {
            // this.node.x -= this.flySpeed * dt;
            dirc.x = dirc.x - 1
        }
        if (this.accRight) {
            // this.node.x += this.flySpeed * dt;  
            dirc.x = dirc.x + 1
        }
        //上下移动
        if (this.accDown) {
            // this.node.y -= this.flySpeed * dt;
            dirc.y = dirc.y - 1
        }
        if (this.accUp) {
            // this.node.y += this.flySpeed * dt;
            dirc.y = dirc.y + 1
        }

        if (dirc.x == 0 && dirc.y == 0) { }
        else {
            speed = this.flySpeed / Math.sqrt((dirc.x * dirc.x) + (dirc.y * dirc.y))
        }

        this.node.y += speed * dt * dirc.y
        this.node.x += speed * dt * dirc.x

        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = this.node.parent.width / 2;
            this.speed = 0
        }
        else if (this.node.x < -this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2;
            this.speed = 0
        }

        if (this.node.y > this.node.parent.height / 2) {
            this.node.y = this.node.parent.height / 2;
            this.speed = 0
        }
        else if (this.node.y < -this.node.parent.height / 2) {
            this.node.y = -this.node.parent.height / 2;
            this.speed = 0
        }

        if (this.life == 0 && !this.isDead) {
            this.explode()
            this.isDead = true
        }

        if (this.powerOn) {
            this.powerTime -= 1 * dt;
            if (this.powerTime <= 0) {
                this.powerOn = false;
                this.powerTime = 30;
                this.node.getComponent('PlayerBulletsEmitter1').enabled = true;
                this.node.getComponent('PlayerBulletsEmitter').enabled = false;
                this.node.getComponent('PlayerBulletsEmitter2').enabled = false;
            }
        }
    },

    onKeyDown(event) {
        // set a flag when key pressed
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
            case cc.macro.KEY.w:
                this.accUp = true;
                break;
            case cc.macro.KEY.s:
                this.accDown = true;
                break;
        }
    },

    onKeyUp(event) {
        // unset a flag when key released
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
            case cc.macro.KEY.w:
                this.accUp = false;
                break;
            case cc.macro.KEY.s:
                this.accDown = false;
                break;
            case cc.macro.KEY.k:
                if (this.bomber) {
                    this.node.parent.getChildByName('Bomb').active = false;
                    this.node.parent.getComponent("Spawn").boom();
                    this.bomber = false;
                }
        }
    },

    keyEvent() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    touchEvent() {
        if(!this.isStart){return};
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.touchStart = true;
            this.node.getComponent('PlayerBulletsEmitter1').emitOff();
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }, this)
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.touchStart = false;
            this.node.getComponent('PlayerBulletsEmitter1').emitOn();
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        }, this)
    },

    on_touch_move(t) {
        //定义一个n_pos变量存储当前触摸点的位置
        var n_pos = t.getLocation();
        //打印触摸点的坐标，x坐标，y坐标
        // console.log(n_pos, n_pos.x, n_pos.y);

        //定义变量delta存储变化距离
        var delta = t.getDelta();
        //变化当前节点位置使其跟随触摸点,实现按住移动效果
        this.node.x += delta.x;
        this.node.y += delta.y;
    },

    touchOff(){
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this)
        this.node.off(cc.Node.EventType.TOUCH_START, () => {
            this.touchStart = true
        }, this)
        this.node.off(cc.Node.EventType.TOUCH_END, () => {
            this.touchStart = false
        }, this)
    },

    touchOn(){
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this)
        this.node.on(cc.Node.EventType.TOUCH_START, () => {
            this.touchStart = true
        }, this)
        this.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.touchStart = false
        }, this)
    },

    explode() {
        var urls = ['飞机1a爆炸1', '飞机1a爆炸2', '飞机1a爆炸3', '飞机1a爆炸4']
        cc.loader.loadResArray(urls, cc.SpriteFrame, (err, res) => {
            if (err) {
                console.log('error');
                return;
            }
            cc.log(res)
            this.node.runAction(cc.sequence(cc.callFunc(() => {
                this.getComponent(cc.Sprite).spriteFrame = res[0]
            }), cc.delayTime(0.075), cc.callFunc(() => {
                this.getComponent(cc.Sprite).spriteFrame = res[1]
            }), cc.delayTime(0.075), cc.callFunc(() => {
                this.getComponent(cc.Sprite).spriteFrame = res[2]
            }), cc.delayTime(0.075), cc.callFunc(() => {
                this.getComponent(cc.Sprite).spriteFrame = res[3]
            }), cc.delayTime(0.075), cc.callFunc(() => {
                this.node.active = false
            })))
        })
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name == "EnemyBullets") {
            other.node.active = false;
            this.life--;
        }

        if (other.node.name == "Enemy1") {
            this.life--;
        }

        if (other.node.name == "LifeItem") {
            other.node.active = false;
            if (this.life < 3) {
                this.life += 1;
                if (this.life == 2) {
                    this.lifeTag.getChildByName('Life2').active = true;
                }
                else {
                    this.lifeTag.getChildByName('Life3').active = true;
                }
            }
        }

        if (other.node.name == "PowerItem") {
            other.node.active = false;
            this.powerOn = true;
            this.node.getComponent('PlayerBulletsEmitter1').enabled = false;
            this.node.getComponent('PlayerBulletsEmitter').enabled = true;
            this.node.getComponent('PlayerBulletsEmitter2').enabled = true;
        }

        if (other.node.name == "BombItem") {
            other.node.active = false;
            this.node.parent.getChildByName('Bomb').active = true;
            this.bomber = true;
        }
    },
});