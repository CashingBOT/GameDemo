/******************
 * Jelly Item Controller
 * Creator: Resol
 * ************** */
import GlobalData from "./GlobalData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemControl extends cc.Component {
    private _zIndex: number;
    private _type: string;
    private _initPos: cc.Vec2;
    private _upItemPos: cc.Vec2;
    private _belowItemPos: cc.Vec2;
    private _leftItemPos: cc.Vec2;
    private _rightItemPos: cc.Vec2;
    private _isX: boolean = true; // Allow X axis movement
    private _isY: boolean = true; // Allow Y axis movement
    private _isDLocked: boolean = false; // When delta distance greater than a value, it'll be locked
    private _upLocked: boolean = false;
    private _belowLocked: boolean = false;
    private _leftLocked: boolean = false;
    private _rightLocked: boolean = false;

    onLoad() {
        this._setTouchEvent();
    }

    private _setTouchEvent() {
        this.node.parent.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => {
            this._zIndex = this.node.parent.zIndex;

            this._initPos = GlobalData.getJellyItemNodeLIst()[this._zIndex].position;

            //TODO change touch
            if (GlobalData.getJellyItemNodeLIst()[this._zIndex + 8]) {
                this._upItemPos = GlobalData.getJellyItemNodeLIst()[this._zIndex + 8].position;
            }
            if (Math.ceil(this._initPos.y / 80) == 9) {
                this._upLocked = true;
            }
            if (GlobalData.getJellyItemNodeLIst()[this._zIndex - 8]) {
                this._belowItemPos = GlobalData.getJellyItemNodeLIst()[this._zIndex - 8].position;
            }
            if (Math.ceil(this._initPos.y / 80) == 1) {
                this._belowLocked = true;
            }
            if (GlobalData.getJellyItemNodeLIst()[this._zIndex + 1]) {
                this._leftItemPos = GlobalData.getJellyItemNodeLIst()[this._zIndex + 1].position;
            }
            if (Math.ceil(Math.abs(this._initPos.x) / 80) == 7) {
                this._leftLocked = true;
            }
            if (GlobalData.getJellyItemNodeLIst()[this._zIndex - 1]) {
                this._rightItemPos = GlobalData.getJellyItemNodeLIst()[this._zIndex - 1].position;
            }
            if (Math.ceil(Math.abs(this._initPos.x) / 80) == 1) {
                this._rightLocked = true;
            }

            this.node.parent.on('touchstart', () => {
                this.node.parent.zIndex = 1000;
                cc.tween(this.node.parent)
                    .to(0.1, { scale: 1.2 })
                    .to(0.5, { scale: 1 }, { easing: 'elasticOut' })
                    .start();
            })

            this.node.parent.on('touchmove', (t: cc.Touch) => {

                if (t.getDelta().x && this._isX) { // Only X axis available
                    this._isY = false;

                    if (t.getDelta().x > 6 && !this._isDLocked && !this._rightLocked) {
                        this._isDLocked = true;
                        this._setPos(this._zIndex, this._rightItemPos, this._initPos);
                        this._setPos(this._zIndex - 1, this._initPos, this._rightItemPos);
                    }

                    if (t.getDelta().x < -6 && !this._isDLocked && !this._leftLocked) {
                        this._isDLocked = true;
                        this._setPos(this._zIndex, this._leftItemPos, this._initPos);
                        this._setPos(this._zIndex + 1, this._initPos, this._leftItemPos);
                    }
                }

                if (t.getDelta().y && this._isY) { // Only Y axis available
                    this._isX = false;

                    if (t.getDelta().y > 3 && !this._isDLocked && !this._upLocked) {
                        this._isDLocked = true;
                        this._setPos(this._zIndex, this._upItemPos, this._initPos);
                        this._setPos(this._zIndex + 8, this._initPos, this._upItemPos);
                    }

                    if (t.getDelta().y < -3 && !this._isDLocked && !this._belowLocked) {
                        this._isDLocked = true;
                        this._setPos(this._zIndex, this._belowItemPos, this._initPos);
                        this._setPos(this._zIndex - 8, this._initPos, this._belowItemPos);
                    }
                }
            }, this);

            this.node.parent.on('touchend', () => {
                this._setStatus();
            }, this);

            this.node.parent.on('touchcancel', () => {
                this._setStatus();
            }, this);
        })))
    }

    private _setPos(zIndex: number, altPos: cc.Vec2, initPos: cc.Vec2) {

        cc.tween(GlobalData.getJellyItemNodeLIst()[zIndex])
            .to(0.25, { position: altPos }, { easing: 'elasticOut' })
            .to(0.25, { position: initPos }, { easing: 'elasticOut' })
            .start();
    }

    private _setStatus() {
        this._isX = true;
        this._isY = true;
        this._isDLocked = false;
        this.node.parent.zIndex = this._zIndex;
        switch (this._type) {
            case 'up':
                break;
            case 'below':
                break;
            case 'left':
                break;
            case 'right':
                break;
        }
    }
}