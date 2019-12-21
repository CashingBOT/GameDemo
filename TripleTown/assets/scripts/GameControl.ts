/******************
 * Game Scene Controller
 * Creator: Resol
 * ************** */
import GlobalData from "./GlobalData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameControl extends cc.Component {
    private _pauseBtn: cc.Node;
    private _board: cc.Node;
    private _jellyItemsList = [];

    onLoad() {
        cc.log('%c Game Start ', "color:green;background-color:rgba(167, 167, 167, 0.2)");

        this._initAllActions();
    }

    private _initAllActions() {
        let action1 = cc.callFunc(() => {
            this._initNode();
            this._setPauseBtnEvent();
        })

        let action2 = cc.delayTime(1);

        let action3 = cc.callFunc(() => {
            this._loadJellyItem();
        })

        let action4 = cc.delayTime(0.5);

        this.node.runAction(cc.sequence(action1, action2, action3, action4));
    }

    private _initNode() {
        this._pauseBtn = this.node.parent.getChildByName('pauseBtn');
        this._board = this.node.parent.getChildByName('board');

        this._board.x = GlobalData.getBoardRow() * GlobalData.getJellyItemSize() / 2;
        this._board.y = -GlobalData.getBoardCol() * GlobalData.getJellyItemSize() / 2 - 100;

        let bg = this._board.getChildByName('bg');
        bg.x = -GlobalData.getBoardRow() * GlobalData.getJellyItemSize() / 2;
        bg.y = GlobalData.getBoardCol() * GlobalData.getJellyItemSize() / 2 + 10;
        bg.width = GlobalData.getBoardRow() * (GlobalData.getJellyItemSize() + GlobalData.getBoardSpacing() * 2);
        bg.height = GlobalData.getBoardCol() * (GlobalData.getJellyItemSize() + GlobalData.getBoardSpacing() * 1.5);

        // Board background fade in
        bg.opacity = 0;
        cc.tween(bg)
            .to(1, { opacity: 127.5 })
            .start();
    }

    private _initBoard(item: cc.Node, i: number) {
        this._board.addChild(item, i, `jellyItem${i}`);

        item.width = GlobalData.getJellyItemSize();
        item.height = GlobalData.getJellyItemSize();

        this._setItemEffects(item, i);

        this._setItemAlgo(i);
    }

    private _loadJellyItem() {
        cc.loader.loadRes(GlobalData.getJellyItemPrefabUrl(), cc.Prefab, (err, prefab) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            for (let i = 0; i < GlobalData.getBoardCol() * GlobalData.getBoardRow(); i++) {
                let newItem = cc.instantiate(prefab);

                newItem.addComponent(cc.Sprite).spriteFrame = GlobalData.getJellyItemSprite();

                this._jellyItemsList.push(newItem);

                this._initBoard(newItem, i);
            }
        })
    }

    private _setItemEffects(item: cc.Node, i: number) {
        // Jelly item fade in
        // item.opacity = 0;
        // cc.tween(item)
        //     .to(1, { opacity: 255 })
        //     .start();

        // Jelly items initial position
        item.position = cc.v2(-GlobalData.getBoardRow() * GlobalData.getJellyItemSize() / 2, GlobalData.getBoardCol() * GlobalData.getJellyItemSize() / 2 - 100); // Spawn in board centre
        // item.position = cc.v2(0, 0);
        let itemX = -(i % GlobalData.getBoardRow() * (item.width + GlobalData.getBoardSpacing()));
        let itemY = Math.floor(i / GlobalData.getBoardRow()) * (item.height + GlobalData.getBoardSpacing());

        item.runAction(cc.moveTo(1, cc.v2(itemX, itemY)).easing(cc.easeElasticOut(0.5))); // Verify here to change jelly items effects
    }

    /**
     * @private
     * Core random items arrangement algorithm
     */
    private _setItemAlgo(i: number) {
        if (i > 1) {
            let spriteList = [];

            if (this._jellyItemsList[i - 1].getComponent(cc.Sprite).spriteFrame._name == this._jellyItemsList[i - 2].getComponent(cc.Sprite).spriteFrame._name) {

                GlobalData.getJellyItemSpriteList().forEach(sprite => {
                    if (sprite._name == this._jellyItemsList[i - 2].getComponent(cc.Sprite).spriteFrame._name) {
                        spriteList = GlobalData.getJellyItemSpriteList().filter((sprite) => {
                            return sprite._name != this._jellyItemsList[i - 2].getComponent(cc.Sprite).spriteFrame._name;
                        })
                        GlobalData.addJellyItemSpriteFilteredList(spriteList);
                    }
                })

                this._jellyItemsList[i - 2].getComponent(cc.Sprite).spriteFrame = GlobalData.regainJellyItemSprite();

                this._jellyItemsList[i - 2].width = GlobalData.getJellyItemSize();
                this._jellyItemsList[i - 2].height = GlobalData.getJellyItemSize();
            }

            if (this._jellyItemsList[i].getComponent(cc.Sprite).spriteFrame._name == this._jellyItemsList[i - 1].getComponent(cc.Sprite).spriteFrame._name) {

                GlobalData.getJellyItemSpriteList().forEach(sprite => {
                    if (sprite._name == this._jellyItemsList[i - 1].getComponent(cc.Sprite).spriteFrame._name) {
                        if (spriteList.length > 0) {
                            spriteList = spriteList.filter((sprite) => {
                                return sprite._name != this._jellyItemsList[i - 1].getComponent(cc.Sprite).spriteFrame._name
                                    && sprite._name != this._jellyItemsList[i - 2].getComponent(cc.Sprite).spriteFrame._name;
                            })
                        } else {
                            spriteList = GlobalData.getJellyItemSpriteList().filter((sprite) => {
                                return sprite._name != this._jellyItemsList[i - 1].getComponent(cc.Sprite).spriteFrame._name
                                    && sprite._name != this._jellyItemsList[i - 2].getComponent(cc.Sprite).spriteFrame._name;
                            })
                        }
                        GlobalData.addJellyItemSpriteFilteredList(spriteList);
                    }
                })

                this._jellyItemsList[i - 1].getComponent(cc.Sprite).spriteFrame = GlobalData.regainJellyItemSprite('-_-');

                this._jellyItemsList[i - 1].width = GlobalData.getJellyItemSize();
                this._jellyItemsList[i - 1].height = GlobalData.getJellyItemSize();

            }
        }

        if (i == 79) {
            GlobalData.addJellyItemNodeLIst(this._jellyItemsList);
            let spriteList = []
            for (let i = 16; i < 80; i++) {
                if (this._jellyItemsList[i].getComponent(cc.Sprite).spriteFrame._name == this._jellyItemsList[i - 8].getComponent(cc.Sprite).spriteFrame._name
                    && this._jellyItemsList[i].getComponent(cc.Sprite).spriteFrame._name == this._jellyItemsList[i - 16].getComponent(cc.Sprite).spriteFrame._name) {

                    spriteList = GlobalData.getJellyItemSpriteList().filter((sprite) => {
                        return sprite._name != this._jellyItemsList[i].getComponent(cc.Sprite).spriteFrame._name;
                    })

                    GlobalData.addJellyItemSpriteFilteredList(spriteList);

                    this._jellyItemsList[i].getComponent(cc.Sprite).spriteFrame = GlobalData.regainJellyItemSprite();

                    this._jellyItemsList[i].width = GlobalData.getJellyItemSize();
                    this._jellyItemsList[i].height = GlobalData.getJellyItemSize();
                }
            }
        }
    }

    private _setPauseBtnEvent() {
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'GameControl';
        clickEventHandler.handler = '_pauseBtnCallback';
        this._pauseBtn.addComponent(cc.Button).clickEvents.push(clickEventHandler);

        // Set pause button effects
        this._pauseBtn.on('mouseenter', () => {
            this._pauseBtn.runAction(cc.scaleTo(0.1, 0.9));
        })

        this._pauseBtn.on('mouseleave', () => {
            this._pauseBtn.runAction(cc.scaleTo(0.1, 1));
        })
    }

    // TODO
    private _pauseBtnCallback() {

    }
}