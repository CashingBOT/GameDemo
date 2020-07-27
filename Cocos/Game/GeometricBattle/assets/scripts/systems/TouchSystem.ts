import DataManager from "../managers/DataManager";
import EventManager from "../managers/EventManager";

const { ccclass } = cc._decorator;

@ccclass
export default class TouchSystem extends cc.Component {
    /******************** Scope values ********************/

    private readonly SPEED: number = 1000;

    private time: number = null;

    private distance: number = null;

    private deltaX: number = null;

    private deltaY: number = null;

    private touchPos: cc.Vec2 = null;

    private isStart: boolean = false;

    private isMove: boolean = false;

    private isRotate: boolean = false;

    /******************** Live callbacks ********************/

    protected onEnable(): void {
        if (!this.node.hasEventListener(cc.Node.EventType.TOUCH_START)) {
            this.node.on(cc.Node.EventType.TOUCH_START, () => {
                this.scheduleOnce(this.emitMsg, 0.1);
            });
        }

        if (!this.node.hasEventListener(cc.Node.EventType.TOUCH_MOVE)) {
            this.node.on(cc.Node.EventType.TOUCH_MOVE, (event: cc.Touch) => {
                if (event.getDelta().x !== 0 && event.getDelta().y !== 0) {
                    this.unschedule(this.emitMsg);
                    this.calcParam(event);
                    this.isStart = true;
                    DataManager.moveLock === false ? (this.isMove = true) : (this.isMove = false);
                    this.isRotate = true;
                }
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
                this.isStart = false;
                this.isMove = false;
                this.isRotate = false;
            });
        }
    }

    protected update(dt: number): void {
        if (!this.isStart) return;

        let deltaX = DataManager.player.x - this.touchPos.x;

        let deltaY = DataManager.player.y - this.touchPos.y;

        if (this.isMove) this.move(dt, deltaX, deltaY);

        if (this.isRotate) this.rotate(deltaX, deltaY);
    }

    /******************** Logics ********************/

    private emitMsg(): void {
        EventManager.emitSystemEvent(EventManager.MOVE_OFF);
    }

    private calcParam(event: cc.Touch): void {
        let playerWorldPos = DataManager.player.parent.convertToWorldSpaceAR(DataManager.player.position);
        this.touchPos = DataManager.player.parent.convertToNodeSpaceAR(event.getLocation());
        this.deltaX = event.getLocationX() - playerWorldPos.x;
        this.deltaY = event.getLocationY() - playerWorldPos.y;
        this.distance = Math.sqrt(Math.pow(this.deltaX, 2) + Math.pow(this.deltaY, 2));
        this.time = this.distance / this.SPEED;
    }

    private move(dt: number, deltaX, deltaY): void {
        let absX = Math.abs(deltaX);
        let absY = Math.abs(deltaY);
        let totalFrame = this.time / dt;
        let frameX = this.deltaX / totalFrame;
        let frameY = this.deltaY / totalFrame;
        DataManager.player.x += frameX;
        DataManager.player.y += frameY;
        if (absX <= 10 && absY <= 10) {
            this.isMove = false;
            DataManager.player.x = this.touchPos.x;
            DataManager.player.y = this.touchPos.y;
        }
    }

    private rotate(deltaX, deltaY): void {
        let radian = Math.atan2(deltaY, deltaX);
        let degree = cc.misc.radiansToDegrees(radian);
        degree += 90;
        DataManager.player.angle = degree;
    }
}
