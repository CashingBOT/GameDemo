/******************
 * Bubble manager
 * Creator: Resol
 * ************** */

const { ccclass, property } = cc._decorator;

@ccclass
export default class BubbleMgr extends cc.Component {
    private _parentMgr = null;

    public start(): void {
    }

    public initBubble(parent: cc.Node, pos: cc.Vec2, color: number): void {
        let bubble = this.node.parent;
        parent.addChild(bubble);
        bubble.position = pos;
        cc.loader.loadRes(`textures/atlas/bubbles/bubble${color}`, cc.SpriteFrame, (err, spriteFrame) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            bubble.addComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    }

    public playDeathAnim(): void {
        cc.tween(this.node.parent)
            .to(0.1, { scale: 1.2 })
            .to(0.1, { scale: 1.0 })
            .removeSelf()
            .start();
    }

    public playDownAnim(): void {
        this.node.parent.runAction(
            cc.sequence(
                cc.spawn(
                    cc.moveBy(0.5, 0, -300),
                    cc.fadeOut(0.5)
                ),
                cc.removeSelf()
            )
        );
    }
}
