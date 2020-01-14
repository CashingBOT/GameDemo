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
export default class EnemyBulletsEmitter extends cc.Component {

    @property(cc.Prefab)
    prefab: cc.Prefab = null;

    @property()
    speed = 1000;

    @property()
    rate = 1;

    @property()
    offset = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.schedule(this.emitter, this.rate);
    }

    //start() {}

    // update(dt){}

    public emitter() {
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.y = this.node.y - 20;
        bullet.x = this.node.x + 1;
        bullet.x += this.offset;
        bullet.parent = this.node.parent;
        let distance = (cc.winSize.height + this.node.y);
        let duration = distance / this.speed;
        let moveBy = cc.moveBy(duration, cc.v2(0, -distance));
        let reMoveSelf = cc.removeSelf();
        let sequence = cc.sequence(moveBy, reMoveSelf);
        bullet.runAction(sequence);
    }
}
