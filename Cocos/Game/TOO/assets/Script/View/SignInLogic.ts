import SignInItem, { SignStatus } from "../component/SignInItem";
import { RewardObject, RewardViewType } from "./RewardLogic";
import { GameCore } from "../Game/GameCore";
import ViewAnimation from "../component/ViewAnimation";
import { UserInfoService } from "../Game/service/UserInfoService";
import { RedPointService, RedPointType } from "../Game/service/RedPointService";
import { CodeMap } from "../Game/Map/CodeMap";
import { PromptService } from "../Game/service/PromptService";
import { PopupType } from "./SysPopupLogic";
import { GameService } from "../Game/service/GameService";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SignInLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.NO_FULL;

    /** 签到数据 */
    public signData: xxgBuf.ISignInRet = null;

    /** 签到节点 */
    @property([SignInItem])
    public signInItemList: SignInItem[] = [];

    public init(data: xxgBuf.SignInRet) {
        this.signData = data;

        //假数据
        // this.signData = <xxgBuf.ISignInRet>{};
        // this.signData.dDetails = [];
        // this.signData.currentDay = 2;
        // for (let index = 0; index < 7; index++) {
        //     let data = <xxgBuf.IDailyDetails>{};
        //     data.dayNum = index + 1;
        //     if (data.dayNum < 2) {
        //         data.status = 2;
        //     } else if (data.dayNum == 2) {
        //         data.status = 0;
        //     } else {
        //         data.status = 1;
        //     }
        //     if (index % 2 == 0) {
        //         data.redBag = 1000;
        //     } else {
        //         data.gold = 1000000;
        //     }
        //     this.signData.dDetails.push(data);
        // }
    }

    protected coreOnLoad() {
        for (let index = 0; index < this.signData.dDetails.length; index++) {
            this.signInItemList[index].setData(this.signData.dDetails[index], this.signData.currentDay);
        }
    }

    /**
     * 领取按钮回调
     */
    public async getBtnCallback() {
        let signRecData = await Core.webSockets.send<xxgBuf.ISignInReceiveRet>(
            "SignInReceiveReq",
            new xxgBuf.SignInReceiveReq({})
        );

        if (signRecData) {
            let currentComponent: SignInItem = null;
            for (let index = 0; index < this.signData.dDetails.length; index++) {
                if (this.signData.dDetails[index].dayNum < signRecData.currentDay) {
                    this.signData.dDetails[index].status = SignStatus.GOT;
                    this.signInItemList[index].updateStatus();
                }
                if (this.signData.dDetails[index].dayNum == signRecData.currentDay) {
                    this.signData.dDetails[index].status = SignStatus.GOT;
                    currentComponent = this.signInItemList[index];
                }
                if (this.signData.dDetails[index].dayNum > signRecData.currentDay) {
                    this.signData.dDetails[index].status = SignStatus.WAIT;
                    this.signInItemList[index].updateStatus();
                }
            }

            let rewardObj: RewardObject = <RewardObject>{};
            if (signRecData.gold > 0) {
                rewardObj.type = RewardViewType.GOLD_REWARD;
                rewardObj.msg = signRecData.gold;
                UserInfoService.currentGoldCoin = signRecData.totalGold;
            } else {
                rewardObj.type = RewardViewType.RED_REWARD;
                rewardObj.msg = signRecData.redBag * 100;
                UserInfoService.redBag = signRecData.totalRedBag * 100;
            }
            rewardObj.gainConfirm = () => {
                currentComponent.playGotAnim();
            };
            GameCore.openRewardView(rewardObj);
        }
    }

    /**
     * 签到错误处理
     */
    @Core.code(CodeMap.SIGN_IN_IS_EXIST)
    private errorHandler(code) {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: `您已获得今日签到奖励，请明日再试(${code})`,
            confirm: () => {
                GameService.updateMain();
            },
            closeButtonShow: false,
        });
    }

    /**
     * 关闭按钮回调
     * @param event
     * @param customerData
     */
    private async closeBtnCallback(event: cc.Event, customerData: string) {
        await this.getComponent(ViewAnimation).closeViewAnimation();
        this.coreCloseView();
    }

    protected coreOnDestroy() {
        for (let index = 0; index < this.signData.dDetails.length; index++) {
            if (this.signData.dDetails[index].status == SignStatus.GET) return;
        }
        RedPointService.remove(RedPointType.singIn);
    }
}
