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
        speed: 100,
        life: 5,
    },

    ctor() {
        this.isDead = false;
        this.type = 1;

    },

    onLoad() {

    },

    unuse() {
        this.node.stopAllActions()
        this.active = false
    },

    // LIFE-CYCLE CALLBACKS:
    reuse() {
        this.active = true
        this.life = 1
        this.isDead = false
        cc.loader.loadRes('飞机2a', cc.SpriteFrame, (err, res) => {
            if (err) {
                console.log('error');
                return;
            }
            this.getComponent(cc.Sprite).spriteFrame = res
        })
    },

    start() {

    },

    update(dt) {
        if (this.life <= 0 && !this.isDead) {
            this.dead()
        }
    },

    dead(noEvent) {
        if (!this.isDead) {
            this.explode(() => {
                if (!noEvent) {
                    let event = new cc.Event.EventCustom('enemyDestory', true)
                    event.setUserData(this)
                    this.node.dispatchEvent(event)
                }
            });
            this.node.parent.getComponent('Game').gainScoreEnemy2();
            this.isDead = true;
        }
    },

    explode(fun) {
        var urls = ['飞机2a爆炸1', '飞机2a爆炸2', '飞机2a爆炸3', '飞机2a爆炸4']
        cc.loader.loadResArray(urls, cc.SpriteFrame, (err, res) => {
            if (err) {
                console.log('error');
                return;
            }
            this.node.runAction(cc.sequence(cc.callFunc(() => {
                this.getComponent(cc.Sprite).spriteFrame = res[0]
            }), cc.delayTime(0.075), cc.callFunc(() => {
                this.getComponent(cc.Sprite).spriteFrame = res[1]
            }), cc.delayTime(0.075), cc.callFunc(() => {
                this.getComponent(cc.Sprite).spriteFrame = res[2]
            }), cc.delayTime(0.075), cc.callFunc(() => {
                this.getComponent(cc.Sprite).spriteFrame = res[3]
            }), cc.delayTime(0), cc.callFunc(() => {
                fun()
            })))
        })
    },

    emitter: function () {
        var enemy = this.node;
        enemy.position = this.node.position;
        enemy.y = this.node.y;
        enemy.parent = this.node.parent;
        let distance = (cc.winSize.height + this.node.y);
        let duration = distance / this.speed;
        let moveBy = cc.moveBy(duration, cc.v2(0, -distance));
        let callBack = cc.callFunc(() => {
            let event = new cc.Event.EventCustom('enemyDestory', true)
            event.setUserData(this)
            this.node.dispatchEvent(event)
        }, this);
        let seq = cc.sequence(moveBy, callBack)
        enemy.runAction(seq);
    },

    onCollisionStay: function (other, self) {
        this.life--;
        if (other.node.name == "PlayerBullets") {
            other.node.active = false;
        }
        //console.log('on collision enter');
        //console.log('Enemy1Life: ' + this.life);
    },
})
