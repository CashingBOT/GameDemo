import EventManager from "../managers/EventManager";

const { ccclass } = cc._decorator;

@ccclass
export default class FireSystem extends cc.Component {
    /******************** Class scope value ********************/

    private Shape = cc.Enum({
        Triangle: "triangle",
    });

    private nodeName: string = null;

    private nodeScaleX: number = null;

    private nodeScaleY: number = null;

    private nodeScale: number = null;

    /******************** Live callbacks ********************/

    protected onEnable(): void {
        this.nodeName = this.node.name.replace("box_", "");

        this.nodeScaleX = this.node.scaleX;

        this.nodeScaleY = this.node.scaleY;

        this.nodeScale = this.nodeScaleX * this.nodeScaleY;

        this.onStart();
    }

    protected onDisable(): void {
        switch (this.nodeName) {
            case this.Shape.Triangle:
                this.unschedule(this.triangleSkill);
                this.node.scaleX = this.nodeScaleX;
                this.node.scaleY = this.nodeScaleY;
                break;
        }
    }

    /******************** Logic ********************/

    private onStart(): void {
        switch (this.nodeName) {
            case this.Shape.Triangle:
                this.schedule(this.triangleSkill, 0.1, 20);
                break;
        }
    }

    private triangleSkill(): void {
        this.node.scaleY += 0.05;
        this.node.scaleX = this.nodeScale / this.node.scaleY;
    }
}
