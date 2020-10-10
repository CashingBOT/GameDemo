import ViewAnimation from "../component/ViewAnimation";
import R from "../R";
import { GameCore } from "../Game/GameCore";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PrivacyLogic extends Core.ViewLogic {
    public style: number = Core.EViewStyle.NO_FULL;

    @property(cc.WebView)
    public webView: cc.WebView = null;

    @Core.module(Core.Res)
    res: Core.Res = null;

    /**
     * core
     */
    public async coreOnLoad() {
        if (GameCore.config.isReview) {
            this.webView.url = "https://btsh.17817.com/nprivacy.html";
        } else {
            this.webView.url = "https://btsh.17817.com/privacy.html";
        }
    }

    public async closeBtnCallback() {
        this.webView.node.active = false;
        await this.getComponent(ViewAnimation).closeViewAnimation();
        this.coreCloseView();
    }
}
