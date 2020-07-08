/******************
 * Touch manger
 * Creator: Resol
 * ************** */

import { EVENT } from './Interface';

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    private _shooter: cc.Node = null;

    public start(): void {
        this._shooter = this.node.parent.getChildByName('shooter');

        this.node.parent.on('touchstart', this._onStart, this);
        this.node.parent.on('touchmove', this._onMove, this);
        this.node.parent.on('touchend', this._onEnd, this);
        this.node.parent.on('touchcancel', this._onCancel, this);
    }

    public onDestroy(): void {
        this.node.parent.off('touchstart', this._onStart, this);
        this.node.parent.off('touchmove', this._onMove, this);
        this.node.parent.off('touchend', this._onEnd, this);
        this.node.parent.off('touchcancel', this._onCancel, this);
    }

    private _onStart(e: cc.Event.EventTouch): void {
        let d = this._convertDegree(e);
        this._shooter.angle = d;
    }

    private _onMove(e: cc.Event.EventTouch): void {
        let d = this._convertDegree(e);
        this._shooter.angle = d;
    }

    private _onEnd(e: cc.Event.EventTouch): void {
        let d = this._convertDegree(e);
        this._shooter.angle = d;
        cc.director.emit(EVENT.TOUCH_END_SHOOT, d);
    }

    private _onCancel(e: cc.Event.EventTouch): void {
        let d = this._convertDegree(e);
        this._shooter.angle = d;
        cc.director.emit(EVENT.TOUCH_END_SHOOT, d);
    }

    private _convertDegree(e: cc.Event.EventTouch): number {
        let fingerPos: cc.Vec2 = e.getLocation();
        let x = fingerPos.x - this._shooter.x;
        let y = fingerPos.y - this._shooter.y;
        let radian: number = Math.atan2(y, x);
        let degree: number = cc.misc.radiansToDegrees(radian);
        degree -= 90;
        degree = degree <= -80 && degree >= -180 ? -80 : degree;
        degree = degree >= 80 || degree < -180 ? 80 : degree;
        return degree;
    }
}
