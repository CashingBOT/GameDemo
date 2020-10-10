import { BORDER_X, AnimType, ItemType, CatchGoldMap, CatchGoldInfo } from "./CatchGoldInfoService";

const { ccclass, property } = cc._decorator;

/**
 * 玩家控制
 */
@ccclass
export default class PlayerControl extends Core.ComponentLogic {
    @property(cc.Node)
    private nodeScore: cc.Node = null;
    @property(cc.SpriteFrame)
    private spriteFrameBig: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    private spriteFrameMiddle: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    private spriteFrameSmall: cc.SpriteFrame = null;
    @property(cc.Sprite)
    private spScore: cc.Sprite = null;
    @property(sp.Skeleton)
    private spinePlayer: sp.Skeleton = null;
    @property(cc.LabelShadow)
    private lbShadowScore: cc.LabelShadow = null;

    protected coreUpdate(): void {
        this.judgeMoveBorder();
    }

    /**
     * 判断玩家移动范围不超出屏幕
     */
    private judgeMoveBorder(): void {
        if (this.node.x >= BORDER_X) this.node.x = BORDER_X;
        if (this.node.x <= -BORDER_X) this.node.x = -BORDER_X;
    }

    /**
     * 玩家头顶展现分数
     */
    public showScore(item: string): void {
        switch (item) {
            case ItemType.SMALL:
                this.lbShadowScore.color = new cc.Color().fromHEX("#00FF00");
                this.spScore.spriteFrame = this.spriteFrameSmall;
                break;
            case ItemType.MIDDLE:
                this.lbShadowScore.color = new cc.Color().fromHEX("#FC00FF");
                this.spScore.spriteFrame = this.spriteFrameMiddle;
                break;
            case ItemType.BIG:
                this.lbShadowScore.color = new cc.Color().fromHEX("#FFEA00");
                this.spScore.spriteFrame = this.spriteFrameBig;
                break;
        }
        this.nodeScore.active = true;
        cc.tween(this.nodeScore)
            .call(() => {
                this.nodeScore.y -= 20;
                this.nodeScore.active = true;
            })
            .by(0.2, { y: 20 })
            .call(() => (this.nodeScore.active = false))
            .start();
    }

    /**
     * 玩家眩晕事件
     */
    @Core.event(CatchGoldMap.PLAYER_DIZZY)
    private playerDizzy(): void {
        this.unschedule(this.scheduleCallback);
        this.spinePlayer.animation = AnimType.ANIM_2;
        CatchGoldInfo.canMove = false;
        this.scheduleOnce(this.scheduleCallback, 2);
    }

    /**
     * 眩晕计时器回调
     */
    private scheduleCallback(): void {
        this.spinePlayer.animation = AnimType.ANIM_3;
        CatchGoldInfo.canMove = true;
    }

    /**
     * 暂停游戏事件
     */
    @Core.event(CatchGoldMap.PAUSE_GAME)
    private pauseGame(): void {
        cc.director.getScheduler().pauseTarget(this);
        this.spinePlayer.paused = true;
    }

    /**
     * 恢复游戏事件
     */
    @Core.event(CatchGoldMap.RESUME_GAME)
    private resumeGame(): void {
        cc.director.getScheduler().resumeTarget(this);
        this.spinePlayer.paused = false;
    }
}
