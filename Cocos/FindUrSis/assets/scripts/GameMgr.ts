/******************
 * Game Manager
 * Creator: Resol
 * ************** */

import fs from 'fs';

import { Block, Packer } from './interface';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameMgr extends cc.Component {

    @property(cc.Node)
    bg: cc.Node = null;

    @property(cc.Prefab)
    item: cc.Prefab = null;

    private _spriteList: cc.SpriteFrame[] = [];

    private _delList: cc.SpriteFrame[] = [];

    private _blocks: Block[] = [];

    private _packer = null;

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

            this._delList = this._spriteList;

            this._spawnItem();

            this._packItem();
        });
    }

    private _spawnItem(): void {
        let num = Math.floor(0 + Math.random() * this._spriteList.length);
        if (this._delList[num]) {
            let newItem = cc.instantiate(this.item);
            this.bg.addChild(newItem);
            newItem.getComponent(cc.Sprite).spriteFrame = this._delList[num];
            let newBlock: Block = Object.create(null);
            newBlock.w = newItem.width;
            newBlock.h = newItem.height;
            newBlock.node = newItem;
            this._blocks.push(newBlock);
            this._delList.splice(num, 1);
        } else {
            this._spawnItem();
        }
        if (this._delList.length !== 0) {
            this._spawnItem();
        }
    };

    private _packItem() {
        this._packer = new Packer(960, 640);

        this._blocks.sort((b, a) => {
            return a.node.height - b.node.height;
        });

        this._packer.fit(this._blocks);

        for (let i = 0; i < this._blocks.length; i++) {
            let block = this._blocks[i];
            if (block.fit) {
                block.node.x = block.fit.x;
                block.node.y = block.fit.y;
            }
        }
    }
}
