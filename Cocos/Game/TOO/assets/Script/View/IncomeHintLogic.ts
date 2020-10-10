import { GameCore } from "../Game/GameCore";
import { PopupType } from "./SysPopupLogic";
import { RewardViewType } from "./RewardLogic";
import { GameService, SDKAdType } from "../Game/service/GameService";

const { ccclass, property } = cc._decorator;
/**
 * 摊位收入加速提示弹窗
 */
@ccclass
export class IncomeHintLogic extends Core.ViewLogic {
    /** 加速按钮 */
    @property(cc.Button)
    private confirmButton: cc.Button = null;
    /**提示次数文本 */
    @property(cc.Label)
    private hintLb: cc.Label = null;
    /** 内容文本 */
    @property(cc.Label)
    private contentLb: cc.Label = null;
    /** 次数 */
    private data: { times: number; call: { (): void }; time: number };

    init(data) {
        this.data = data;
    }

    coreStart() {
        this.confirmButton.interactable = !!this.data.times;
        this.hintLb.string = `今日剩余次数：${this.data.times}次`;
        this.contentLb.string = `是否观看视频获得${this.data.time / 60}分钟的加速时间？`;
    }

    /**
     * 确认事件
     */
    confirm() {
        let call = this.data.call;
        GameService.playAd(SDKAdType.NORMAL).then(() => {
            setTimeout(() => {
                if (call) {
                    call();
                }
                call = null;
            }, 2);
        });
    }
}
