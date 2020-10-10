import { UserInfoService, UserType } from "../Game/service/UserInfoService";
import { GameCore } from "../Game/GameCore";
import ViewAnimation from "../component/ViewAnimation";
import R from "../R";
import { MapLocalStorage, MapGlobalEvent, MenuButtonId, MapHttpApi } from "../Game/service/EventMapService";
import { GameService } from "../Game/service/GameService";
import { PromptService } from "../Game/service/PromptService";
import { PopupType } from "./SysPopupLogic";
import { Utils } from "../Game/game-lib/Utils";
import ListView from "../component/ListView";
import TurntableHistoryItem from "../component/TurntableHistoryItem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TurntableHistoryLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.NO_FULL;

    /** 大奖记录数据 */
    private topRewardData: xxgBuf.IGrandPrizeRecordRet = null;

    /** 个人记录数据 */
    private myRewardData: xxgBuf.IPersonalRecordRet = null;

    /** 大奖记录按钮 */
    @property(cc.Button)
    public topRewardBtn: cc.Button = null;

    /** 个人记录按钮 */
    @property(cc.Button)
    public myRewardBtn: cc.Button = null;

    /** 大奖列表 */
    @property(ListView)
    public topListView: ListView = null;

    /** 个人列表 */
    @property(ListView)
    public myListView: ListView = null;

    public init(data: { topRewardData: xxgBuf.IGrandPrizeRecordRet; myRewardData: xxgBuf.IPersonalRecordRet }) {
        this.topRewardData = data.topRewardData;
        this.myRewardData = data.myRewardData;
        this.topListView.items = this.topRewardData.rewardRecord.length;
        this.myListView.items = this.myRewardData.rewardRecord.length;
        this.topRewardBtnCallback();
    }

    protected async coreOnLoad() {}

    /**
     * 大奖按钮回调
     * @param event
     * @param customerData
     */
    public async topRewardBtnCallback(event?: cc.Event, customerData?: string) {
        this.topListView.node.active = true;
        this.myListView.node.active = false;
        this.topRewardBtn.interactable = false;
        this.myRewardBtn.interactable = true;
    }

    /**
     * 个人按钮回调
     * @param event
     * @param customerData
     */
    public async myRewardBtnCallback(event?: cc.Event, customerData?: string) {
        this.topListView.node.active = false;
        this.myListView.node.active = true;
        this.topRewardBtn.interactable = true;
        this.myRewardBtn.interactable = false;
        // if (!this.myRewardData) {
        // if (this.myRewardData) {
        // this.myListView.items = this.myRewardData.rewardRecord.length;
        // this.myListView.refreshData();
        // }
        // }
    }

    /**
     * 大奖列表render
     * @param item
     * @param idx
     */
    public renderTopList(item: cc.Node, idx: number) {
        let component = item.getComponent(TurntableHistoryItem);
        component.setData(this.topRewardData.rewardRecord[idx]);
    }

    /**
     * 个人列表render
     * @param item
     * @param idx
     */
    public renderMyList(item: cc.Node, idx: number) {
        let component = item.getComponent(TurntableHistoryItem);
        component.setData(this.myRewardData.rewardRecord[idx]);
    }

    /**
     * 关闭按钮回调
     * @param event
     * @param customerData
     */
    public async closeBtnCallback(event?: cc.Event, customerData?: string) {
        await this.getComponent(ViewAnimation).closeViewAnimation();
        this.coreCloseView();
    }
}
