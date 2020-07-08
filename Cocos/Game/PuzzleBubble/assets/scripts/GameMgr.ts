/******************
 * Game manager
 * Creator: Resol
 * ************** */

import { Bubble, EVENT } from './Interface';
import Util from './Util';
import BubbleMgr from './BubbleMgr';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMgr extends cc.Component {
    private _bubbleArr: Bubble[][] = [];
    private _shootBubble: Bubble = null;
    private _shootDir: cc.Vec2 = null;
    private _isCalc: boolean = true;
    private _isShooting: boolean = false;

    public start(): void {
        this._initLevel('Lv1');

        this._setShootBubble();

        cc.director.on(EVENT.TOUCH_END_SHOOT, (degree) => {
            if (!this._isCalc) return;
            this._calcRad(degree);
            this._isShooting = true;
        });
    }

    public update(dt: number): void {
        if (this._isShooting) {
            this._moveBubble(dt);
            this._checkCollision();
        }
    }

    private _initLevel(lv: string): void {
        cc.loader.loadRes('data/level', cc.JsonAsset, (err, json) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            this._initBubble(json['json'][lv]);
        });
    }

    private _initBubble(data: Array<[]>): void {
        for (let row = 0, len = data.length; row < len; row++) {
            let colData: Bubble[] = data[row];
            this._bubbleArr[row] = [];

            for (let col = 0, len = colData.length; col < len; col++) {
                let color: number = data[row][col];
                if (color === 0) continue;

                let pos: cc.Vec2 = Util.convertMatrixToPos(row, col);

                cc.loader.loadRes('prefab/bubble', cc.Prefab, (err, prefab) => {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }

                    let newBubble: cc.Node = cc.instantiate(prefab);

                    newBubble.getChildByName('bubbleMgr').getComponent(BubbleMgr).initBubble(this.node.parent, pos, color);

                    let obj: Bubble = Object.create(null);
                    obj.node = newBubble;
                    obj.color = color;
                    obj.isVisited = false;
                    obj.isLinked = false;
                    this._bubbleArr[row][col] = obj;
                });
            }
        }
    }

    private _setShootBubble(): void {
        this._isCalc = true;

        let color: number = Util.setRanNum(4, 1);

        let pos: cc.Vec2 = this.node.parent.getChildByName('shooter').position;

        cc.loader.loadRes('prefab/bubble', cc.Prefab, (err, prefab) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            let newBubble: cc.Node = cc.instantiate(prefab);

            newBubble.getChildByName('bubbleMgr').getComponent(BubbleMgr).initBubble(this.node.parent, pos, color);

            let obj: Bubble = Object.create(null);
            obj.node = newBubble;
            obj.color = color;
            obj.isVisited = false;
            obj.isLinked = false;

            this._shootBubble = obj;
        });
    }

    private _calcRad(d: number): void {
        let rad: number = cc.misc.degreesToRadians(d);
        this._shootDir = cc.v2(Math.sin(-rad), Math.cos(rad));
    }

    private _moveBubble(dt: number): void {
        this._isCalc = false;
        let speed: number = 1500;
        let n: cc.Node = this._shootBubble.node;
        if (n.x < Util.BUBBLE_R || n.x > Util.SCREEN_W - Util.BUBBLE_R) this._shootDir.x = -this._shootDir.x;
        n.x += this._shootDir.x * dt * speed;
        n.y += this._shootDir.y * dt * speed;
    }

    private _checkCollision(): void {
        for (let row = 0, len = this._bubbleArr.length; row < len; row++) {
            for (let col = 0, len = this._bubbleArr[row].length; col < len; col++) {
                if (!this._bubbleArr[row][col]) continue;
                let n: cc.Node = this._bubbleArr[row][col].node;
                let offsetY = Math.abs(n.y - this._shootBubble.node.y);
                if (offsetY > 2 * Util.BUBBLE_R) continue;
                let offsetX = Math.abs(n.x - this._shootBubble.node.x);
                if (offsetX > 2 * Util.BUBBLE_R) continue;
                let dis = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
                if (dis > 2 * Util.BUBBLE_R) continue;
                this._isShooting = false;
                this._modifyPos();
                return;
            }
        }

        if (this._shootBubble.node.y > cc.view.getVisibleSize().height - Util.BUBBLE_R) {
            this._isShooting = false;
            // 位置修正
            this._modifyPos();
        }
    }

    private _modifyPos(): void {
        let index = Util.convertPosToMatrix(this._shootBubble.node.x, this._shootBubble.node.y);
        this._shootBubble.node.position = Util.convertMatrixToPos(index.row, index.col);
        let obj: Bubble = Object.create(null);
        obj.node = this._shootBubble.node;
        obj.color = this._shootBubble.color;
        obj.isLinked = false;
        obj.isVisited = false;
        this._bubbleArr[index.row][index.col] = obj;
        cc.log(this._bubbleArr);
        this._iterateColor(index);
    }

    private _iterateColor(index): void {

        this._testColor(index.row, index.col, this._bubbleArr[index.row][index.col].color);

        let counter = 0;
        let deleArr = [];
        for (let row = 0, len = this._bubbleArr.length; row < len; row++) {
            for (let col = 0, len = this._bubbleArr[row].length; col < len; col++) {
                if (!this._bubbleArr[row][col]) continue;
                if (this._bubbleArr[row][col].isVisited) {
                    this._bubbleArr[row][col].isVisited = false;
                    counter++;
                    deleArr.push({ row, col });
                }
            }
        }
        if (counter >= 3) {
            deleArr.forEach((matrix) => {
                let b = this._bubbleArr[matrix.row][matrix.col].node;
                b.getChildByName('bubbleMgr').getComponent(BubbleMgr).playDeathAnim();
                delete this._bubbleArr[matrix.row][matrix.col];
                this.scheduleOnce(this._iterateFall);
            });
        } else {
            this._setShootBubble();
        }
    }

    private _iterateFall(): void {

        for (let i = 0, len = this._bubbleArr[0].length; i < len; i++) {
            if (!this._bubbleArr[0][i]) continue;
            this._testFall(0, i);
        }

        let flag: boolean = true;
        for (let row = 0, len = this._bubbleArr.length; row < len; row++) {
            for (let col = 0, len = this._bubbleArr[row].length; col < len; col++) {
                if (!this._bubbleArr[row][col]) continue;
                if (!this._bubbleArr[row][col].isLinked) {
                    flag = false;
                    let b = this._bubbleArr[row][col].node;
                    b.getChildByName('bubbleMgr').getComponent(BubbleMgr).playDownAnim();
                    delete this._bubbleArr[row][col];
                } else {
                    this._bubbleArr[row][col].isVisited = false;
                    this._bubbleArr[row][col].isLinked = false;
                }
            }
        }

        if (flag) {
            this._setShootBubble();
        } else {
            this._setShootBubble();
        }
    }

    private _testColor(row: number, col: number, color: number): void {
        if (!this._bubbleArr[row] || !this._bubbleArr[row][col]) return;
        let b: Bubble = this._bubbleArr[row][col];
        if (b.isVisited) return;
        if (b.color !== color) return;
        b.isVisited = true;
        cc.log(`${row}行，${col}列`);
        if (row % 2 === 0) { // Even row
            this._testColor(row - 1, col - 1, color); // Left-top
            this._testColor(row, col - 1, color); // Left
            this._testColor(row + 1, col - 1, color); // Left-low
            this._testColor(row + 1, col, color); // Right-low
            this._testColor(row, col + 1, color); // Right
            this._testColor(row - 1, col, color); // Right-top
        } else { // Odd row
            this._testColor(row - 1, col, color); // Left-top
            this._testColor(row, col - 1, color); // Left
            this._testColor(row + 1, col, color); // Left-low
            this._testColor(row + 1, col + 1, color); // Right-low
            this._testColor(row, col + 1, color); // Right
            this._testColor(row - 1, col + 1, color); // Right-top
        }
    }

    private _testFall(row: number, col: number): void {
        if (!this._bubbleArr[row] || !this._bubbleArr[row][col]) return;
        let b: Bubble = this._bubbleArr[row][col];
        if (b.isVisited) return;
        b.isVisited = true;
        b.isLinked = true;
        if (row % 2 === 0) { // Even row
            this._testFall(row - 1, col - 1); // Left-top
            this._testFall(row, col - 1); // Left
            this._testFall(row + 1, col - 1); // Left-low
            this._testFall(row + 1, col); // Right-low
            this._testFall(row, col + 1); // Right
            this._testFall(row - 1, col); // Right-top
        } else { // Odd row
            this._testFall(row - 1, col); // Left-top
            this._testFall(row, col - 1); // Left
            this._testFall(row + 1, col); // Left-low
            this._testFall(row + 1, col + 1); // Right-low
            this._testFall(row, col + 1); // Right
            this._testFall(row - 1, col + 1); // Right-top
        }
    }
}