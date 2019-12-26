const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCtrl extends cc.Component {
    @property(cc.Node)
    board: cc.Node = null;

    @property(cc.Prefab)
    block: cc.Prefab = null;

    @property(cc.Prefab)
    item: cc.Prefab = null;

    private _itemList = [];

    private _startPos: cc.Vec2;

    onLoad() {
        for (let y = 0; y < 4; y++) {
            this._itemList[y] = [];
            for (let x = 0; x < 4; x++) {
                let newBlock = cc.instantiate(this.block);
                this.board.addChild(newBlock);
                newBlock.x = x * (165 + 8) + 8;
                newBlock.y = y * (165 + 8) + 8;
                this._itemList[y][x] = 0;
                newBlock.getChildByName('vec').getComponent(cc.Label).string = `(${x}, ${y})`
            }
        }

        this._setRandom();

        this.board.on('touchstart', (t: cc.Touch) => {
            console.log(this._itemList);
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
            for (let y = 0; y < 4; y++) {
                for (let x = 3; x > 0; x--) {
                    if (this._itemList[y][x - 1] == this._itemList[y][x] && this._itemList[y][x] != 0) {
                        this._itemList[y][x - 1] += this._itemList[y][x];
                        this._itemList[y][x] = 0;
                        console.log('combine');
                    }
                    if (this._itemList[y][x - 1] == 0 && this._itemList[y][x] != 0) {
                        this._itemList[y][x - 1] = this._itemList[y][x];
                        this._itemList[y][x] = 0;
                        console.log('move');
                    }
                }
            }
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
            this._itemList[vecList[1]][vecList[0]] = 2;
            this._itemList[vecList[3]][vecList[2]] = 2;

            for (let i = 0; i < 4; i += 2) {
                let newItem = cc.instantiate(this.item);
                this.board.addChild(newItem);
                newItem.x = vecList[i] * (165 + 8) + 8;
                newItem.y = vecList[i + 1] * (165 + 8) + 8;
                newItem.getChildByName('num').getComponent(cc.Label).string = this._itemList[vecList[i + 1]][vecList[i]];
            }
            console.log('OK');
        }
    }
}