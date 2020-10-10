const { ccclass, property } = cc._decorator;

@ccclass
export default class WithdrawDetailListItem extends Core.ComponentLogic {
    @property(cc.Label)
    type: cc.Label = null;
    @property(cc.Label)
    time: cc.Label = null;
    @property(cc.Label)
    amount: cc.Label = null;

    public setData(data: xxgBuf.IRedBag): void {
        this.type.string = data.operatorName;
        this.time.string =
            Core.CommonFun.getYearMonthDay(Number(data.redBagTime)) +
            " " +
            Core.CommonFun.getWhenMinuteSecond(Number(data.redBagTime));
        this.amount.string = (data.balance >= 0 ? "+" : "") + data.balance * 100;
        this.amount.node.color =
            data.balance >= 0 ? new cc.Color().fromHEX("#FF6D6E") : new cc.Color().fromHEX("#77D85D");
    }
}
