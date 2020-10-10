import R from "../R";
import ViewAnimation from "../component/ViewAnimation";
import { Utils } from "../Game/game-lib/Utils";
import { UserInfoService } from "../Game/service/UserInfoService";

const { ccclass, property } = cc._decorator;

/**
 * 至尊摊主记录
 */
@ccclass("DividendItem")
class DividendItem {
    /** 描述 */
    @property(cc.RichText)
    public descL: cc.RichText = null;

    /** 时间戳 */
    @property(cc.Label)
    public timeStampL: cc.Label = null;
}

@ccclass
export default class DividendLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.NO_FULL;

    /** 分红数据 */
    private divData: xxgBuf.IDividendRet = null;

    /** 广告 昨日收益 */
    @property(cc.Label)
    public adIncomeYNumL: cc.Label = null;

    /** 广告 历史收益 */
    @property(cc.Label)
    public adIncomeHNumL: cc.Label = null;

    /** 摊主分红 历史收益 */
    @property(cc.Label)
    public divIncomeYNumL: cc.Label = null;

    /** 摊主分红 全网总数 */
    @property(cc.RichText)
    public totalNumL: cc.RichText = null;

    /** 摊主分红 今日产出 */
    @property(cc.RichText)
    public hasOutputNumL: cc.RichText = null;

    /** 摊主分红 今日待产出 */
    @property(cc.RichText)
    public hasNotOutputNumL: cc.RichText = null;

    /** 摊主分红 今日待产出 */
    @property([DividendItem])
    public itemList: DividendItem[] = [];

    /**
     * init
     */
    public init(data: xxgBuf.IDividendRet) {
        this.divData = data;
    }

    protected coreOnLoad() {
        this.adIncomeHNumL.string = "" + this.divData.adIncomeH / 100;
        this.adIncomeYNumL.string = "" + this.divData.adIncomeY / 100;

        this.divIncomeYNumL.string = "" + this.divData.stallIncomeY / 100;
        UserInfoService.todayProfit = this.divData.stallIncomeY * 100;

        this.totalNumL.string = `<outline color=#c33410 size=2><b>${this.divData.totalNum}</b></outline>`;
        this.hasOutputNumL.string = `<outline color=#c33410 size=2><b>${this.divData.hasOutput}</b></outline>`;
        this.hasNotOutputNumL.string = `<outline color=#c33410 size=2><b>${this.divData.hasNotOutput}</b></outline>`;

        for (let index = 0; index < 5; index++) {
            let item: DividendItem = this.itemList[index];
            let data: xxgBuf.IExtremeStall = this.divData.stallList[index];
            if (data) {
                item.descL.node.active = true;
                item.descL.string = `恭喜<color=#ff891b>${data.name}</color>获得至尊摊主!`;
                item.timeStampL.node.active = true;
                let date = new Date(data.timestamp);
                let hh = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
                let mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
                item.timeStampL.string = hh + mm;
            }
        }
    }

    protected coreOnEnable() {}

    /**
     * 关闭按钮回调
     * @param event
     * @param customerData
     */
    private async closeBtnCallback(event?: cc.Event, customerData?: string) {
        await this.getComponent(ViewAnimation).closeViewAnimation();
        this.coreCloseView();
    }
}
