/******************
 * Jelly Item Controller
 * Creator: Resol
 * ************** */
import GlobalData from "./GlobalData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemControl extends cc.Component {
    private _otherItem: cc.Node;
    private _otherInitPos: cc.Vec2;
    private _selfX: number;
    private _selfY: number;
    private _otherX: number;
    private _otherY: number;
    private _deltX: number;

    onLoad() {
        this._setTouchEvent();
    }

    onCollisionEnter(other, self) {
        this._otherItem = other.node;
        this._otherInitPos = other.node.position;
        this._otherX = other.node.position.x;
        this._otherY = other.node.position.y;
        this._selfX = self.node.position.x;
        this._selfY = self.node.position.y;
    }

    onCollisionStay(other, self) {
        if (this._selfX != self.node.position.x || this._selfY != self.node.position.y) {
            console.log(other.node.position);
        }
    }

    private _setTouchEvent() {
        this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
            let initPos = this.node.position;
            let zIndex = this.node.zIndex;

            // Allowed movement direction
            let isX = true;
            let isY = true;

            this.node.on('touchmove', (t: cc.Touch) => {
                this.node.zIndex = 1000;

                if (t.getDelta().x && isX) { // Only X axis available
                    isY = false;
                    this.node.x += t.getDelta().x;
                    if (Math.abs(Math.abs(this.node.x) + initPos.x) >= 80) {
                        isX = false;
                    }
                    if (initPos.x < -40 && initPos.x > -120) { // Avoid the 7th row positive and negative conversion, left to right
                        if (this.node.x >= 0) {
                            this.node.x = 0;
                        }
                    }
                    if (this.node.x >= 40) { // Make sure the items in the board
                        this.node.x = 40;
                    }
                    if (this.node.x <= -600) { // Make sure the items in the board
                        this.node.x = -600;
                    }
                }

                if (t.getDelta().y && isY) { // Only Y axis available
                    isX = false;
                    this.node.y += t.getDelta().y;
                    if (Math.abs(Math.abs(this.node.y) - initPos.y) >= 80) {
                        isY = false;
                    }
                    if (initPos.y < 120 && initPos.y > 40) { // Avoid the 2nd col positive and negative conversion, bottom to top
                        if (this.node.y <= 0) {
                            this.node.y = 0;
                        }
                    }
                    if (this.node.y <= -30) { // Make sure the items in the board
                        this.node.y = -30;
                    }
                    if (this.node.y >= 745) { // Make sure the items in the board
                        this.node.y = 745;
                    }
                }
            }, this);

            this.node.on('touchend', () => {
                this.node.zIndex = zIndex;
                isX = true;
                isY = true;
                this.node.runAction(cc.moveTo(0.5, initPos).easing(cc.easeElasticOut(0.5)));
            }, this);

            this.node.on('touchcancel', () => {
                this.node.zIndex = zIndex;
                isX = true;
                isY = true;
                this.node.runAction(cc.moveTo(0.5, initPos).easing(cc.easeElasticOut(0.5)));
            }, this);
        })))
    }
}