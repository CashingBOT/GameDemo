import { CatchGoldData } from "./CatchGoldInfo";

const { ccclass, property, menu, disallowMultiple } = cc._decorator;

@ccclass
@menu("游戏组件/Joystick")
@disallowMultiple
export default class Joystick extends cc.Component {
    @property({
        type: cc.Integer,
        tooltip: "半径",
    })
    private readonly R: number = 0;

    /** 操控对象 */
    @property({
        type: cc.Node,
        tooltip: "操控对象",
    })
    private operator: cc.Node = null;

    /** 摇杆 */
    @property({
        type: cc.Node,
        tooltip: "摇杆",
    })
    private stick: cc.Node = null;

    /** 平面 */
    @property({
        type: cc.Node,
        tooltip: "平面",
    })
    private flat: cc.Node = null;

    /** 默认摇杆图片 */
    @property({
        type: cc.SpriteFrame,
        tooltip: "默认摇杆图片",
    })
    private spriteFrameDefaultStick: cc.SpriteFrame = null;

    /** 默认平面图片 */
    @property({
        type: cc.SpriteFrame,
        tooltip: "默认平面图片",
    })
    private spriteFrameDefaultFlat: cc.SpriteFrame = null;

    /** 按压摇杆图片 */
    @property({
        type: cc.SpriteFrame,
        tooltip: "按压摇杆图片",
    })
    private spriteFramePressStick: cc.SpriteFrame = null;

    /** 按压平面图片 */
    @property({
        type: cc.SpriteFrame,
        tooltip: "按压平面图片",
    })
    private spriteFramePressFlat: cc.SpriteFrame = null;

    private isMove: boolean = false;

    private sin: number = null;

    private cos: number = null;

    protected onLoad(): void {
        this.setTouchEvent();
    }

    protected update(): void {
        if (!this.isMove) return;
        this.operator.x += this.sin * CatchGoldData.playerSpeed;
        this.operator.y += this.cos * CatchGoldData.playerSpeed;
    }

    private setTouchEvent(): void {
        this.stick.on(cc.Node.EventType.TOUCH_MOVE, (e: cc.Event.EventTouch) => {
            this.stick.getComponent(cc.Sprite).spriteFrame = this.spriteFramePressStick;
            this.flat.getComponent(cc.Sprite).spriteFrame = this.spriteFramePressFlat;
            if (e.getDelta().x == 0 && e.getDelta().y == 0) return;
            let pos = this.stick.parent.convertToNodeSpaceAR(e.getLocation());
            let distance = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.y, 2));
            let radian = Math.atan2(pos.y, pos.x) - Math.PI / 2;
            if (distance >= this.R) {
                this.stick.x = -Math.sin(radian) * this.R;
                this.stick.y = Math.cos(radian) * this.R;
                this.sin = -Math.sin(radian);
                this.cos = Math.cos(radian);
                this.isMove = true;
                if (e.getDelta().x > 0 && -Math.sin(radian) > 0) this.operator.scaleX = -1;
                if (e.getDelta().x < 0 && -Math.sin(radian) < 0) this.operator.scaleX = 1;
            } else {
                this.stick.x = -Math.sin(radian) * distance;
                this.stick.y = Math.cos(radian) * distance;
                this.isMove = false;
            }
        });

        this.stick.on(cc.Node.EventType.TOUCH_CANCEL, () => {
            this.stick.getComponent(cc.Sprite).spriteFrame = this.spriteFrameDefaultStick;
            this.flat.getComponent(cc.Sprite).spriteFrame = this.spriteFrameDefaultFlat;
            cc.tween(this.stick).to(0.1, { position: cc.v3() }).start();
            this.isMove = false;
        });

        this.stick.on(cc.Node.EventType.TOUCH_END, () => {
            this.stick.getComponent(cc.Sprite).spriteFrame = this.spriteFrameDefaultStick;
            this.flat.getComponent(cc.Sprite).spriteFrame = this.spriteFrameDefaultFlat;
            cc.tween(this.stick).to(0.1, { position: cc.v3() }).start();
            this.isMove = false;
        });
    }
}
