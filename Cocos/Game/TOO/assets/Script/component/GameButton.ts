import R from "../R";

const { ccclass, property, menu, disallowMultiple, requireComponent } = cc._decorator;

/**
 * 按钮组件
 * @example
 * 直接挂到组件上面即可
 * 默认播放按钮音效 => 可指定播放对应音效
 */
@ccclass
@menu("游戏组件/Button")
@requireComponent(cc.Button)
@disallowMultiple
export default class GameButton extends Core.ComponentLogic {
    /** 音频资源 */
    @property({
        type: cc.AudioClip,
        tooltip: "指定播放的音频资源路径,未指定就播放默认音效",
    })
    sound: cc.AudioClip = null;

    /** 防止连续点击 => 默认300毫秒 */
    @property({
        type: cc.Integer,
        range: [0, 1000],
        tooltip: "防止连续点击 => 默认300毫秒",
        slide: true,
    })
    private clickInterval: number = 300;

    @Core.module(Core.Audio)
    private audio: Core.Audio = null;

    @Core.module(Core.Timer)
    private timer: Core.Timer = null;

    /** 可点击 */
    private clickable: boolean = true;

    coreOnEnable() {
        let btn = this.node.getComponent(cc.Button);
        let btnClickEvents = btn.clickEvents;
        this.node.on("click", () => {
            if (this.clickInterval && this.clickable) {
                if (this.sound) {
                    this.audio.playSound(this.sound);
                } else {
                    this.audio.playSound(R.Mp3_onclick);
                }
                btn.clickEvents = [];
                this.clickable = false;
                this.timer.setTimeout(this.clickInterval).promise.then(() => {
                    btn.clickEvents = btnClickEvents;
                    this.clickable = true;
                });
            }
        });
    }
}
