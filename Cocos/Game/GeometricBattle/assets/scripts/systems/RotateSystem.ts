const { ccclass } = cc._decorator;

@ccclass
export default class RotateSystem extends cc.Component {
    private preX: number = null;

    private preY: number = null;

    private isStart: boolean = false;

    private isMove: boolean = false;

    protected start() {
        this.node.addComponent(cc.Button);
        this.node.on("click", () => {
            this.isStart = true;
        });
    }

    protected update(): void {
        if (!this.isStart) return;
        if (this.preX !== null && this.preY !== null && this.isMove) {
            let deltaX = this.node.x - this.preX;
            let deltaY = this.node.y - this.preY;
            this.isMove = false;
            let radian = Math.atan2(deltaY, deltaX);
            let degree = cc.misc.radiansToDegrees(radian);
            degree -= 90;
            this.node.angle = degree;
        }
        if (this.node.x !== this.preX && this.node.y !== this.preY) {
            this.preX = this.node.x;
            this.preY = this.node.y;
            this.isMove = true;
        }
    }
}
1;
