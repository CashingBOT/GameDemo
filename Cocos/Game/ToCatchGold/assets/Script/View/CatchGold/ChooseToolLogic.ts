import { CatchGoldData, ToolType, CatchGoldMap } from "./CatchGoldInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ChooseToolView extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.NO_FULL;

    @property(cc.Label)
    private lbDescribe: cc.Label = null;

    @property(cc.Button)
    private btnConfirm: cc.Button = null;

    @property([cc.Node])
    private nodeListTools: cc.Node[] = [];

    protected coreOnLoad(): void {
        this.setClickEvent();
    }

    private setClickEvent(): void {
        this.nodeListTools.forEach((node, idx) => {
            node.on("click", () => {
                if (!this.btnConfirm.interactable) this.btnConfirm.interactable = true;
                CatchGoldData.toolType = idx;
                if (idx === ToolType.BIG) this.lbDescribe.string = "【大箩筐】：移动速度慢，接取范围大";
                if (idx === ToolType.SMALL) this.lbDescribe.string = "【小萝筐】：标准的移动速度和接取范围";
                if (idx === ToolType.IRON)
                    this.lbDescribe.string = "【铁箩筐】：被秤砣砸中时的惩罚金额降低，但倒地时间延长";
                node.getChildByName("bg").color = cc.Color.YELLOW;
                let nodeArr = [...this.nodeListTools];
                nodeArr.splice(idx, 1);
                nodeArr.forEach((v) => (v.getChildByName("bg").color = cc.Color.WHITE));
            });
        });
    }

    private onClickConfirm(): void {
        switch (CatchGoldData.toolType) {
            case ToolType.BIG:
                CatchGoldData.playerSpeed *= 0.7;
                CatchGoldData.playerCatchRange *= 1.2;
                CatchGoldData.penaltyLoss *= 0.5;
                CatchGoldData.penaltyComa = 1;
                break;
            case ToolType.SMALL:
                CatchGoldData.playerSpeed *= 1;
                CatchGoldData.playerCatchRange *= 1;
                CatchGoldData.penaltyLoss *= 0.5;
                CatchGoldData.penaltyComa = 1;
                break;
            case ToolType.IRON:
                CatchGoldData.playerSpeed *= 1;
                CatchGoldData.playerCatchRange *= 0.9;
                CatchGoldData.penaltyLoss *= 0.35;
                CatchGoldData.penaltyComa = 3;
                break;
        }
        Core.eventManager.event(CatchGoldMap.GAME_START);
        this.coreCloseView();
    }

    private onClickClose(): void {
        Core.eventManager.event(CatchGoldMap.GAME_CLOSE);
        this.coreCloseView();
    }
}
