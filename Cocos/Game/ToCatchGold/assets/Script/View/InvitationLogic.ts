import R from "../R";
import { PromptService } from "../Game/service/PromptService";
import { GameCore } from "../Game/GameCore";
import { InvitationStatus } from "../component/InviteInfoItem";
import { MenuButtonId, INVITATION_EVENT } from "../Game/service/EventMapService";
import { ShareType } from "./ShareLogic";
import { UserInfoService } from "../Game/service/UserInfoService";
import { GameService } from "../Game/service/GameService";

const { ccclass, property } = cc._decorator;

@ccclass
export default class InvitationLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.FULL;

    /** 邀请数据 */
    private invData: xxgBuf.IInvitationRet = null;

    /** 我的邀请数据 */
    private myInvData: xxgBuf.IMyInvitationRet = null;

    /** 累计邀请 */
    @property(cc.Label)
    public friendNumL: cc.Label = null;

    /** 待激活 */
    @property(cc.Label)
    public disableNumL: cc.Label = null;

    /** 累计收入 */
    @property(cc.Label)
    public incomeNumL: cc.Label = null;

    /** 累计收入box */
    @property(cc.Layout)
    public incomeBox: cc.Layout = null;

    /** 邀请码 */
    @property(cc.Label)
    public inviteCodeL: cc.Label = null;

    /**
     * init
     */
    public init(data: { invData: xxgBuf.IInvitationRet; myInvData: xxgBuf.IMyInvitationRet }) {
        this.invData = data.invData;
        this.myInvData = data.myInvData;
        UserInfoService.invitationCode = this.invData.invitationCode;
    }

    protected coreOnLoad() {
        this.setViewData();
    }

    protected coreOnEnable() {
        let redFlag = false;
        for (let index = 0; index < this.myInvData.invFriend.length; index++) {
            const friendInfo = this.myInvData.invFriend[index];
            if (friendInfo.status == InvitationStatus.GET) {
                redFlag = true;
                break;
            }
        }
        GameCore.setPoint(MenuButtonId.INVITE_REWARD, redFlag);
    }

    /**
     * 设置界面
     */
    private setViewData() {
        this.incomeNumL.string = "" + this.invData.incomeSum / 100;
        this.friendNumL.string = "" + this.invData.friendSum;
        this.disableNumL.string = "" + this.invData.nonactivated;
        this.inviteCodeL.string = this.invData.invitationCode;
        this.incomeBox.updateLayout();
    }

    /**
     * 领奖完后刷新数据
     */
    @Core.event(INVITATION_EVENT.GET)
    public async refresh() {
        let invDataNet = await Core.webSockets.send<xxgBuf.IInvitationRet>(
            "InvitationReq",
            new xxgBuf.InvitationReq({})
        );
        this.invData = invDataNet;
        this.setViewData();
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
     * 复制邀请码按钮回调
     * @param event
     * @param customerData
     */
    private async copyBtnCallback(event: cc.Event, customerData: string) {
        await GameService.strToClipboard(this.invData.invitationCode);
        PromptService.prompt("邀请码已复制");
    }

    /**
     * 邀请按钮回调
     * @param event
     * @param customerData
     */
    private inviteBtnCallback(event: cc.Event, customerData: string) {
        Core.viewManager.openView(R.ShareView, ShareType.INVITE);
    }

    /**
     * 邀请列表按钮回调
     * @param event
     * @param customerData
     */
    private listBtnCallback(event: cc.Event, customerData: string) {
        Core.viewManager.openView(R.InvitationListView, this.myInvData);
    }
}
