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
export default class Enemy2 extends cc.Component {

    @property()
    speed = 100;

    @property()
    life = 18;

    private isDead = false;
    private type = 2;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        // this.emitter();
    }


    public unuse() {
        this.node.stopAllActions()
    }

    public reuse() {
        this.life = 18
        this.isDead = false
        cc.loader.loadRes('飞机3a', cc.SpriteFrame, (err, res) => {
            if (err) {
                console.log('error');
                return;
            }
            this.getComponent(cc.Sprite).spriteFrame = res
        })
    }

    update(dt) {
        if (this.life <= 0) {
            this.dead()
        }

        if(this.node.position.y <= 250){
            this.node.getComponent('EnemyBulletsEmitter2').enabled = true
            this.node.parent.getComponent('Spawn').stopped()
        }
    }

    public dead(noEvent?) {
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
    }

    public explode(fun) {
        var urls = ['飞机3a爆炸1', '飞机3a爆炸2', '飞机3a爆炸3', '飞机3a爆炸4', '飞机3a爆炸5']
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
            }), cc.delayTime(0.075), cc.callFunc(() => {
                this.getComponent(cc.Sprite).spriteFrame = res[4]
            }), cc.delayTime(0), cc.callFunc(() => {
                fun()
            })))
        })
    }

    public emitter() {
        var enemy = this.node;
        enemy.position = this.node.position;
        enemy.y = this.node.y;
        enemy.parent = this.node.parent;
        let distance = (cc.winSize.height + this.node.y);
        let duration = distance / this.speed;
        let moveTo = cc.moveTo(duration, cc.v2(0, 250));
        let callBack = cc.callFunc(() => {
            let event = new cc.Event.EventCustom('enemyDestory', true)
            event.setUserData(this)
            this.node.dispatchEvent(event)
        }, this);
        // let sequence = cc.sequence(moveBy, reMoveSelf);
        // let seq = cc.sequence(moveTo, callBack)
        enemy.runAction(moveTo);
    }

    public onCollisionStay(other, self) {
        this.life--;
        if (other.node.name == "PlayerBullets") {
            other.node.active = false;
        }
        //console.log('on collision enter');
        //console.log('Enemy1Life: ' + this.life);
    }
}
