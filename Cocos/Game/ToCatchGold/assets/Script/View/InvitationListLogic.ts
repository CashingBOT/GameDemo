import ListView from "../component/ListView";
import InviteInfoItem from "../component/InviteInfoItem";
import { INVITATION_EVENT } from "../Game/service/EventMapService";
import { CodeMap } from "../Game/Map/CodeMap";
import { PromptService } from "../Game/service/PromptService";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InvitationListLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.FULL;

    /** 邀请数据 */
    public inviteData: xxgBuf.IMyInvitationRet = null;

    /** list 组件 */
    @property(ListView)
    private listView: ListView = null;

    /** 邀请总数 */
    @property(cc.RichText)
    private countL: cc.RichText = null;

    public init(data: xxgBuf.IMyInvitationRet) {
        this.inviteData = data;

        // //假数据
        // this.inviteData = <xxgBuf.IMyInvitationRet>{};
        // this.inviteData.invFriend = [];
        // for (let index = 0; index < 6; index++) {
        //     let data = <xxgBuf.InvitationFriend>{};
        //     data.level = index + 1;
        //     data.money = 200;
        //     data.nickname = "sds" + index;
        //     data.status = index % 3;
        //     this.inviteData.invFriend.push(data);
        // }
    }

    protected coreOnLoad() {
        this.countL.string = `<b>我已经邀请<size=36><color=#FF6D0C> ${this.inviteData.invFriend.length} </c></size>人</b>`;
        this.listView.items = this.inviteData.invFriend.length;
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
     * 刷新人数
     */
    @Core.event(INVITATION_EVENT.GET)
    public refresh() {}

    public renderList(item: cc.Node, idx: number) {
        let component = item.getComponent(InviteInfoItem);
        component.setData(this.inviteData.invFriend[idx]);
    }
}
