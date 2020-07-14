const { ccclass } = cc._decorator;

@ccclass
export default class TouchSystem extends cc.Component {
    protected onEnable(): void {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Touch) => {
            this.node.position = cc.v3(this.node.x + event.getDelta().x, this.node.y + event.getDelta().y);
        });
    }

    protected onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_MOVE);
    }

    protected onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_MOVE);
    }
}
