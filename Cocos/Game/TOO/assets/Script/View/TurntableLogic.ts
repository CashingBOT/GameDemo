import { UserInfoService } from "../Game/service/UserInfoService";
import { PromptService } from "../Game/service/PromptService";
import R from "../R";
import { RewardObject, RewardViewType } from "./RewardLogic";
import { GameCore } from "../Game/GameCore";
import { CodeMap } from "../Game/Map/CodeMap";

const { ccclass, property } = cc._decorator;

const enum TurnState {
    STAND_BY = 0,
    RUN = 1,
}

const AngleList = [0, 45, 90, 135, 180, 225, 270, 315];

@ccclass
export default class TurntableLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.FULL;

    /** 分红数据 */
    private turntableData: xxgBuf.TurntableRet = null;

    /** 当前状态 */
    private status: TurnState = TurnState.STAND_BY;

    /** 转盘 */
    @property(cc.Node)
    public turntableNode: cc.Node = null;

    /** 手机碎片进度条 */
    @property(cc.ProgressBar)
    public phoneProg: cc.ProgressBar = null;

    /** 手机碎片进度文字 */
    @property(cc.RichText)
    public phoneProgL: cc.RichText = null;

    /** 红包碎片进度条 */
    @property(cc.ProgressBar)
    public redBagProg: cc.ProgressBar = null;

    /** 红包碎片进度文字 */
    @property(cc.RichText)
    public redBagProgL: cc.RichText = null;

    /** 剩余转动次数 */
    @property(cc.Label)
    public timeL: cc.Label = null;

    /**
     * init
     */
    public init(data: xxgBuf.TurntableRet) {
        this.turntableData = data;
    }

    protected coreOnLoad() {
        this.setView();
    }

    /**
     * 设置界面文字
     */
    public setView() {
        this.phoneProgL.string = `兑换进度 <color=#FF6D0C>${this.turntableData.mobileFragment}</color>/100`;
        this.redBagProgL.string = `兑换进度 <color=#FF6D0C>${this.turntableData.redBagFragment}</color>/100`;
        this.phoneProg.progress = this.turntableData.mobileFragment / 100;
        this.redBagProg.progress = this.turntableData.redBagFragment / 100;
        this.timeL.string = "" + this.turntableData.turnTableNum;
    }

    /**
     * 关闭按钮回调
     * @param event
     * @param customerData
     */
    private closeBtnCallback(event: cc.Event, customerData: string) {
        if (this.status == TurnState.STAND_BY) {
            this.coreCloseView();
        }
    }

    /**
     * 开始按钮回调
     * @param event
     * @param customerData
     */
    private async startBtnCallback(event: cc.Event, customerData: string) {
        if (this.status == TurnState.STAND_BY) {
            if (this.turntableData.turnTableNum > 0) {
                let rewardData = await Core.webSockets.send<xxgBuf.ITurnRet>("TurnReq", new xxgBuf.TurnReq({}));
                // let rewardData = {
                //     prizeId: Math.floor(Math.random() * 8) + 1,
                // };
                if (rewardData) {
                    let angleT = AngleList[rewardData.prizeId - 1] - this.turntableNode.angle;
                    this.turntableData.mobileFragment = rewardData.mobileFragment;
                    this.turntableData.redBagFragment = rewardData.redBagFragment;
                    UserInfoService.currentGoldCoin = rewardData.totalGold;
                    this.turntableData.turnTableNum = rewardData.turnTableNum;
                    this.timeL.string = "" + this.turntableData.turnTableNum;

                    if (angleT >= 0) {
                        angleT = angleT - 360;
                        if (angleT > -180) {
                            angleT = angleT - 360;
                        }
                    }

                    this.status = TurnState.RUN;
                    cc.tween(this.turntableNode)
                        .by(1, { angle: -360 }, { easing: "cubicIn" })
                        .by(1.5, { angle: -720 - 180 })
                        .by((angleT / -45) * 0.4 + 0.5, { angle: angleT - 180 }, { easing: "cubicOut" })
                        .call(() => {
                            console.log(rewardData.prizeId);
                            this.turntableNode.angle = AngleList[rewardData.prizeId - 1];
                            console.log(this.turntableNode.angle);
                            console.log(this.turntableNode.rotation);

                            let rewardObj: RewardObject = <RewardObject>{};
                            if (rewardData.rewardType == 1) {
                                rewardObj.type = RewardViewType.FRAGMENTS_REWARD;
                            } else if (rewardData.rewardType == 2) {
                                rewardObj.type = RewardViewType.PHONE_REWARD;
                            } else if (rewardData.rewardType == 3) {
                                rewardObj.type = RewardViewType.GOLD_REWARD;
                            }
                            rewardObj.msg = rewardData.rewardNum;
                            rewardObj.gainConfirm = () => {
                                this.status = TurnState.STAND_BY;
                                this.setView();
                            };
                            GameCore.openRewardView(rewardObj);
                        })
                        .start();
                }
            } else {
                PromptService.prompt("剩余次数不足");
            }
        }
    }

    /**
     * 记录按钮回调
     * @param event
     * @param customerData
     */
    private async recordBtnCallback(event: cc.Event, customerData: string) {
        if (this.status == TurnState.STAND_BY) {
            let topRewardData = await Core.webSockets.send<xxgBuf.IGrandPrizeRecordRet>(
                "GrandPrizeRecordReq",
                new xxgBuf.GrandPrizeRecordReq({})
            );

            let myRewardData = await Core.webSockets.send<xxgBuf.IPersonalRecordRet>(
                "PersonalRecordReq",
                new xxgBuf.PersonalRecordReq({})
            );
            if (topRewardData && myRewardData) {
                Core.viewManager.openView(R.TurntableHistoryView, {
                    topRewardData: topRewardData,
                    myRewardData: myRewardData,
                });
            }
        }
    }

    /**
     * 规则按钮回调
     * @param event
     * @param customerData
     */
    private ruleBtnCallback(event: cc.Event, customerData: string) {
        if (this.status == TurnState.STAND_BY) {
            Core.viewManager.openView(R.TurntableRuleView);
        }
    }

    protected coreOnDestroy() {
        UserInfoService.turntable = this.turntableData.turnTableNum;
    }

    /**
     * 错误处理
     */
    @Core.code(CodeMap.TURN_ERROR)
    private errorHandle(code: CodeMap) {
        let str = "";
        switch (code) {
            case CodeMap.TURN_RECEIVE_ERROR:
                str = "剩余次数不足";
                break;
            default:
                break;
        }
        PromptService.prompt(str + `(${code})`);
    }
}
