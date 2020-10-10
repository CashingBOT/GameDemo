import { GameCore } from "../Game/GameCore";
import { PopupType } from "./SysPopupLogic";

const { ccclass, property } = cc._decorator;
/**
 * 意见反馈
 */
@ccclass
export default class FeedbackLogic extends Core.ViewLogic {
    /** 输入框 */
    @property(cc.EditBox)
    private editBox: cc.EditBox = null;
    /** 确认按钮 */
    @property(cc.Button)
    private confirmButton: cc.Button = null;

    /**
     * 发送意见反馈
     */
    private submit() {
        Core.webSockets
            .send<xxgBuf.FeedBackRet>("FeedBackReq", new xxgBuf.FeedBackReq({ opinion: this.editBox.string }))
            .then((d) => {
                if (d) {
                    this.coreCloseView();
                    GameCore.openPopup({ type: PopupType.HINT, msg: "反馈成功！" });
                }
            });
    }

    /**
     * 输入反馈
     */
    private inputIng() {
        this.confirmButton.interactable = !!this.editBox.string.length;
    }

    private inputBegan() {
        this.editBox.placeholder = `请输入你的意见反馈,最多可输入300个字`;
    }

    private inputEnd() {
        this.editBox.placeholder = `请输入你的意见反馈\n最多可输入300个字`;
    }
}
