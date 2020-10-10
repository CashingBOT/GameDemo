import { Utils } from "../Game/game-lib/Utils";

const { ccclass, property } = cc._decorator;

const SourceDesc = { 1: "获得", 2: "兑换" };

const RewardDesc = {
    1: { 1: "100万爱心碎片", 2: "华为p40碎片", 3: "金币" },
    2: { 1: "100万爱心", 2: "华为p40碎片" },
};

/**
 * 摊位组件逻辑
 */
@ccclass
export default class TurntableHistoryItem extends Core.ComponentLogic {
    /** 任玩家据 */
    public recordData: xxgBuf.IRewardRecord = null;

    /** 玩家名字 */
    @property(cc.Label)
    private nameL: cc.Label = null;

    /** 时间 */
    @property(cc.Label)
    private timeL: cc.Label = null;

    /** 奖励内容 */
    @property(cc.Label)
    private rewardL: cc.Label = null;

    @Core.module(Core.Res)
    private res: Core.Res = null;

    /**
     * 设置数据
     */
    public async setData(data: xxgBuf.IRewardRecord) {
        this.recordData = data;
        this.nameL.string = `玩家  ${Utils.omitStr(this.recordData.nickname, 8)}`;
        this.timeL.string = `于${this.recordData.receiveTime}`;
        this.rewardL.string = `${SourceDesc[this.recordData.sourceType]}${
            RewardDesc[this.recordData.sourceType][this.recordData.rewardType]
        }*${this.recordData.num}`;
    }
}
