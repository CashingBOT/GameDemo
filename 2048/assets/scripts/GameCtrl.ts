import Data from './Data';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCtrl extends cc.Component {
    @property(cc.Node)
    board: cc.Node = null;

    @property(cc.Prefab)
    block: cc.Prefab = null;

    @property(cc.Prefab)
    item: cc.Prefab = null;

    private _startPos: cc.Vec2;

    onLoad() {
        for (let i = 0; i < 4; i++) {
            Data.list()[i] = [];
            for (let j = 0; j < 4; j++) {
                let newBlock = cc.instantiate(this.block);
                this.board.addChild(newBlock);
                newBlock.x = -i * (165 + 8) - 8;
                newBlock.y = j * (165 + 8) + 8;
                Data.list()[i][j] = 0;
            }
        }

        this._setRandom();

        this.board.on('touchstart', (t: cc.Touch) => {
            this._startPos = t.getLocation();
        })

        this.board.on('touchend', (t: cc.Touch) => {
            this._setEvent(t);
        })

        this.board.on('touchcancel', (t: cc.Touch) => {
            this._setEvent(t);
        })
    }

    private _setEvent(t) {
        if (Math.abs(this._startPos.x - t.getLocation().x) > Math.abs(this._startPos.y - t.getLocation().y) && this._startPos.x - t.getLocation().x > 0) { // Left
            console.log('left');
        }
        if (Math.abs(this._startPos.x - t.getLocation().x) > Math.abs(this._startPos.y - t.getLocation().y) && this._startPos.x - t.getLocation().x < 0) { // Right
            console.log('right');
        }
        if (Math.abs(this._startPos.x - t.getLocation().x) < Math.abs(this._startPos.y - t.getLocation().y) && this._startPos.y - t.getLocation().y > 0) { // Below
            console.log('below');
        }
        if (Math.abs(this._startPos.x - t.getLocation().x) < Math.abs(this._startPos.y - t.getLocation().y) && this._startPos.y - t.getLocation().y < 0) { // Up
            console.log('up');
        }
    }

    private _setRandom() {
        let vecList = [];

        for (let i = 0; i < 4; i++) {
            vecList[i] = Math.floor(0 + Math.random() * 4);
        }

        if (vecList[0] == vecList[2] && vecList[1] == vecList[3]) {
            console.log('Again');
            this._setRandom();
        } else {
            Data.list()[vecList[0]][vecList[1]] = 2;
            Data.list()[vecList[2]][vecList[3]] = 2;

            for (let i = 0; i < 4; i += 2) {
                let newItem = cc.instantiate(this.item);
                this.board.addChild(newItem);
                newItem.x = -vecList[i] * (165 + 8) - 8;
                newItem.y = vecList[i + 1] * (165 + 8) + 8;
                newItem.getChildByName('num').getComponent(cc.Label).string = Data.list()[vecList[i]][vecList[i + 1]];
            }
            console.log('OK');
        }
    }
}
