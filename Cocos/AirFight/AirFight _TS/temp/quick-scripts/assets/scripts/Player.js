(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Player.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0d1b9O9dU5IqK/hP597RwwO', 'Player', __filename);
// scripts/Player.ts

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
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.flySpeed = 5;
        _this.life = 3;
        _this.powerTime = 30;
        _this.lifeTag = null;
        _this.enemy1 = null;
        _this.enemy2 = null;
        _this.enemy3 = null;
        _this.isDead = false;
        _this.accLeft = false;
        _this.accRight = false;
        _this.accUp = false;
        _this.accDown = false;
        _this.isStart = false;
        _this.powerOn = false;
        _this.bomber = false;
        _this.touchStart = false;
        _this._emitSeq = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Player.prototype.onLoad = function () {
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
    };
    Player.prototype.onDestroy = function () {
        var _this = this;
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
        this.node.off(cc.Node.EventType.TOUCH_START, function () {
            _this.touchStart = true;
        }, this);
        this.node.off(cc.Node.EventType.TOUCH_END, function () {
            _this.touchStart = false;
        }, this);
    };
    // start() {}
    Player.prototype.gameStart = function () {
        this.isStart = true;
    };
    Player.prototype.update = function (dt) {
        if (!this.isStart) {
            return;
        }
        if (this.touchStart) {
            if (this._emitSeq > 0.2) {
                this._emitSeq = 0;
                if (!this.powerOn) {
                    this.node.getComponent('PlayerBulletsEmitter1').emitter();
                }
                else {
                    this.node.getComponent('PlayerBulletsEmitter').emitter();
                    this.node.getComponent('PlayerBulletsEmitter2').emitter();
                }
            }
            this._emitSeq = this._emitSeq + dt;
        }
        //根据要移动的方向更新主角速度
        //左右移动
        var dirc = cc.v2(0, 0);
        var speed = 0;
        if (this.accLeft) {
            // this.node.x -= this.flySpeed * dt;
            dirc.x = dirc.x - 1;
        }
        if (this.accRight) {
            // this.node.x += this.flySpeed * dt;  
            dirc.x = dirc.x + 1;
        }
        //上下移动
        if (this.accDown) {
            // this.node.y -= this.flySpeed * dt;
            dirc.y = dirc.y - 1;
        }
        if (this.accUp) {
            // this.node.y += this.flySpeed * dt;
            dirc.y = dirc.y + 1;
        }
        if (dirc.x == 0 && dirc.y == 0) { }
        else {
            speed = this.flySpeed / Math.sqrt((dirc.x * dirc.x) + (dirc.y * dirc.y));
        }
        this.node.y += speed * dt * dirc.y;
        this.node.x += speed * dt * dirc.x;
        if (this.node.x > this.node.parent.width / 2) {
            this.node.x = this.node.parent.width / 2;
            speed = 0;
        }
        else if (this.node.x < -this.node.parent.width / 2) {
            this.node.x = -this.node.parent.width / 2;
            speed = 0;
        }
        if (this.node.y > this.node.parent.height / 2) {
            this.node.y = this.node.parent.height / 2;
            speed = 0;
        }
        else if (this.node.y < -this.node.parent.height / 2) {
            this.node.y = -this.node.parent.height / 2;
            speed = 0;
        }
        if (this.life <= 0 && !this.isDead) {
            this.explode();
            this.isDead = true;
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
    };
    Player.prototype.onKeyDown = function (event) {
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
    };
    Player.prototype.onKeyUp = function (event) {
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
    };
    Player.prototype.keyEvent = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    Player.prototype.touchEvent = function () {
        var _this = this;
        if (!this.isStart) {
            return;
        }
        ;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            _this.touchStart = true;
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, _this.onKeyDown, _this);
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, _this.onKeyUp, _this);
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            _this.touchStart = false;
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, _this.onKeyDown, _this);
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, _this.onKeyUp, _this);
        }, this);
    };
    Player.prototype.on_touch_move = function (t) {
        //定义一个n_pos变量存储当前触摸点的位置
        var n_pos = t.getLocation();
        //打印触摸点的坐标，x坐标，y坐标
        // console.log(n_pos, n_pos.x, n_pos.y);
        //定义变量delta存储变化距离
        var delta = t.getDelta();
        //变化当前节点位置使其跟随触摸点,实现按住移动效果
        this.node.x += delta.x;
        this.node.y += delta.y;
    };
    Player.prototype.touchOff = function () {
        var _this = this;
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
        this.node.off(cc.Node.EventType.TOUCH_START, function () {
            _this.touchStart = true;
        }, this);
        this.node.off(cc.Node.EventType.TOUCH_END, function () {
            _this.touchStart = false;
        }, this);
    };
    Player.prototype.touchOn = function () {
        var _this = this;
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.on_touch_move, this);
        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            _this.touchStart = true;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            _this.touchStart = false;
        }, this);
    };
    Player.prototype.explode = function () {
        var _this = this;
        var urls = ['飞机1a爆炸1', '飞机1a爆炸2', '飞机1a爆炸3', '飞机1a爆炸4'];
        cc.loader.loadResArray(urls, cc.SpriteFrame, function (err, res) {
            if (err) {
                console.log('error');
                return;
            }
            cc.log(res);
            _this.node.runAction(cc.sequence(cc.callFunc(function () {
                _this.getComponent(cc.Sprite).spriteFrame = res[0];
            }), cc.delayTime(0.075), cc.callFunc(function () {
                _this.getComponent(cc.Sprite).spriteFrame = res[1];
            }), cc.delayTime(0.075), cc.callFunc(function () {
                _this.getComponent(cc.Sprite).spriteFrame = res[2];
            }), cc.delayTime(0.075), cc.callFunc(function () {
                _this.getComponent(cc.Sprite).spriteFrame = res[3];
            }), cc.delayTime(0.075), cc.callFunc(function () {
                _this.node.active = false;
            })));
        });
    };
    Player.prototype.onCollisionEnter = function (other, self) {
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
    };
    __decorate([
        property()
    ], Player.prototype, "flySpeed", void 0);
    __decorate([
        property()
    ], Player.prototype, "life", void 0);
    __decorate([
        property()
    ], Player.prototype, "powerTime", void 0);
    __decorate([
        property(cc.Node)
    ], Player.prototype, "lifeTag", void 0);
    __decorate([
        property(cc.Prefab)
    ], Player.prototype, "enemy1", void 0);
    __decorate([
        property(cc.Prefab)
    ], Player.prototype, "enemy2", void 0);
    __decorate([
        property(cc.Prefab)
    ], Player.prototype, "enemy3", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

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
        //# sourceMappingURL=Player.js.map
        