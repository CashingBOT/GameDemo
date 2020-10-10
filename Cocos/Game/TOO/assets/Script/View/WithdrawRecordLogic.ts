import WithdrawRecordListItem from "../component/WithdrawRecordListItem";
import ListView from "../component/ListView";

const { ccclass, property } = cc._decorator;

/**
 * 提现记录
 */
@ccclass
export class WithdrawRecordLogic extends Core.ViewLogic {
    @property(ListView)
    private list: ListView = null;

    private data: xxgBuf.IApplyInfo[] = [];

    public init(d: xxgBuf.WithdrawalRecordRet): void {
        this.data = d.applyInfo;
        this.list.items = this.data.length;
    }

    protected recordListRender(item: cc.Node, idx: number): void {
        let component = item.getComponent(WithdrawRecordListItem);
        component.setData(this.data[idx]);
    }
}
