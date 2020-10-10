import { RewardObject, RewardViewType } from "./RewardLogic";
import { GameCore } from "../Game/GameCore";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BindingGiftView extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.NO_FULL;

    /** 红包金额 */
    public redNum: number = 0;

    public init(redNum) {
        this.redNum = redNum;
    }

    protected coreOnLoad() {}

    /**
     * 关闭按钮回调
     * @param event
     * @param customerData
     */
    private closeBtnCallback(event: cc.Event, customerData: string) {
        this.coreCloseView();
        let rewardObj: RewardObject = <RewardObject>{};
        rewardObj.type = RewardViewType.RED_REWARD;
        rewardObj.msg = this.redNum * 100;
        GameCore.openRewardView(rewardObj);
    }
}
