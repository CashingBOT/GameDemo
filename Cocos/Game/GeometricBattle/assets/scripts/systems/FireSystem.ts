import DataManager from "../managers/DataManager";

const { ccclass } = cc._decorator;

@ccclass
export default class FireSystem extends cc.Component {
    /******************** Scope values ********************/

    private readonly SHAPE = cc.Enum({
        TRIANGLE: "triangle",
    });

    private readonly INTERVAL: number = 0.1;

    private readonly SPEED: number = 1000;

    private readonly DISTANCE_LEVEL_1: number = 100;

    private readonly DISTANCE_LEVEL_2: number = 200;

    private readonly DISTANCE_LEVEL_3: number = 300;

    private nodeName: string = null;

    private nodeScaleX: number = null;

    private nodeScaleY: number = null;

    private nodeScale: number = null;

    private counter: number = 0;

    /******************** Live callbacks ********************/

    protected onEnable(): void {
        this.nodeName = this.node.name.replace("box_", "");

        this.nodeScaleX = this.node.scaleX;

        this.nodeScaleY = this.node.scaleY;

        this.nodeScale = this.nodeScaleX * this.nodeScaleY;

        this.startFire();
    }

    protected onDisable(): void {
        if (DataManager.fireLock) return;

        switch (this.nodeName) {
            case this.SHAPE.TRIANGLE:
                this.finishTri();
                break;
        }
    }

    /******************** Logics ********************/

    private startFire(): void {
        switch (this.nodeName) {
            case this.SHAPE.TRIANGLE:
                this.schedule(this.triangleSkill, this.INTERVAL, 20); // 0.1 * 20 = 2，实际总共3s
                break;
        }
    }

    private triangleSkill(): void {
        this.node.scaleY += 0.05;
        this.node.scaleX = this.nodeScale / this.node.scaleY;
        this.counter += this.INTERVAL;
    }

    private finishTri(): void {
        this.unschedule(this.triangleSkill);
        let distance = null;
        if (this.counter < 1) {
            distance = this.DISTANCE_LEVEL_1;
        } else if (this.counter >= 1 && this.counter < 2) {
            distance = this.DISTANCE_LEVEL_2;
        } else if (this.counter >= 2) {
            distance = this.DISTANCE_LEVEL_3;
        }
        let time = distance / this.SPEED;
        let radian = cc.misc.degreesToRadians(DataManager.player.angle);
        let deltaX = Math.sin(radian) * distance;
        let deltaY = Math.cos(radian) * distance;
        console.log("X     " + deltaX);
        console.log("Y     " + deltaY);
        cc.tween(this.node)
            .by(time, { position: cc.v2(deltaX, deltaY) })
            .start();
        this.node.scaleX = this.nodeScaleX;
        this.node.scaleY = this.nodeScaleY;
        this.counter = 0;
    }
}
