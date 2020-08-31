const { ccclass, property } = cc._decorator;

@ccclass
export default class PromptLogic extends Core.ViewLogic {
    public style: number = Core.EViewStyle.NO_FULL;

    /** 文字 */
    private textStr: string = "";

    /** 回调 */
    private callback: Function = null;

    @property(cc.Label)
    private strL: cc.Label = null;

    @property(cc.Layout)
    public box: cc.Layout = null;

    /**
     * 初始化
     * @param str 需要显示的文本
     * @param endCallback 结束回调
     */
    public init(data: { promptStr: string; endCallback: Function }) {
        this.textStr = data.promptStr;
        this.callback = data.endCallback;
    }

    public showPrompt() {
        this.strL.string = this.textStr;
        this.box.updateLayout();

        this.node.opacity = 0;
        this.node.runAction(
            cc.sequence(
                cc.fadeIn(0.5),
                cc.delayTime(0.5),
                cc.fadeOut(0.2),
                cc.callFunc(() => {
                    this.callback();
                })
            )
        );
    }
}
