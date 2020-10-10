const { ccclass, property } = cc._decorator;

@ccclass
export default class WithdrawRecordListItem extends Core.ComponentLogic {
    @property(cc.Label)
    time: cc.Label = null;
    @property(cc.Label)
    amount: cc.Label = null;
    @property(cc.Label)
    status: cc.Label = null;

    public setData(data: xxgBuf.IApplyInfo): void {
        this.time.string =
            Core.CommonFun.getYearMonthDay(Number(data.applyTime)) +
            " " +
            Core.CommonFun.getWhenMinuteSecond(Number(data.applyTime));
        this.amount.string = (data.balance / 100).toFixed(2);

        if (data.status === 0) {
            this.status.string = "成功";
            this.status.node.color = new cc.Color().fromHEX("#77D75D");
        } else if (data.status === 1) {
            this.status.string = "失败";
            this.status.node.color = new cc.Color().fromHEX("#FF6D6D");
        } else if (data.status === 2) {
            this.status.string = "处理中";
            this.status.node.color = new cc.Color().fromHEX("#FF8707");
        }
    }
}
