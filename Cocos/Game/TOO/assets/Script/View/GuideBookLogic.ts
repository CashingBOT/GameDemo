import R from "../R";

const { ccclass, property } = cc._decorator;

/**
 * 摊主图鉴
 */
@ccclass
export default class GuideBookLogic extends Core.ViewLogic {
    style = Core.EViewStyle.FULL;

    @Core.module(Core.Audio)
    private audio: Core.Audio | null = null;
    /** 摊主数量节点列表 */
    @property([cc.Label])
    private count: cc.Label[] = [];

    /** 数据 */
    private data: xxgBuf.StallIllustratedRet = null;

    init(d: xxgBuf.StallIllustratedRet) {
        this.data = d;
    }

    coreOnLoad() {
        this.data.illustrated.forEach((e) => {
            this.count[Number(e.stallOwner.match(/\d+/g)[0]) - 1].string = (e.recruit ? e.recruit : 0) + "";
        });
    }

    coreStart() {}

    private closeView() {
        this.audio.playSound(R.Mp3_menuclose);
        this.coreCloseView();
    }
}
