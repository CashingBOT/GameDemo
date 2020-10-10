import { DROP_HEIGHT, ItemType, CatchGoldMap, CatchGoldInfo } from "./CatchGoldInfoService";
import R from "../../R";

const { ccclass, property } = cc._decorator;

/**
 * 单物品控制
 */
@ccclass
export default class ItemControl extends Core.ComponentLogic {
    @property(cc.Sprite)
    private spriteItem: cc.Sprite = null;
    @property(cc.SpriteFrame)
    private spriteFrameBig: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    private spriteFrameMiddle: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    private spriteFrameSmall: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    private spriteFrameHammer: cc.SpriteFrame = null;
    @Core.module(Core.Audio)
    public audio: Core.Audio = null;

    /**
     * 初始化掉落物品
     */
    public initDropItem(): void {
        this.node.y = DROP_HEIGHT;
        this.setSprite();
        this.startDrop();
    }

    /**
     * 设置物品精灵
     */
    private setSprite(): void {
        switch (this.node.name) {
            case ItemType.BIG:
                this.spriteItem.spriteFrame = this.spriteFrameBig;
                break;
            case ItemType.MIDDLE:
                this.spriteItem.spriteFrame = this.spriteFrameMiddle;
                break;
            case ItemType.SMALL:
                this.spriteItem.spriteFrame = this.spriteFrameSmall;
                break;
            case ItemType.HAMMER:
                this.spriteItem.spriteFrame = this.spriteFrameHammer;
                break;
        }
    }

    /**
     * 开始掉落
     */
    private startDrop(): void {
        cc.tween(this.node)
            .by(2, { y: -DROP_HEIGHT })
            .call(() => Core.eventManager.event(CatchGoldMap.DESTROY_ITEM, this.node))
            .start();
    }

    /**
     * 吃到的物品加分
     */
    public countScore(): void {
        switch (this.node.name) {
            case ItemType.BIG:
                CatchGoldInfo.bigGoldAmount += 1;
                this.audio.playSound(R.Mp3_catchGold_getbonus);
                break;
            case ItemType.MIDDLE:
                CatchGoldInfo.middleGoldAmount += 1;
                this.audio.playSound(R.Mp3_catchGold_getbonus);
                break;
            case ItemType.SMALL:
                CatchGoldInfo.smallGoldAmount += 1;
                this.audio.playSound(R.Mp3_catchGold_getbonus);
                break;
            case ItemType.HAMMER:
                Core.eventManager.event(CatchGoldMap.PLAYER_DIZZY);
                this.audio.playSound(R.Mp3_catchGold_gethammer);
                break;
        }
    }

    /**
     * 持续眩晕
     */
    public continueDizzy(): void {
        Core.eventManager.event(CatchGoldMap.PLAYER_DIZZY);
        this.audio.playSound(R.Mp3_catchGold_gethammer);
    }

    /**
     * 暂停游戏事件
     */
    @Core.event(CatchGoldMap.PAUSE_GAME)
    private pauseGame(): void {
        this.node.pauseAllActions();
    }

    /**
     * 恢复游戏事件
     */
    @Core.event(CatchGoldMap.RESUME_GAME)
    private resumeGame(): void {
        this.node.resumeAllActions();
    }
}
