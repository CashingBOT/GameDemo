import { AnimType, CatchGoldMap, CatchGoldInfo } from "./CatchGoldInfoService";
import { SDKAdType, GameService } from "../../Game/service/GameService";
import { UserInfoService } from "../../Game/service/UserInfoService";
import { CodeMap } from "../../Game/Map/CodeMap";
import { GameCore } from "../../Game/GameCore";
import { PopupType } from "../SysPopupLogic";
import R from "../../R";

const { ccclass, property } = cc._decorator;

/**
 * 接金子主逻辑
 */
@ccclass
export default class CatchGoldMainLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.FULL;

    @property(cc.SpriteFrame)
    private spriteFramePauseBtn: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    private spriteFrameResumeBtn: cc.SpriteFrame = null;
    @property(cc.Sprite)
    private spPauseBtn: cc.Sprite = null;
    @property(cc.Sprite)
    private spAvatar: cc.Sprite = null;
    @property(sp.Skeleton)
    private spineReady: sp.Skeleton = null;
    @property(sp.Skeleton)
    private spineCountTitle: sp.Skeleton = null;
    @property(sp.Skeleton)
    private spineCountArrow: sp.Skeleton = null;
    @property(sp.Skeleton)
    private spineCountAmountSmall: sp.Skeleton = null;
    @property(sp.Skeleton)
    private spineCountAmountMiddle: sp.Skeleton = null;
    @property(sp.Skeleton)
    private spineCountAmountBig: sp.Skeleton = null;
    @property(cc.Label)
    private lbNickName: cc.Label = null;
    @property(cc.Node)
    private nodeMoveControl: cc.Node = null;
    @property(cc.Label)
    private lbCountDown: cc.Label = null;
    @property(cc.Label)
    private lbBigGold: cc.Label = null;
    @property(cc.Label)
    private lbMiddleGold: cc.Label = null;
    @property(cc.Label)
    private lbSmallGold: cc.Label = null;
    @property(cc.Label)
    private lbBigGoldCount: cc.Label = null;
    @property(cc.Label)
    private lbMiddleGoldCount: cc.Label = null;
    @property(cc.Label)
    private lbSmallGoldCount: cc.Label = null;
    @property(cc.Label)
    private lbBigAmount: cc.Label = null;
    @property(cc.Label)
    private lbMiddleAmount: cc.Label = null;
    @property(cc.Label)
    private lbSmallAmount: cc.Label = null;
    @property(cc.Label)
    private lbTotalAmount: cc.Label = null;
    @property(cc.Label)
    private lbVideoNum: cc.Label = null;
    @property(cc.Button)
    private btnPlayAgain: cc.Button = null;
    @property([cc.Node])
    private boxTopList: cc.Node[] = [];
    @property([cc.Node])
    private boxBottomList: cc.Node[] = [];
    @property(cc.Node)
    private boxTimer: cc.Node = null;
    @property(cc.Node)
    private boxPlayer: cc.Node = null;
    @property(cc.Node)
    private boxCountSmall: cc.Node = null;
    @property(cc.Node)
    private boxCountMiddle: cc.Node = null;
    @property(cc.Node)
    private boxCountBig: cc.Node = null;
    @property(cc.Node)
    private boxCountBottom: cc.Node = null;
    @property(cc.Node)
    private nodeArrowSmall: cc.Node = null;
    @property(cc.Node)
    private nodeArrowMiddle: cc.Node = null;
    @property(cc.Node)
    private nodeArrowBig: cc.Node = null;
    @property(cc.Node)
    private pauseView: cc.Node = null;
    @property(cc.Node)
    private countView: cc.Node = null;
    @Core.module(Core.Res)
    public res: Core.Res = null;
    @Core.module(Core.Audio)
    public audio: Core.Audio = null;

    private finishTime: number = 0;

    private deltaTime: number = 0;

    protected coreOnLoad(): void {
        this.initInfo();
        this.setModel();
        this.gameStart();
    }

    protected coreUpdate(dt: number): void {
        this.deltaTime = dt;
    }

    /**
     * 初始化信息
     */
    private async initInfo(): Promise<void> {
        this.audio.playMusic(R.Mp3_catchGold_music);
        this.lbNickName.string = UserInfoService.nickname;
        if (UserInfoService.headPortrait && UserInfoService.headPortrait.indexOf("http") !== -1) {
            let texture: cc.Texture2D = await this.res.loadExternal(UserInfoService.headPortrait);
            this.spAvatar.spriteFrame = new cc.SpriteFrame(texture);
        }
    }

    /**
     * 设置监听
     */
    private setModel(): void {
        this.coreOnModel(CatchGoldInfo, "bigGoldAmount", (v) => {
            this.lbBigGold.string = v + "";
            this.lbBigGoldCount.string = v + "";
        });
        this.coreOnModel(CatchGoldInfo, "middleGoldAmount", (v) => {
            this.lbMiddleGold.string = v + "";
            this.lbMiddleGoldCount.string = v + "";
        });
        this.coreOnModel(CatchGoldInfo, "smallGoldAmount", (v) => {
            this.lbSmallGold.string = v + "";
            this.lbSmallGoldCount.string = v + "";
        });
    }

    /**
     * 设置倒计时
     */
    private setCountDown(): void {
        this.finishTime = 60000;
        this.schedule(() => {
            this.finishTime -= 16;
            let restTime = this.finishTime;
            let second = parseInt(restTime / 1000 + "");
            let secondStr = second.toString();
            let millisecond = restTime % 1000;
            let millisecondStr = millisecond.toString().substring(0, 2);
            if (millisecondStr.length === 1) millisecondStr = "0" + millisecondStr;
            if (secondStr.length === 1) secondStr = "0" + secondStr;
            if (restTime >= 0) this.lbCountDown.string = `${secondStr}:${millisecondStr}`;
            else this.lbCountDown.string = "00:00";
            if (restTime <= -1000) {
                this.unscheduleAllCallbacks();
                this.gameFinish();
            }
        });
    }

    /**
     * 游戏开始
     */
    private gameStart(): void {
        this.spineReady.node.active = true;
        this.btnPlayAgain.interactable = false;
        this.spineReady.setCompleteListener(() => {
            this.boxTimer.active = true;
            this.nodeMoveControl.active = true;
            this.spineReady.node.active = false;
            this.setCountDown();
            Core.eventManager.event(CatchGoldMap.SPAWN_ITEM);
        });
        this.boxTopList.forEach((node) => {
            cc.tween(node)
                .call(() => (node.y += 300))
                .by(0.75, { y: -300 })
                .start();
        });
        this.boxBottomList.forEach((node) => {
            cc.tween(node)
                .call(() => (node.y -= 300))
                .by(0.75, { y: 300 })
                .start();
        });
    }

    /**
     * 游戏重新开始
     */
    private gameRestart(): void {
        // 重置倒计时
        this.lbCountDown.string = "60:00";
        this.spineReady.node.active = true;
        this.spineReady.animation = AnimType.ANIM_1;

        // 重置移动控制
        this.nodeMoveControl.active = false;
        this.boxPlayer.position = cc.v3();

        // 重置结算
        this.countView.active = false;
        this.btnPlayAgain.interactable = false;
        this.spineCountArrow.node.active = false;
        this.nodeArrowSmall.active = true;
        this.nodeArrowMiddle.active = true;
        this.nodeArrowBig.active = true;
        this.spineCountTitle.animation = AnimType.ANIM_1;
        this.spineCountArrow.animation = AnimType.NONE;
        this.spineCountAmountSmall.animation = AnimType.NONE;
        this.spineCountAmountMiddle.animation = AnimType.NONE;
        this.spineCountAmountBig.animation = AnimType.NONE;

        // 重置数据
        CatchGoldInfo.clearScore();
        Core.eventManager.event(CatchGoldMap.RESTART_GAME);
    }

    /**
     * 游戏结束
     */
    private gameFinish(): void {
        this.gameFinishCount();
        this.gameFinishAnim();
    }

    /**
     * 游戏结算
     */
    private async gameFinishCount(): Promise<void> {
        let bigGold = UserInfoService.nextGoldCoin * CatchGoldInfo.bigGoldAmount * 0.005;
        let middleGold = UserInfoService.nextGoldCoin * CatchGoldInfo.middleGoldAmount * 0.002;
        let smallGold = UserInfoService.nextGoldCoin * CatchGoldInfo.smallGoldAmount * 0.001;
        let totalGold = bigGold + middleGold + smallGold;
        let data = await Core.webSockets.send<xxgBuf.IGameEndRet>(
            "GameEndReq",
            new xxgBuf.GameEndReq({ gold: totalGold })
        );
        if (!data) return;
        CatchGoldInfo.gameNum = data.gameNum;
        CatchGoldInfo.videoNum = data.videoNum;
        this.lbVideoNum.string = "剩余次数: " + CatchGoldInfo.videoNum;
        if (CatchGoldInfo.videoNum > 0) this.btnPlayAgain.interactable = true;
        UserInfoService.currentGoldCoin += totalGold;
        this.countView.active = true;
        this.lbBigAmount.string = bigGold.toFixed();
        this.lbMiddleAmount.string = middleGold.toFixed();
        this.lbSmallAmount.string = smallGold.toFixed();
        this.lbTotalAmount.string = totalGold.toFixed();
    }

    /**
     * 游戏结束结算界面入场动画
     */
    private gameFinishAnim(): void {
        cc.tween(this.boxCountBottom)
            .call(() => (this.boxCountBottom.y -= 300))
            .by(0.3, { y: 300 })
            .start();
        cc.tween(this.boxCountSmall)
            .call(() => (this.boxCountSmall.x += 750))
            .by(0.3, { x: -750 })
            .start();
        cc.tween(this.boxCountMiddle)
            .call(() => (this.boxCountMiddle.x += 750))
            .delay(0.15)
            .by(0.3, { x: -750 })
            .start();
        cc.tween(this.boxCountBig)
            .call(() => (this.boxCountBig.x += 750))
            .delay(0.3)
            .by(0.3, { x: -750 })
            .start();
        this.spineCountTitle.setCompleteListener(() => {
            this.nodeArrowSmall.active = false;
            this.nodeArrowMiddle.active = false;
            this.nodeArrowBig.active = false;
            this.spineCountArrow.node.active = true;
            this.spineCountTitle.animation = AnimType.ANIM_2;
            this.spineCountArrow.animation = AnimType.ANIM_2;
            this.spineCountAmountSmall.animation = AnimType.ANIM_2;
            this.spineCountAmountMiddle.animation = AnimType.ANIM_2;
            this.spineCountAmountBig.animation = AnimType.ANIM_2;
        });
    }

    @Core.event(Core.CoreEventMap.CORE_ON_HIDE)
    private onHide(): void {
        this.onClickPause();
    }

    @Core.event(Core.CoreEventMap.CORE_ON_SHOW)
    private onShow(): void {
        if (this.countView.active) this.onClickResume();
    }

    /**
     * 错误码处理
     */
    @Core.code(CodeMap.CATCH_GOLD_GAME_ERROR)
    private errorHandle(code: CodeMap): void {
        let str = "";
        switch (code) {
            case CodeMap.CATCH_GOLD_GAME_ERROR:
                str = "啊哦，地摊遇到了一点小问题，请点击确定按钮刷新重试。";
                break;
        }
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: str,
            closeButtonShow: false,
            confirm: this.coreCloseView.bind(this),
        });
    }

    /**
     * 暂停按钮点击事件
     */
    private onClickPause(): void {
        cc.director.getScheduler().pauseTarget(this);
        Core.eventManager.event(CatchGoldMap.PAUSE_GAME);
        this.spPauseBtn.spriteFrame = this.spriteFrameResumeBtn;
        this.spineReady.paused = true;
        this.pauseView.active = true;
    }

    /**
     * 回到游戏按钮点击事件
     */
    private onClickResume(): void {
        cc.director.getScheduler().resumeTarget(this);
        Core.eventManager.event(CatchGoldMap.RESUME_GAME);
        this.spPauseBtn.spriteFrame = this.spriteFramePauseBtn;
        this.spineReady.paused = false;
        this.pauseView.active = false;
    }

    /**
     * 再来一次按钮点击事件
     */
    private onClickAgain(): void {
        GameService.playAd(SDKAdType.NORMAL).then(() => {
            this.onClickResume();
            Core.webSockets.sendUDP("GameStartUdp", xxgBuf.GameStartUdp);
            CatchGoldInfo.initNum();
            this.gameRestart();
        });
    }

    /**
     * 退出按钮点击事件
     */
    private onClickQuit(): void {
        CatchGoldInfo.initNum();
        CatchGoldInfo.clearScore();
        this.audio.playMusic(R.Mp3_lobby);
        this.coreCloseView();
    }
}
