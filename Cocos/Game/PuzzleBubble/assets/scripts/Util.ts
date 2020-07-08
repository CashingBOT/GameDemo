/******************
 * Utilities
 * Creator: Resol
 * ************** */

const { ccclass, property } = cc._decorator;

@ccclass
export default class Util extends cc.Component {
    public static readonly SCREEN_W: number = 720;

    public static readonly BUBBLE_R: number = 40;

    public static readonly BUBBLE_Y: number = 40 * Math.sqrt(3);

    public static setRanNum(max: number, min: number): number {
        return min + Math.floor((max - min + 1) * Math.random());
    }

    public static convertMatrixToPos(row: number, col: number): cc.Vec2 {
        let screenH: number = cc.view.getVisibleSize().height;
        if (screenH > 1300) screenH = screenH - 75;
        let posX: number = this.BUBBLE_R * 2 * col + this.BUBBLE_R * (row % 2 + 1);
        let posY: number = screenH - (this.BUBBLE_R + this.BUBBLE_Y * row);
        return cc.v2(posX, posY);
    }

    public static convertPosToMatrix(posX: number, posY: number): { row, col; } {
        let screenH: number = cc.view.getVisibleSize().height;
        let row: number = Math.round((screenH - posY - this.BUBBLE_R) / this.BUBBLE_Y);
        let col: number = Math.round((posX - this.BUBBLE_R * (row % 2 + 1)) / (this.BUBBLE_R * 2));
        return {
            row: row,
            col: col
        };
    }
}