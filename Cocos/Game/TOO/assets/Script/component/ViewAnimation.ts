const { ccclass, property, menu, disallowMultiple, executionOrder } = cc._decorator;

@ccclass("ClosedEvent")
class ClosedEvent {
    @property({
        type: cc.Component.EventHandler,
        tooltip: "关闭界面动画播放完成后回调（可选）",
    })
    closed: cc.Component.EventHandler = new cc.Component.EventHandler();
}

/**
 * 界面打开关闭特效
 * @example
 * 直接挂到指定的界面根节点上即可
 * 界面关闭以后节点不会被清除掉，需要手动在closed里面绑定方法主动关闭
 */
@ccclass
@menu("游戏组件/ViewAnimation")
@disallowMultiple
@executionOrder(-1)
export default class ViewAnimation extends cc.Component {
    /** 打开界面动画播放完成后回调（可选） */
    @property({
        type: [cc.Component.EventHandler],
        tooltip: "打开界面动画播放完成后回调（可选）",
    })
    private opened: cc.Component.EventHandler[] = [];

    /** 关闭界面动画播放完成后回调（可选） */
    @property({
        type: [cc.Component.EventHandler],
        tooltip: "关闭界面动画播放完成后回调（可选）",
    })
    private closed: cc.Component.EventHandler[] = [];

    /** opened call function */
    private openedCallFunction: Function = null;

    /** 内容层 */
    @property({
        type: cc.Node,
        tooltip: "播放缩放的层",
    })
    private contentNode: cc.Node | null = null;

    start() {
        //TODO scale 和 widget组件会冲突貌似
        this.node.opacity = 0;
        this.contentNode?.setScale(0);
        this.scheduleOnce(() => {
            cc.tween(this.node)
                .to(0.2, { opacity: 255 })
                .call(() => {
                    //TODO这里需要优化，父节点的0.2秒动画和下面的动画时间不同步，只是为了更好的效果
                    cc.Component.EventHandler.emitEvents(this.opened);
                    if (this.openedCallFunction) {
                        this.openedCallFunction();
                    }
                })
                .start();
            if (this.contentNode) {
                cc.tween(this.contentNode).to(0.4, { scale: 1 }, { easing: "backOut" }).start();
            }
        });
    }

    /**
     * 打开界面动画后回调
     * @param call 打开界面播放动画后的回调
     */
    openedCall(call: Function) {
        this.openedCallFunction = call;
    }

    /**
     * 关闭界面动画
     */
    closeViewAnimation(): Promise<null> {
        return new Promise((resolve) => {
            cc.tween(this.node)
                .to(0.3, { opacity: 0 })
                .call(() => {
                    resolve();
                    if (this.closed.length) {
                        //会先触发上面的resolve然后再执行closed里面的方法
                        cc.Component.EventHandler.emitEvents(this.closed);
                    } else {
                        this.scheduleOnce(() => {
                            if (this.node.isValid) {
                                cc.error(
                                    "closed 方法绑定不能为空，需要在closed关闭的时候主动绑定界面的CoreCloseView方法"
                                );
                                this.node.active = false;
                            }
                        });
                    }
                })
                .start();

            if (this.contentNode) {
                cc.tween(this.contentNode).to(0.3, { scale: 0 }, { easing: "backIn" }).start();
            }
        });
    }
}
