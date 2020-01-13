/******************
 * Global Data Storage
 * Creator: Resol
 * ************** */

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameCtrl extends cc.Component {
    @property(cc.Node)
    board: cc.Node = null;

    @property(cc.Node)
    restartBtn: cc.Node = null;

    @property(cc.Prefab)
    block: cc.Prefab = null;

    @property(cc.Prefab)
    item: cc.Prefab = null;

    private _itemNumList = [];

    private _itemNodeList = [];

    private _itemLockList = [];

    private _startPos: cc.Vec2;

    private _score: cc.Label;

    private _hstScore: cc.Label;

    private _isSpawn: boolean = false;

    onLoad() {
        this._initNode();

        this._initBoard();

        this._setTouchEvent();

        this._setRandom();
        this._setRandom();
    }

    private _initNode() {
        this._score = this.node.parent.getChildByName('score').getChildByName('num').getComponent(cc.Label);

        this._hstScore = this.node.parent.getChildByName('highestScore').getChildByName('num').getComponent(cc.Label);

        this._hstScore.string = cc.sys.localStorage.getItem('score') || '0';
    }

    private _initBoard() {
        for (let y = 0; y < 4; y++) {
            this._itemNumList[y] = [];
            this._itemNodeList[y] = [];
            this._itemLockList[y] = [];
            for (let x = 0; x < 4; x++) {
                let newBlock = cc.instantiate(this.block);
                this.board.addChild(newBlock, -5);
                newBlock.x = x * (165 + 8) + 8;
                newBlock.y = y * (165 + 8) + 8;
                this._itemNumList[y][x] = 0;
                this._itemNodeList[y][x] = 0;
                this._itemLockList[y][x] = false;
                // newBlock.getChildByName('vec').getComponent(cc.Label).string = `(${x}, ${y})`;
            }
        }
    }

    private _setTouchEvent() {
        this.board.on('touchstart', (t: cc.Touch) => {
            // console.log(this._itemNumList);
            // console.log(this._itemNodeList);
            this._startPos = t.getLocation();
        });

        this.board.on('touchend', (t: cc.Touch) => {
            this._setAlgo(t);

            if (cc.sys.platform === cc.sys.WECHAT_GAME) { // Judge wether WeChat environment or not
                wx.vibrateShort(); // Add vibration
            }

            this._resetLock();
        });
    }

    /**
     * Core algorithm
     */
    private _setAlgo(t) {
        if (Math.abs(this._startPos.x - t.getLocation().x) > Math.abs(this._startPos.y - t.getLocation().y) && this._startPos.x - t.getLocation().x > 0) { // Left
            // console.log('left');

            for (let y = 0; y < 4; y++) {
                for (let x = 0; x < 4; x++) {
                    for (let i = x; i > 0; i--) {
                        if (this._itemNumList[y][i - 1] == this._itemNumList[y][i] && this._itemNumList[y][i] != 0 && !this._itemLockList[y][i] && !this._itemLockList[y][i - 1]) {
                            this._itemNumList[y][i - 1] += this._itemNumList[y][i];
                            this._itemLockList[y][i - 1] = true;
                            this._itemNumList[y][i] = 0;

                            this._setDestroy(this._itemNodeList[y][i], this._itemNodeList[y][i - 1].position);

                            this._itemNodeList[y][i - 1].getChildByName('num').getComponent(cc.Label).string = this._itemNumList[y][i - 1];
                            this._itemNodeList[y][i] = 0;

                            this._isSpawn = true;

                            this._setColor(this._itemNumList[y][i - 1], this._itemNodeList[y][i - 1]);
                            this._setEffect(this._itemNodeList[y][i - 1], '_');
                            this._setScore(this._itemNumList[y][i - 1]);

                            // console.log('combine');
                        }

                        if (this._itemNumList[y][i - 1] == 0 && this._itemNumList[y][i] != 0) {
                            this._itemNumList[y][i - 1] = this._itemNumList[y][i];
                            this._itemNumList[y][i] = 0;

                            this._setPos(this._itemNodeList[y][i], cc.v2((i - 1) * (165 + 8) + 8, y * (165 + 8) + 8));
                            this._itemNodeList[y][i - 1] = this._itemNodeList[y][i];
                            this._itemNodeList[y][i] = 0;
                            // this._itemNodeList[y][i - 1].x = (i - 1) * (165 + 8) + 8;
                            // this._itemNodeList[y][i - 1].y = y * (165 + 8) + 8;

                            this._isSpawn = true;

                            // console.log('move');
                        }
                    }
                }
            }

            if (this._isSpawn) {
                this._setRandom();
                this._isSpawn = false;
            }
        }

        if (Math.abs(this._startPos.x - t.getLocation().x) > Math.abs(this._startPos.y - t.getLocation().y) && this._startPos.x - t.getLocation().x < 0) { // Right
            // console.log('right');

            for (let y = 0; y < 4; y++) {
                for (let x = 3; x > -1; x--) {
                    for (let i = x; i < 3; i++) {
                        if (this._itemNumList[y][i + 1] == this._itemNumList[y][i] && this._itemNumList[y][i] != 0 && !this._itemLockList[y][i] && !this._itemLockList[y][i + 1]) {
                            this._itemNumList[y][i + 1] += this._itemNumList[y][i];
                            this._itemLockList[y][i + 1] = true;
                            this._itemNumList[y][i] = 0;

                            this._setDestroy(this._itemNodeList[y][i], this._itemNodeList[y][i + 1].position);

                            this._itemNodeList[y][i + 1].getChildByName('num').getComponent(cc.Label).string = this._itemNumList[y][i + 1];
                            this._itemNodeList[y][i] = 0;

                            this._isSpawn = true;

                            this._setColor(this._itemNumList[y][i + 1], this._itemNodeList[y][i + 1]);
                            this._setEffect(this._itemNodeList[y][i + 1], '_');
                            this._setScore(this._itemNumList[y][i + 1]);

                            // console.log('combine');
                        }

                        if (this._itemNumList[y][i + 1] == 0 && this._itemNumList[y][i] != 0) {
                            this._itemNumList[y][i + 1] = this._itemNumList[y][i];
                            this._itemNumList[y][i] = 0;

                            this._setPos(this._itemNodeList[y][i], cc.v2((i + 1) * (165 + 8) + 8, y * (165 + 8) + 8));

                            this._itemNodeList[y][i + 1] = this._itemNodeList[y][i];
                            this._itemNodeList[y][i] = 0;
                            // this._itemNodeList[y][i + 1].x = (i + 1) * (165 + 8) + 8;
                            // this._itemNodeList[y][i + 1].y = y * (165 + 8) + 8;

                            this._isSpawn = true;

                            // console.log('move');
                        }
                    }
                }
            }

            if (this._isSpawn) {
                this._setRandom();
                this._isSpawn = false;
            }
        }

        if (Math.abs(this._startPos.x - t.getLocation().x) < Math.abs(this._startPos.y - t.getLocation().y) && this._startPos.y - t.getLocation().y > 0) { // Below
            // console.log('below');

            for (let x = 0; x < 4; x++) {
                for (let y = 0; y < 4; y++) {
                    for (let i = y; i > 0; i--) {
                        if (this._itemNumList[i - 1][x] == this._itemNumList[i][x] && this._itemNumList[i][x] != 0 && !this._itemLockList[i][x] && !this._itemLockList[i - 1][x]) {
                            this._itemNumList[i - 1][x] += this._itemNumList[i][x];
                            this._itemLockList[i - 1][x] = true;
                            this._itemNumList[i][x] = 0;

                            this._setDestroy(this._itemNodeList[i][x], this._itemNodeList[i - 1][x].position);

                            this._itemNodeList[i - 1][x].getChildByName('num').getComponent(cc.Label).string = this._itemNumList[i - 1][x];
                            this._itemNodeList[i][x] = 0;

                            this._isSpawn = true;

                            this._setEffect(this._itemNodeList[i - 1][x], '_');
                            this._setColor(this._itemNumList[i - 1][x], this._itemNodeList[i - 1][x]);
                            this._setScore(this._itemNumList[i - 1][x]);

                            // console.log('combine');
                        }

                        if (this._itemNumList[i - 1][x] == 0 && this._itemNumList[i][x] != 0) {
                            this._itemNumList[i - 1][x] = this._itemNumList[i][x];
                            this._itemNumList[i][x] = 0;

                            this._setPos(this._itemNodeList[i][x], cc.v2(x * (165 + 8) + 8, (i - 1) * (165 + 8) + 8));

                            this._itemNodeList[i - 1][x] = this._itemNodeList[i][x];
                            this._itemNodeList[i][x] = 0;
                            // this._itemNodeList[i - 1][x].x = x * (165 + 8) + 8;
                            // this._itemNodeList[i - 1][x].y = (i - 1) * (165 + 8) + 8;

                            this._isSpawn = true;

                            // console.log('move');
                        }
                    }
                }
            }

            if (this._isSpawn) {
                this._setRandom();
                this._isSpawn = false;
            }
        }

        if (Math.abs(this._startPos.x - t.getLocation().x) < Math.abs(this._startPos.y - t.getLocation().y) && this._startPos.y - t.getLocation().y < 0) { // Up
            // console.log('up');

            for (let x = 0; x < 4; x++) {
                for (let y = 3; y > -1; y--) {
                    for (let i = y; i < 3; i++) {
                        if (this._itemNumList[i + 1][x] == this._itemNumList[i][x] && this._itemNumList[i][x] != 0 && !this._itemLockList[i][x] && !this._itemLockList[i + 1][x]) {
                            this._itemNumList[i + 1][x] += this._itemNumList[i][x];
                            this._itemLockList[i + 1][x] = true;
                            this._itemNumList[i][x] = 0;

                            this._setDestroy(this._itemNodeList[i][x], this._itemNodeList[i + 1][x].position);

                            this._itemNodeList[i + 1][x].getChildByName('num').getComponent(cc.Label).string = this._itemNumList[i + 1][x];
                            this._itemNodeList[i][x] = 0;

                            this._isSpawn = true;

                            this._setColor(this._itemNumList[i + 1][x], this._itemNodeList[i + 1][x]);
                            this._setEffect(this._itemNodeList[i + 1][x], '_');
                            this._setScore(this._itemNumList[i + 1][x]);

                            // console.log('combine');
                        }

                        if (this._itemNumList[i + 1][x] == 0 && this._itemNumList[i][x] != 0) {
                            this._itemNumList[i + 1][x] = this._itemNumList[i][x];
                            this._itemNumList[i][x] = 0;

                            this._setPos(this._itemNodeList[i][x], cc.v2(x * (165 + 8) + 8, (i + 1) * (165 + 8) + 8));

                            this._itemNodeList[i + 1][x] = this._itemNodeList[i][x];
                            this._itemNodeList[i][x] = 0;
                            // this._itemNodeList[i + 1][x].x = x * (165 + 8) + 8;
                            // this._itemNodeList[i + 1][x].y = (i + 1) * (165 + 8) + 8;

                            this._isSpawn = true;

                            // console.log('move');
                        }
                    }
                }
            }

            if (this._isSpawn) {
                this._setRandom();
                this._isSpawn = false;
            }
        }
    }

    private _resetLock() {
        for (let x = 0; x < 4; x++) {
            for (let y = 0; y < 4; y++) {
                this._itemLockList[y][x] = false;
            }
        }
    }

    /**
     * Random spawn item on blank
     */
    private _setRandom() {
        let vecList = [];

        for (let i = 0; i < 2; i++) {
            vecList[i] = Math.floor(0 + Math.random() * 4);
        }

        if (this._itemNodeList[vecList[1]][vecList[0]] != 0) {
            // console.log('Spawn again');
            this._setRandom();
        } else {
            this._itemNumList[vecList[1]][vecList[0]] = Math.random() > 0.75 ? 4 : 2; // 概率

            let newItem = cc.instantiate(this.item);
            this.board.addChild(newItem);
            newItem.x = vecList[0] * (165 + 8) + 8;
            newItem.y = vecList[1] * (165 + 8) + 8;
            newItem.getChildByName('num').getComponent(cc.Label).string = this._itemNumList[vecList[1]][vecList[0]];
            this._itemNodeList[vecList[1]][vecList[0]] = newItem;

            this._setColor(this._itemNumList[vecList[1]][vecList[0]], this._itemNodeList[vecList[1]][vecList[0]]);
            this._setEffect(newItem);

            // console.log('Spawn OK');
        }
    }

    /**
     * Set item background color
     */
    private _setColor(num: number, node: cc.Node) {
        switch (num) {
            case 4:
                node.color = cc.color().fromHEX('#F8E167');
                break;
            case 8:
                node.color = cc.color().fromHEX('#EED056');
                break;
            case 16:
                node.color = cc.color().fromHEX('#EBA81B');
                break;
            case 32:
                node.color = cc.color().fromHEX('#E78D1A');
                break;
            case 64:
                node.color = cc.color().fromHEX('#EE7516');
                break;
            case 128:
                node.color = cc.color().fromHEX('#EE4C0D');
                break;
            case 256:
                node.color = cc.color().fromHEX('#FF1F00');
                break;
            case 512:
                node.color = cc.color().fromHEX('#AF0000');
                break;
            case 1024:
                node.color = cc.color().fromHEX('#2F36E6');
                break;
        }
    }

    /**
     * Set item spawn or combine effect
     */
    private _setEffect(item: cc.Node, str?: string) {

        if (str) {
            cc.tween(item)
                .to(0, { zIndex: 1000 })
                .to(0.2, { scale: 1.2 })
                .to(0.3, { scale: 1 }, { easing: 'bounceOut' })
                .to(0, { zIndex: 0 })
                .start();
        } else {
            item.scale = 0;
            cc.tween(item)
                .to(0.5, { scale: 1 }, { easing: 'sineOut' })
                .start();
        }
    }

    private _setPos(node: cc.Node, pos: cc.Vec2) {
        cc.tween(node)
            .to(0.2, { position: pos })
            .start();
    }

    private _setDestroy(node: cc.Node, pos: cc.Vec2) {
        cc.tween(node)
            .to(0, { zIndex: -1 })
            .to(0.2, { position: pos })
            .call(() => { node.destroy(); })
            .start();
    }

    /**
     *Calculate score
     */
    private _setScore(num: string) {
        this._score.string = String(parseInt(this._score.string) + parseInt(num));
    }

    public restartBtnCallback() {

        if (parseInt(this._score.string) > parseInt(this._hstScore.string)) {
            this._hstScore.string = this._score.string;
            cc.sys.localStorage.setItem('score', this._hstScore.string);
        }

        cc.game.restart();
    }
}