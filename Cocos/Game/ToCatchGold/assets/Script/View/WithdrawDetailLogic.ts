import WithdrawDetailListItem from "../component/WithdrawDetailListItem";
import ListView from "../component/ListView";

const { ccclass, property } = cc._decorator;

/**
 * 提现记录
 */
@ccclass
export class WithdrawDetailLogic extends Core.ViewLogic {
    @property(ListView)
    private list: ListView = null;

    private data: xxgBuf.IRedBag[] = [];

    public init(d: xxgBuf.RedBagDetailsRet): void {
        this.data = d.repeatedList;
        this.list.items = this.data.length;
    }

    protected detailListRender(item: cc.Node, idx: number): void {
        let component = item.getComponent(WithdrawDetailListItem);
        component.setData(this.data[idx]);
    }
}
