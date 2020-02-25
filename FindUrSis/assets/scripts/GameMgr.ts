/******************
 * Game Manager
 * Creator: Resol
 * ************** */

import { BTreeNode } from './interface';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMgr extends cc.Component {

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Prefab)
    item: cc.Prefab = null;

    private _spriteList = [];

    private _delList = [];

    private _isSetRoot: boolean = false;

    public onLoad(): void {
        this._initItem();
    }

    private _initItem(): void {
        cc.loader.loadResDir('textures/', cc.SpriteFrame, (e, r) => {
            if (e) {
                cc.error(e.message || e);
                return;
            }
            this._spriteList = r;

            this._spawnItem();
        });
    }

    private _spawnItem(): void {
        this._delList = this._spriteList;
        let num = Math.floor(0 + Math.random() * 50);
        if (this._delList[num]) {
            let newItem = cc.instantiate(this.item);
            this.bg.addChild(newItem);
            newItem.getComponent(cc.Sprite).spriteFrame = this._delList[num];
            this._insertItem(newItem);
            this._delList.splice(num, 1);
        } else {
            this._spawnItem();
        }
        if (this._delList.length != 0) {
            console.log('again: ' + this._delList.length);
            this._spawnItem();
        }
    };

    private _insertItem(item: cc.Node): void {
       
    }
}
