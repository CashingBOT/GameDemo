import { CatchGoldData, ToolType, GamePhase, CatchGoldMap } from "./CatchGoldInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CatchGoldView extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.FULL;

    @property(cc.SpriteFrame)
    private spriteFrameBamboo: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    private spriteFrameIron: cc.SpriteFrame = null;

    @property(cc.Sprite)
    private spriteTool: cc.Sprite = null;

    @property(cc.Label)
    private lbCountDown: cc.Label = null;

    @property(cc.Label)
    private lbScore: cc.Label = null;

    @property(sp.Skeleton)
    private spineReady: sp.Skeleton = null;

    @Core.module(Core.Timer)
    private timer: Core.Timer = null;

    protected coreOnLoad(): void {
        this.setModel();
    }

    private setModel(): void {
        this.coreOnModel(CatchGoldData, "toolType", (v) => {
            if (v === ToolType.BIG || v === ToolType.SMALL) this.spriteTool.spriteFrame = this.spriteFrameBamboo;
            if (v === ToolType.IRON) this.spriteTool.spriteFrame = this.spriteFrameIron;
        });

        this.coreOnModel(CatchGoldData, "goldAmount", (v) => {
            this.lbScore.string = v + "";
        });
    }

    private setCountDown(): void {
        let counter = 60;
        CatchGoldData.phase = GamePhase.ONE;
        let intervalId = this.timer.setInterval(() => {
            this.lbCountDown.string = `${--counter}秒`;
            if (counter === 39) CatchGoldData.phase = GamePhase.TWO;
            if (counter === 20) CatchGoldData.phase = GamePhase.THREE;
            if (counter === 3) {
                this.lbCountDown.node.color = cc.Color.RED;
            }
            if (counter === 0) {
                this.timer.clearInterval(intervalId);
            }
        }, 1000);
    }

    @Core.event(CatchGoldMap.GAME_START)
    private gameStart(): void {
        this.spineReady.node.active = true;
        this.spineReady.setEndListener(() => {
            this.setCountDown();
            this.spineReady.node.active = false;
        });
    }

    @Core.event(CatchGoldMap.GAME_END)
    private gameEnd(): void {}

    @Core.event(CatchGoldMap.GAME_CLOSE)
    private gameClose(): void {
        this.coreCloseView();
    }
}
