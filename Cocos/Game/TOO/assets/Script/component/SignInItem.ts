import R from "../R";

const { ccclass, property } = cc._decorator;

const DayStr = {
    "1": "第一天",
    "2": "第二天",
    "3": "第三天",
    "4": "第四天",
    "5": "第五天",
    "6": "第六天",
    "7": "第七天",
};

export const enum SignStatus {
    // 0可领取
    GET = 0,
    // 1不可领取
    WAIT = 1,
    // 2已领取
    GOT = 2,
}

@ccclass
export default class SignInItem extends Core.ComponentLogic {
    /** 签到数据 */
    public signInData: xxgBuf.IDailyDetails = null;

    /** 奖励资源图  0金币 1红包 */
    @property([cc.SpriteFrame])
    public rewardSFList: cc.SpriteFrame[] = [];

    /** 普通背景 */
    @property(cc.Node)
    public normalBg: cc.Node = null;

    /** 选中背景 */
    @property(cc.Node)
    public selectBg: cc.Node = null;

    /** 天数标题 */
    @property(cc.Label)
    public dayTitleL: cc.Label = null;

    /** 奖励图标 */
    @property(cc.Sprite)
    public rewardSp: cc.Sprite = null;

    /** 金币描述 */
    @property(cc.Label)
    public goldDescL: cc.Label = null;

    /** 红包描述 */
    @property(cc.Label)
    public giftDescL: cc.Label = null;

    /** 待领取 */
    @property(cc.Node)
    public waitSp: cc.Node = null;

    /** 已领取 */
    @property(cc.Node)
    public gotSp: cc.Node = null;

    /** 可领取按钮 */
    @property(cc.Node)
    public getBtn: cc.Node = null;

    /** 红包特殊显示 */
    @property(cc.Layout)
    public giftDescBox: cc.Layout = null;

    /** 红包特殊数字 */
    @property(cc.Label)
    public giftNumL: cc.Label = null;

    /** 光环node */
    @property(cc.Node)
    public haloNode: cc.Node = null;

    /** 领取动画节点 */
    @property(cc.Node)
    public gotAnimNode: cc.Node = null;

    /**
     * 设置数据
     * @param data
     * @param curDay
     */
    public setData(data: xxgBuf.IDailyDetails, curDay: number) {
        this.signInData = data;

        if (data.gold && data.gold > 0) {
            this.rewardSp.spriteFrame = this.rewardSFList[0];
            this.goldDescL.string = `x${data.gold}`;
            this.giftDescL.string = "";
        } else {
            this.rewardSp.spriteFrame = this.rewardSFList[1];
            if (this.giftDescBox) {
                this.giftDescL.string = `爱心最高`;
                this.goldDescL.string = ``;
                this.giftNumL.string = `${data.redBag / 100}`;
                this.giftDescBox.updateLayout();
            } else {
                this.goldDescL.string = ``;
                this.giftDescL.string = `爱心最高${data.redBag / 100}万`;
            }
        }

        this.updateStatus();

        this.normalBg.active = false;
        this.selectBg.active = false;
        this.haloNode.active = false;
        this.dayTitleL.string = DayStr[data.dayNum];
        if (data.dayNum == curDay) {
            this.dayTitleL.string = "当天";
            this.selectBg.active = true;
            this.haloNode.active = true;
        } else {
            this.normalBg.active = true;
        }
    }

    /**
     * 更新状态
     */
    public updateStatus() {
        this.waitSp.active = this.signInData.status == SignStatus.WAIT;
        this.getBtn.active = this.signInData.status == SignStatus.GET;
        this.gotSp.active = this.signInData.status == SignStatus.GOT;
    }

    /**
     * 播放领取特效
     */
    public playGotAnim() {
        this.waitSp.active = false;
        this.getBtn.active = false;
        this.gotSp.active = false;

        this.gotAnimNode.active = true;
        let sk = this.gotAnimNode.getComponent(sp.Skeleton);
        sk.animation = "animation";
        sk.setCompleteListener(() => {
            this.gotAnimNode.active = false;
            this.updateStatus();
        });
    }
}
