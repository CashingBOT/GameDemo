import { PLAYER_SPEED, AnimType, CatchGoldInfo } from "./CatchGoldInfoService";

const { ccclass, property } = cc._decorator;

/**
 * 移动控制
 */
@ccclass
export default class MoveControl extends cc.Component {
    @property(cc.Node)
    private leftCrl: cc.Node = null;

    @property(cc.Node)
    private rightCrl: cc.Node = null;

    @property(cc.Node)
    private playerBox: cc.Node = null;

    @property(cc.Node)
    private player: cc.Node = null;

    private ifLeftMove: boolean = false;

    private ifRightMove: boolean = false;

    protected onLoad(): void {
        this.setTouchEvent();
    }

    protected update(dt: number): void {
        if (!CatchGoldInfo.canMove) return;
        if (this.ifLeftMove) this.playerBox.x -= PLAYER_SPEED * dt;
        if (this.ifRightMove) this.playerBox.x += PLAYER_SPEED * dt;
    }

    /**
     * 设置触摸事件
     */
    private setTouchEvent(): void {
        this.leftCrl.on(cc.Node.EventType.TOUCH_START, () => {
            if (!CatchGoldInfo.canMove) return;
            this.ifLeftMove = true;
            this.player.scaleX = 1;
            this.player.getComponent(sp.Skeleton).animation = AnimType.ANIM_1;
        });
        this.rightCrl.on(cc.Node.EventType.TOUCH_START, () => {
            if (!CatchGoldInfo.canMove) return;
            this.ifRightMove = true;
            this.player.scaleX = -1;
            this.player.getComponent(sp.Skeleton).animation = AnimType.ANIM_1;
        });
        this.leftCrl.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            this.ifLeftMove = false;
            if (!CatchGoldInfo.canMove) return;
            this.player.scaleX = 1;
            this.player.getComponent(sp.Skeleton).animation = AnimType.ANIM_3;
        });
        this.rightCrl.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            this.ifRightMove = false;
            if (!CatchGoldInfo.canMove) return;
            this.player.scaleX = -1;
            this.player.getComponent(sp.Skeleton).animation = AnimType.ANIM_3;
        });
        this.leftCrl.on(cc.Node.EventType.TOUCH_END, () => {
            this.ifLeftMove = false;
            if (!CatchGoldInfo.canMove) return;
            this.player.scaleX = 1;
            this.player.getComponent(sp.Skeleton).animation = AnimType.ANIM_3;
        });
        this.rightCrl.on(cc.Node.EventType.TOUCH_END, () => {
            this.ifRightMove = false;
            if (!CatchGoldInfo.canMove) return;
            this.player.scaleX = -1;
            this.player.getComponent(sp.Skeleton).animation = AnimType.ANIM_3;
        });
    }
}
