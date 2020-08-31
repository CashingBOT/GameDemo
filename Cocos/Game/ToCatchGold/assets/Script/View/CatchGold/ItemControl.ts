import { ToolType, Item, DROP_HEIGHT, PLAYER_SPEED, CatchGoldData } from "./CatchGoldInfo";
import ItemDropControl from "./ItemDropControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemControl extends Core.ViewLogic {
    @property(cc.Node)
    private nodeItem: cc.Node = null;
    @property(cc.Node)
    private nodeShadow: cc.Node = null;
    @property(cc.Sprite)
    private spriteItem: cc.Sprite = null;
    @property(cc.SpriteFrame)
    private spriteFrameBig: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    private spriteFrameMiddle: cc.SpriteFrame = null;
    @property([cc.SpriteFrame])
    private spriteFrameSmall: cc.SpriteFrame[] = [];
    @property(cc.SpriteFrame)
    private spriteFrameHammer: cc.SpriteFrame = null;

    private itemDropControl: ItemDropControl = null;

    private nodePlayer: cc.Node = null;

    protected coreUpdate(): void {
        if (!this.nodePlayer) return;

        let itemPos = this.node.convertToWorldSpaceAR(this.nodeItem.position);
        let shadowPos = this.node.convertToWorldSpaceAR(this.nodeShadow.position);
        let playerPos = this.nodePlayer.parent.convertToWorldSpaceAR(this.nodePlayer.position);

        let condition1 = Math.abs(playerPos.y - itemPos.y) <= this.nodePlayer.height;
        let condition2 = Math.abs(playerPos.y - shadowPos.y) <= this.nodePlayer.height / 2;
        let condition3 = Math.abs(playerPos.x - shadowPos.x) <= CatchGoldData.playerCatchRange;

        if (condition1 && condition2 && condition3) {
            cc.log(this.node.name + " has been caught");
            this.countScore();
            this.destroyItem();
        }
    }

    public startDrop(itemDropControl: ItemDropControl, player: cc.Node): void {
        this.itemDropControl = itemDropControl;
        this.nodePlayer = player;
        this.nodeItem.y = DROP_HEIGHT;
        switch (this.node.name) {
            case Item.BIG:
                this.spriteItem.spriteFrame = this.spriteFrameBig;
                cc.tween(this.nodeItem)
                    .by(1.4, { y: -DROP_HEIGHT + 50 })
                    .call(() => itemDropControl.itemPool.put(this.node))
                    .start();
                break;
            case Item.MIDDLE:
                this.spriteItem.spriteFrame = this.spriteFrameMiddle;
                cc.tween(this.nodeItem)
                    .by(2.2, { y: -DROP_HEIGHT + 40 })
                    .call(() => itemDropControl.itemPool.put(this.node))
                    .start();
                break;
            case Item.SMALL:
                let num = Math.floor(Math.random());
                this.spriteItem.spriteFrame = this.spriteFrameSmall[num];
                cc.tween(this.nodeItem)
                    .by(3, { y: -DROP_HEIGHT + 30 })
                    .call(() => itemDropControl.itemPool.put(this.node))
                    .start();
                break;
            case Item.HAMMER:
                this.spriteItem.spriteFrame = this.spriteFrameHammer;
                cc.tween(this.nodeItem)
                    .by(2.2, { y: -DROP_HEIGHT + 50 })
                    .call(() => itemDropControl.itemPool.put(this.node))
                    .start();
                break;
        }
    }

    private countScore(): void {
        switch (this.node.name) {
            case Item.BIG:
                CatchGoldData.goldAmount += 3;
                break;
            case Item.MIDDLE:
                CatchGoldData.goldAmount += 2;
                break;
            case Item.SMALL:
                CatchGoldData.goldAmount += 1;
                break;
            case Item.HAMMER:
                CatchGoldData.playerSpeed = 0;
                if (CatchGoldData.toolType === ToolType.IRON) {
                    CatchGoldData.goldAmount *= 0.65;
                    setTimeout(() => (CatchGoldData.playerSpeed = PLAYER_SPEED), 3000);
                } else {
                    CatchGoldData.goldAmount *= 0.5;
                    setTimeout(() => (CatchGoldData.playerSpeed = PLAYER_SPEED), 1000);
                }
                CatchGoldData.goldAmount = Math.floor(CatchGoldData.goldAmount);
                break;
        }
    }

    private destroyItem(): void {
        this.nodeItem.stopAllActions();
        this.itemDropControl.itemPool.put(this.node);
    }
}
