import R from "../R";
import { INVITATION_EVENT, RewardType } from "../Game/service/EventMapService";
import { RewardObject, RewardViewType } from "../View/RewardLogic";
import { GameCore } from "../Game/GameCore";
import { UserInfoService } from "../Game/service/UserInfoService";
import { ShareType } from "../View/ShareLogic";
import { CodeMap } from "../Game/Map/CodeMap";
import { PromptService } from "../Game/service/PromptService";
import { Utils } from "../Game/game-lib/Utils";

const { ccclass, property } = cc._decorator;

export const enum InvitationStatus {
    // 0可领取
    GET = 0,
    // 1提示升级
    REMIND_UP = 1,
    // 2提示提现
    REMIND_WD = 2,
    // 3已领取
    GOT = 3,
}

/**
 * 摊位组件逻辑
 */
@ccclass
export default class InviteInfoItem extends Core.ComponentLogic {
    /** 任玩家据 */
    public playerData: xxgBuf.IInvitationFriend = null;

    /** 普通背景 */
    @property(cc.Node)
    private normalBg: cc.Node = null;

    /** 选中背景 */
    @property(cc.Node)
    private selectBg: cc.Node = null;

    /** 玩家头像 */
    @property(cc.Sprite)
    private headSp: cc.Sprite = null;

    /** 玩家名字 */
    @property(cc.Label)
    private nameL: cc.Label = null;

    /** 玩家等级 */
    @property(cc.Label)
    private levelL: cc.Label = null;

    /** 奖励 */
    @property(cc.RichText)
    private rewardL: cc.RichText = null;

    /** 已完成图标 */
    @property(cc.Node)
    public gotSp: cc.Node = null;

    /** 提醒升级按钮 */
    @property(cc.Node)
    public remindUpBtn: cc.Node = null;

    /** 提醒提现按钮 */
    @property(cc.Node)
    public remindWDBtn: cc.Node = null;

    /** 领奖按钮 */
    @property(cc.Node)
    public getBtn: cc.Node = null;

    @Core.module(Core.Res)
    private res: Core.Res = null;

    /**
     * 设置数据
     */
    public async setData(data: xxgBuf.IInvitationFriend) {
        this.playerData = data;

        this.normalBg.active = this.playerData.status != InvitationStatus.GOT;
        this.selectBg.active = this.playerData.status == InvitationStatus.GOT;
        this.nameL.string = Utils.omitStr(this.playerData.nickname, 8);
        this.levelL.string = `摊主${this.playerData.level}级`;
        this.rewardL.string = `<b>${this.playerData.money * 100}</b>`;
        this.updateStatus();
        if (this.playerData.headPortrait && this.playerData.headPortrait.indexOf("http") !== -1) {
            if (this.playerData.headPortrait.indexOf("jpg") === -1) {
                this.playerData.headPortrait += "?.jpg";
            }
            let texture: cc.Texture2D = await this.res.loadExternal(this.playerData.headPortrait);
            this.headSp.spriteFrame = new cc.SpriteFrame(texture);
        }
    }

    private updateStatus() {
        this.gotSp.active = this.playerData.status == InvitationStatus.GOT;
        this.getBtn.active = this.playerData.status == InvitationStatus.GET;
        this.remindUpBtn.active = this.playerData.status == InvitationStatus.REMIND_UP;
        this.remindWDBtn.active = this.playerData.status == InvitationStatus.REMIND_WD;
    }

    /**
     * 提醒升级按钮回调
     */
    public remindUpBtnCallback() {
        Core.viewManager.openView(R.ShareView, ShareType.REMIND);
    }

    /**
     * 提醒提现按钮回调
     */
    public remindWDBtnCallback() {
        Core.viewManager.openView(R.ShareView, ShareType.REMIND);
    }

    /**
     * 领奖按钮回调
     */
    public async getBtnCallback() {
        let rewardData = await Core.webSockets.send<xxgBuf.IMyReceiveRet>(
            "MyReceiveReq",
            new xxgBuf.MyReceiveReq({
                id: this.playerData.id,
            })
        );
        if (rewardData) {
            let rewardObj: RewardObject = <RewardObject>{};
            if (rewardData.rewardType == RewardType.GOLD) {
                rewardObj.type = RewardViewType.GOLD_REWARD;
                rewardObj.msg = rewardData.balance;
                UserInfoService.currentGoldCoin = rewardData.totalBalance;
            } else {
                rewardObj.type = RewardViewType.RED_REWARD;
                rewardObj.msg = rewardData.balance * 100;
                UserInfoService.redBag = rewardData.totalBalance * 100;
            }
            GameCore.openRewardView(rewardObj);

            this.playerData.status = InvitationStatus.GOT;
            this.updateStatus();
            Core.eventManager.event(INVITATION_EVENT.GET);
        }
    }
}
