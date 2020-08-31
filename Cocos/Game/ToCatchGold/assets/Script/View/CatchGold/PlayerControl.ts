import { CatchGoldData } from "./CatchGoldInfo";

const { ccclass } = cc._decorator;

@ccclass
export default class PlayerControl extends Core.ViewLogic {
    private borderX: number = null;

    private borderY: number = null;

    protected coreOnLoad(): void {
        this.setMoveBorder();
    }

    protected coreUpdate(): void {
        this.judgeMoveBorder();
    }

    private setMoveBorder(): void {
        this.borderX = this.node.parent.width / 2 - this.node.width / 2;
        this.borderY = this.node.parent.height / 2;
    }

    private judgeMoveBorder(): void {
        if (this.node.x >= this.borderX) this.node.x = this.borderX;
        if (this.node.x <= -this.borderX) this.node.x = -this.borderX;
        if (this.node.y >= this.borderY) this.node.y = this.borderY;
        if (this.node.y <= -this.borderY) this.node.y = -this.borderY;
    }
}
