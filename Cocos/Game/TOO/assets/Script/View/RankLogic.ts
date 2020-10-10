import R from "../R";
import { ShareType } from "./ShareLogic";
import RankItem from "../component/RankItem";
import ListView from "../component/ListView";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.FULL;

    /** 分红数据 */
    private rankData: xxgBuf.IRankingRet = null;

    @property([RankItem])
    public topRankList: RankItem[] = [];

    /** 我的排行 */
    @property(RankItem)
    public myRankItem: RankItem = null;

    /** list 组件 */
    @property(ListView)
    private listView: ListView = null;

    @Core.module(Core.Res)
    private res: Core.Res = null;

    /**
     * init
     */
    public init(data: xxgBuf.IRankingRet) {
        this.rankData = data;
    }

    protected coreStart() {
        this.setTopView();
        this.myRankItem.setData(this.rankData.userRank);
        this.listView.items = this.rankData.userList.length - 3;
    }

    protected coreOnEnable() {}

    /**
     * 排行榜顶级视图
     */
    private setTopView() {
        for (let index = 0; index < 3; index++) {
            const topRankItem = this.topRankList[index];
            let rankData = this.rankData.userList[index];
            topRankItem.setData(rankData);
        }
    }

    /**
     * 列表render
     * @param item
     * @param idx
     */
    public renderList(item: cc.Node, idx: number) {
        let component = item.getComponent(RankItem);
        component.setData(this.rankData.userList[idx + 3]);
    }

    /**
     * 关闭按钮回调
     * @param event
     * @param customerData
     */
    private closeBtnCallback(event: cc.Event, customerData: string) {
        this.coreCloseView();
    }

    /**
     * 邀请按钮回调
     * @param event
     * @param customerData
     */
    private inviteBtnCallback(event: cc.Event, customerData: string) {
        Core.viewManager.openView(R.ShareView, ShareType.RANKING);
    }
}
