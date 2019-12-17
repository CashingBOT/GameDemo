/******************
 * Jelly Item Controller
 * Creator: Resol
 * ************** */
import GlobalData from "./GlobalData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemControl extends cc.Component {
    onLoad() {
        this._setTouchEvent();
    }

    private _setTouchEvent() {
        this.node.parent.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
            let initPos = this.node.parent.position;

            let isX = true;
            let isY = true;

            this.node.parent.on('touchmove', (t: cc.Touch) => {
                this.node.parent.zIndex = 10;

                if (t.getDelta().x && isX) { // Only X axis available
                    isY = false;
                    this.node.parent.x += t.getDelta().x;
                    if (Math.abs(Math.abs(this.node.parent.x) + initPos.x) >= 80) {
                        isX = false;
                    }
                    if (initPos.x < -40 && initPos.x > -120) { // Avoid positive and negative conversion
                        if (this.node.parent.x >= 0) {
                            isX = false;
                        }
                    }
                }
                if (t.getDelta().y && isY) { // Only Y axis available
                    isX = false;
                    this.node.parent.y += t.getDelta().y;
                    if (Math.abs(Math.abs(this.node.parent.y) - initPos.y) >= 80) {
                        isY = false;
                    }
                }
            }, this);

            this.node.parent.on('touchend', () => {
                this.node.parent.zIndex = 1;
                isX = true;
                isY = true;
                this.node.parent.runAction(cc.moveTo(0.5, initPos).easing(cc.easeElasticOut(0.5)));
            }, this);

            this.node.parent.on('touchcancel', () => {
                this.node.parent.zIndex = 1;
                isX = true;
                isY = true;
                this.node.parent.runAction(cc.moveTo(0.5, initPos).easing(cc.easeElasticOut(0.5)));
            }, this);
        })))
    }
}