import R from "../R";
import { RewardType, DAILY_EVENT } from "../Game/service/EventMapService";
import { GameCore } from "../Game/GameCore";
import { RewardObject, RewardViewType } from "../View/RewardLogic";
import { UserInfoService } from "../Game/service/UserInfoService";

const { ccclass, property } = cc._decorator;

export const enum DailyTaskStatus {
    // 0可领取
    GET = 0,
    // 1不可领取
    GO = 1,
    // 2已领取
    GOT = 2,
}

/** 0揽客 1看视频 2参与游戏 3开启宝箱 4吆喝 */
const TaskIconType = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 2,
};

@ccclass
export default class DailyTaskItem extends Core.ComponentLogic {
    /** 任务数据 */
    public taskData: xxgBuf.ITaskInfo = null;

    /** 任务icon图集 0揽客 1看视频 2参与游戏 3开启宝箱 4吆喝 */
    @property([cc.SpriteFrame])
    public taskIconSFList: cc.SpriteFrame[] = [];

    /** 奖励资源图集  1金币 2红包 3转盘*/
    @property([cc.SpriteFrame])
    public rewardIconSFList: cc.SpriteFrame[] = [];

    /** 任务图标 */
    @property(cc.Sprite)
    public taskIconSp: cc.Sprite = null;

    /** 奖励图标 */
    @property(cc.Sprite)
    public rewardIconSp: cc.Sprite = null;

    /** 任务描述 */
    @property(cc.RichText)
    public taskDescL: cc.RichText = null;

    /** 任务完成情况 */
    @property(cc.RichText)
    public taskNumL: cc.RichText = null;

    /** 已完成图标 */
    @property(cc.Node)
    public gotSp: cc.Node = null;

    /** 前往按钮 */
    @property(cc.Node)
    public goBtn: cc.Node = null;

    /** 领奖按钮 */
    @property(cc.Node)
    public getBtn: cc.Node = null;

    /**
     * 设置数据
     * @param data
     * @param curDay
     */
    public setData(data: xxgBuf.ITaskInfo) {
        this.taskData = data;

        this.taskIconSp.spriteFrame = this.taskIconSFList[TaskIconType[data.taskType]];

        this.rewardIconSp.spriteFrame = this.rewardIconSFList[data.rewardType];
        this.taskDescL.string = `<b>${data.taskDesc}(<color=#FF6D0C>${
            data.actualNum > data.rule ? data.rule : data.actualNum
        }</color>/${data.rule})</b>`;

        let rewardStr = "";
        switch (data.rewardType) {
            case RewardType.GOLD:
                rewardStr = `<b>x${data.balance}</b>`;
                break;
            case RewardType.REDBAG:
                rewardStr = `<b>最高10元</b>`;
                break;
            case RewardType.CORONA:
                rewardStr = `<b>x${data.balance}</b>`;
                break;

            default:
                break;
        }
        this.taskNumL.string = rewardStr;
        this.updateStatus();
    }

    private updateStatus() {
        this.gotSp.active = this.taskData.status == DailyTaskStatus.GOT;
        this.getBtn.active = this.taskData.status == DailyTaskStatus.GET;
        this.goBtn.active = this.taskData.status == DailyTaskStatus.GO;
    }

    /**
     * 前往按钮回调
     */
    public goBtnCallback() {
        Core.viewManager.closeView();
    }

    /**
     * 领奖按钮回调
     */
    public async getBtnCallback() {
        let taskRecData = await Core.webSockets.send<xxgBuf.IDayReceiveRet>(
            "DayReceiveReq",
            new xxgBuf.DayReceiveReq({
                taskId: this.taskData.taskId,
            })
        );

        if (taskRecData) {
            this.taskData.status = DailyTaskStatus.GOT;
            // this.updateStatus();
            Core.eventManager.event(DAILY_EVENT.REFRESH);
            let rewardObj: RewardObject = <RewardObject>{};
            if (taskRecData.rewardType == RewardType.GOLD) {
                rewardObj.type = RewardViewType.GOLD_REWARD;
                rewardObj.msg = taskRecData.balance;
                UserInfoService.currentGoldCoin = taskRecData.totalBalance;
            } else {
                rewardObj.type = RewardViewType.RED_REWARD;
                rewardObj.msg = taskRecData.balance / 100;
                UserInfoService.redBag = taskRecData.totalBalance / 100;
            }
            GameCore.openRewardView(rewardObj);
        }
    }
}
