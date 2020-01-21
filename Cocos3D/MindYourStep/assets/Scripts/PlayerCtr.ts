import { _decorator, Component, Node, Vec3, v3, systemEvent, EventMouse, SystemEvent, AnimationComponent } from "cc";
const { ccclass, property } = _decorator;

@ccclass("PlayerCtr")
export class PlayerCtr extends Component {
    @property({ type: AnimationComponent })
    BodyAnim: AnimationComponent = null;

    private _startJump: boolean = false;
    private _jumpStep: number = 0;
    private _curJumpTime: number = 0;
    private _jumpTime: number = 0.1;
    private _curJumpSpeed: number = 0;
    private _curPos: Vec3 = v3();
    private _deltaPos: Vec3 = v3(0, 0, 0);
    private _targetPos: Vec3 = v3();
    private _isMoving = false;

    start() {
        systemEvent.on(SystemEvent.EventType.MOUSE_UP, this.onMouseUp, this);
    }

    update(dt) {
        if (this._startJump) {
            this._curJumpTime += dt;
            if (this._curJumpTime > this._jumpTime) {
                // this.node.setPosition(this._targetPos);
                this._startJump = false;
                this.onOnceJumpEnd();
            } else {
                this.node.getPosition(this._curPos);
                this._deltaPos.x = this._curJumpSpeed * dt;
                Vec3.add(this._curPos, this._curPos, this._deltaPos);
                this.node.setPosition(this._curPos);
            }
        }
    }

    onMouseUp(event: EventMouse) {
        if (event.getButton() === 0) {
            this.jumpByStep(1);
        } else if (event.getButton() === 2) {
            this.jumpByStep(2);
        }
    }

    jumpByStep(step: number) {
        if (this._isMoving) return;
        this._startJump = true;
        this._jumpStep = step;
        this._curJumpTime = 0;
        this._curJumpSpeed = this._jumpStep / this._jumpTime;
        this.node.getPosition(this._curPos);
        Vec3.add(this._targetPos, this._curPos, v3(this._jumpStep, 0, 0));
        this._isMoving = true;

        if (step === 1) {
            this.BodyAnim.play('oneStep');
        } else if (step === 2) {
            this.BodyAnim.play('twoStep');
        }
    }

    onOnceJumpEnd() {
        this._isMoving = false;
    }
}
