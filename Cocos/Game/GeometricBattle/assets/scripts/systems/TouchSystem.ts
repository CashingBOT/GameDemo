import EventManager from "../managers/EventManager";
import DataManager from "../managers/DataManager";

const { ccclass } = cc._decorator;

@ccclass
export default class TouchSystem extends cc.Component {
    /******************** Scope values ********************/

    private readonly SPEED: number = 1000;

    private isMove: boolean = false;

    private distance: number = null;

    private time: number = null;

    private deltaX: number = null;

    private deltaY: number = null;

    private touchPos: cc.Vec2 = null;

    /******************** Live callbacks ********************/

    protected onEnable(): void {
        if (!this.node.hasEventListener(cc.Node.EventType.TOUCH_START)) {
            this.node.on(cc.Node.EventType.TOUCH_START, () => {
                this.scheduleOnce(this.emitMsg, 0.1);
            });
        }

        if (!this.node.hasEventListener(cc.Node.EventType.TOUCH_MOVE)) {
            this.node.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Touch) => {
                this.unschedule(this.emitMsg);
                this.isMove = true;
                this.calcMove(event);
            });
        }

        if (!this.node.hasEventListener(cc.Node.EventType.TOUCH_CANCEL)) {
            this.node.on(cc.Node.EventType.TOUCH_CANCEL, () => {
                EventManager.emitSystemEvent(EventManager.MOVE_ON);
                this.unschedule(this.emitMsg);
            });
        }

        if (!this.node.hasEventListener(cc.Node.EventType.TOUCH_END)) {
            this.node.on(cc.Node.EventType.TOUCH_END, () => {
                EventManager.emitSystemEvent(EventManager.MOVE_ON);
                this.unschedule(this.emitMsg);
                this.isMove = false;
            });
        }
    }

    protected onDisable(): void {
        this.node.off(cc.Node.EventType.TOUCH_MOVE);
    }

    protected update(dt): void {
        if (this.isMove) {
            let deltaX = DataManager.player.x - this.touchPos.x;
            let deltaY = DataManager.player.y - this.touchPos.y;
            let absX = Math.abs(deltaX);
            let absY = Math.abs(deltaY);
            let radian = Math.atan2(deltaY, deltaX);
            let degree = cc.misc.radiansToDegrees(radian);
            degree += 90;
            DataManager.player.angle = degree;
            let totalFrame = this.time / dt;
            let frameX = this.deltaX / totalFrame;
            let frameY = this.deltaY / totalFrame;
            DataManager.player.x += frameX;
            DataManager.player.y += frameY;
            if (absX <= 10 && absY <= 10) {
                DataManager.player.x = this.touchPos.x;
                DataManager.player.y = this.touchPos.y;
                this.isMove = false;
            }
        }
    }

    /******************** Logics ********************/

    private emitMsg(): void {
        EventManager.emitSystemEvent(EventManager.MOVE_OFF);
    }

    private calcMove(event: cc.Touch): void {
        let playerWorldPos = DataManager.player.parent.convertToWorldSpaceAR(DataManager.player.position);
        this.touchPos = DataManager.player.parent.convertToNodeSpaceAR(event.getLocation());
        this.deltaX = event.getLocationX() - playerWorldPos.x;
        this.deltaY = event.getLocationY() - playerWorldPos.y;
        this.distance = Math.sqrt(Math.pow(this.deltaX, 2) + Math.pow(this.deltaY, 2));
        this.time = this.distance / this.SPEED;
    }
}
