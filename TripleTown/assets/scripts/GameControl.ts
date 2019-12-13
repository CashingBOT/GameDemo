/******************
 * Game Scene Controller
 * Creator: Resol
 * ************** */
import GlobalData from "./GlobalData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameControl extends cc.Component {
    private _board: cc.Node;
    private _jellyItemsList = [];

    onLoad() {
        console.log('%c Game Start ', "color:green;background-color:rgba(167, 167, 167, 0.2)");

        this._initNode();

        this._loadJellyItems();
    }

    private _initNode() {
        this._board = this.node.parent.getChildByName('board');
        this._board.x = GlobalData.getBoardRow() * GlobalData.getJellyItemSize() / 2;
        this._board.y = -GlobalData.getBoardCol() * GlobalData.getJellyItemSize() / 2 - 100;
    }

    private _loadJellyItems() {
        cc.loader.loadRes(GlobalData.getJellyItemPrefabUrl(), cc.Prefab, (err, prefab) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            for (let i = 0; i < GlobalData.getBoardCol() * GlobalData.getBoardRow(); i++) {
                let newItem = cc.instantiate(prefab);

                cc.loader.loadRes(GlobalData.getJellyItemPngUrl(), cc.SpriteFrame, (err, spriteFrame) => {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }

                    newItem.addComponent(cc.Sprite).spriteFrame = spriteFrame;

                    this._initBoard(newItem, i);

                    this._jellyItemsList.push(newItem);
                })

                this._setEffects(newItem);
            }
        })
    }

    private _initBoard(item: cc.Node, i: number) {
        this._board.addChild(item, 1, `jellyItem${i}`)
        item.width = GlobalData.getJellyItemSize();
        item.height = GlobalData.getJellyItemSize();
        item.x = -(i % GlobalData.getBoardRow() * (item.width + GlobalData.getBoardSpacing()));
        item.y = Math.floor(i / GlobalData.getBoardRow()) * (item.height + GlobalData.getBoardSpacing());
    }

    private _setEffects(item: cc.Node) {
        // Jelly item fade in
        item.opacity = 0;
        cc.tween(item)
            .to(1, { opacity: 255 })
            .start();
    }
}