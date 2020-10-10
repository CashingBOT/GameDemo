import { GameService, SDKAdType } from "../Game/service/GameService";
import { CatchGoldInfo } from "./CatchGold/CatchGoldInfoService";
import R from "../R";
import { GameCore } from "../Game/GameCore";

const { ccclass, property } = cc._decorator;

/**
 * 趣味游戏
 */
@ccclass
export default class FunGameLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.FULL;

    @property(cc.Button)
    private btnStart: cc.Button = null;
    @property(cc.Button)
    private btnWatchAd: cc.Button = null;
    @property(cc.Label)
    private lbStartNum: cc.Label = null;
    @property(cc.Label)
    private lbAdNum: cc.Label = null;
    @property(cc.Node)
    private lbAd: cc.Node = null;

    public init(d: xxgBuf.IGameInfoRet): void {
        CatchGoldInfo.gameNum = d.gameNum;
        CatchGoldInfo.videoNum = d.videoNum;
    }

    protected coreOnLoad(): void {
        this.setModel();

        if (GameCore.config.isReview) {
            this.btnWatchAd.node.active = false;
            this.lbAdNum.node.active = false;
            this.lbAd.active = false;
        }
    }

    /**
     * 设置监听
     */
    private setModel(): void {
        this.coreOnModel(CatchGoldInfo, "gameNum", (v) => {
            this.lbStartNum.string = v + "";
            if (v <= 0) {
                this.btnStart.interactable = false;
                this.lbStartNum.string = "0";
            } else this.btnStart.interactable = true;
        });
        this.coreOnModel(CatchGoldInfo, "videoNum", (v) => {
            this.lbAdNum.string = v + "";
            if (v <= 0) {
                this.btnWatchAd.interactable = false;
                this.lbAdNum.string = "0";
            } else this.btnWatchAd.interactable = true;
        });
    }

    /**
     * 开始游戏按钮点击事件
     */
    private onClickStartGame(): void {
        Core.webSockets.sendUDP("GameStartUdp", xxgBuf.GameStartUdp);
        Core.viewManager.openView(R.CatchGold_CatchGoldMainView);
    }

    /**
     * 看广告点击事件
     */
    private onClickWatchAd(): void {
        Core.webSockets.sendUDP("GameStartUdp", xxgBuf.GameStartUdp);
        GameService.playAd(SDKAdType.NORMAL).then(() => Core.viewManager.openView(R.CatchGold_CatchGoldMainView));
    }
}
