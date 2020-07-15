import EventManager from "../managers/EventManager";

const { ccclass } = cc._decorator;

@ccclass
export default class TouchSystem extends cc.Component {
    /******************** Live callbacks ********************/

    protected onEnable(): void {
        if (!this.node.hasEventListener(cc.Node.EventType.TOUCH_START)) {
            this.node.on(cc.Node.EventType.TOUCH_START, () => {
                this.scheduleOnce(this.emitMsg, 0.1);
            });
        }

        if (!this.node.hasEventListener(cc.Node.EventType.TOUCH_MOVE)) {
            this.node.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Touch) => {
                this.node.position = cc.v3(this.node.x + event.getDelta().x, this.node.y + event.getDelta().y);
                this.unschedule(this.emitMsg);
            });
        }

        if (!this.node.hasEventListener(cc.Node.EventType.TOUCH_CANCEL)) {
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
                EventManager.emitSystemEvent(EventManager.TOUCH_ON, this.node);
                this.unschedule(this.emitMsg);
            });
        }

        if (!this.node.hasEventListener(cc.Node.EventType.TOUCH_END)) {
            this.node.on(cc.Node.EventType.TOUCH_END, () => {
                EventManager.emitSystemEvent(EventManager.TOUCH_ON, this.node);
                this.unschedule(this.emitMsg);
            });
        }
    }

    protected onDisable(): void {
        this.node.off(cc.Node.EventType.TOUCH_MOVE);
    }

    /******************** Logic ********************/

    private emitMsg(): void {
        EventManager.emitSystemEvent(EventManager.TOUCH_OFF, this.node);
    }
}
