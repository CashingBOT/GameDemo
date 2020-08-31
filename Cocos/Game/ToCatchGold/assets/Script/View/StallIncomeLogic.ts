const { ccclass, property } = cc._decorator;

/**
 * 摊位收入
 */
@ccclass
export class StallIncomeLogic extends Core.ViewLogic {
    init(data) {}

    coreOnLoad() {}

    coreOnEnable() {}

    /**
     * 关闭弹窗
     */
    private close() {
        // if (this.data?.cancel) {
        // 	this.data?.cancel();
        // }
    }
}
