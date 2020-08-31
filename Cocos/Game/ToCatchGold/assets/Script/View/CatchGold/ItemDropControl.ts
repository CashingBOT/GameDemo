import { CatchGoldData, GamePhase, Item } from "./CatchGoldInfo";
import ItemControl from "./ItemControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ItemDropControl extends Core.ViewLogic {
    @property(cc.Prefab)
    private prefabItem: cc.Prefab = null;

    @property([cc.Node])
    private nodeListDropArea: cc.Node[] = [];

    @property(cc.Node)
    private nodePlayer: cc.Node = null;

    private readonly BORDER_X: number = 120;

    private readonly BORDER_Y: number = 60;

    private nameList: string[] = [];

    private bigCounter: number = 0;
    private middleCounter: number = 0;
    private smallCounter: number = 0;
    private hammerCounter: number = 0;

    private bigCounterLock: boolean = false;
    private middleCounterLock: boolean = false;
    private smallCounterLock: boolean = false;
    private hammerCounterLock: boolean = false;

    public itemPool: cc.NodePool = null;

    protected coreOnLoad(): void {
        this.initItemPool();
        this.setModel();
    }

    private initItemPool(): void {
        this.itemPool = new cc.NodePool(ItemControl);
        let initCount = 30;
        for (let i = 0; i < initCount; ++i) {
            let item = cc.instantiate(this.prefabItem);
            this.itemPool.put(item);
        }
    }

    private setModel(): void {
        this.coreOnModel(CatchGoldData, "phase", (v) => {
            if (v === GamePhase.ONE) {
                cc.log("Phase One");
                this.resetParam();
                this.schedule(() => this.spawnItem(Item.SMALL), 0.5, 18, 1);
                this.schedule(() => this.spawnItem(), 0.5, 18, 11);
            }
            if (v === GamePhase.TWO) {
                cc.log("Phase Two");
                this.resetParam();
                this.schedule(() => this.spawnItem(), 1, 17, 1);
                this.schedule(() => this.spawnItem(), 1, 17, 1);
                this.schedule(() => this.spawnItem(), 1, 17, 1);
            }
            if (v === GamePhase.THREE) {
                cc.log("Phase Three");
                this.resetParam();
                this.schedule(() => this.spawnItem(), 0.5, 33, 0);
                this.schedule(() => this.spawnItem(), 0.5, 33, 0);
            }
        });
    }

    private spawnItem(name?: Item, parent?: cc.Node): void {
        this.judgePhase();
        let newItem: cc.Node = null;
        if (this.itemPool.size() > 0) newItem = this.itemPool.get();
        else newItem = cc.instantiate(this.prefabItem);
        if (name) newItem.name = name;
        else newItem.name = this.randomSpawnName();
        if (parent) parent.addChild(newItem);
        else this.randomChooseArea().addChild(newItem);
        newItem.position = this.randomSpawnPos();
        this.countName(newItem.name);
        newItem.getComponent(ItemControl).startDrop(this, this.nodePlayer);
    }

    private randomSpawnPos(): cc.Vec3 {
        let x = Math.floor(Math.random() * (this.BORDER_X - -this.BORDER_X + 1)) + -this.BORDER_X;
        let y = Math.floor(Math.random() * (this.BORDER_Y - -this.BORDER_Y + 1)) + -this.BORDER_Y;
        return cc.v3(x, y);
    }

    private randomChooseArea(): cc.Node {
        let num = Math.floor(Math.random() * this.nodeListDropArea.length);
        return this.nodeListDropArea[num];
    }

    private randomSpawnName(): string {
        let num = Math.floor(Math.random() * this.nameList.length);
        return this.nameList[num];
    }

    private judgePhase(): void {
        if (CatchGoldData.phase === GamePhase.ONE) {
            let num: number = null;
            if (this.bigCounter === 2 && !this.bigCounterLock) {
                this.bigCounterLock = true;
                num = this.nameList.indexOf(Item.BIG);
                this.nameList.splice(num, 1);
            }
            if (this.middleCounter === 12 && !this.middleCounterLock) {
                this.middleCounterLock = true;
                num = this.nameList.indexOf(Item.MIDDLE);
                this.nameList.splice(num, 1);
            }
            if (this.smallCounter === 20 && !this.smallCounterLock) {
                this.smallCounterLock = true;
                num = this.nameList.indexOf(Item.SMALL);
                this.nameList.splice(num, 1);
            }
            if (this.hammerCounter === 4 && !this.hammerCounterLock) {
                this.hammerCounterLock = true;
                num = this.nameList.indexOf(Item.HAMMER);
                this.nameList.splice(num, 1);
            }
        }
        if (CatchGoldData.phase === GamePhase.TWO) {
            let num: number = null;
            if (this.bigCounter === 6 && !this.bigCounterLock) {
                this.bigCounterLock = true;
                num = this.nameList.indexOf(Item.BIG);
                this.nameList.splice(num, 1);
            }
            if (this.middleCounter === 14 && !this.middleCounterLock) {
                this.middleCounterLock = true;
                num = this.nameList.indexOf(Item.MIDDLE);
                this.nameList.splice(num, 1);
            }
            if (this.smallCounter === 24 && !this.smallCounterLock) {
                this.smallCounterLock = true;
                num = this.nameList.indexOf(Item.SMALL);
                this.nameList.splice(num, 1);
            }
            if (this.hammerCounter === 10 && !this.hammerCounterLock) {
                this.hammerCounterLock = true;
                num = this.nameList.indexOf(Item.HAMMER);
                this.nameList.splice(num, 1);
            }
        }
        if (CatchGoldData.phase === GamePhase.THREE) {
            let num: number = null;
            if (this.bigCounter === 12 && !this.bigCounterLock) {
                this.bigCounterLock = true;
                num = this.nameList.indexOf(Item.BIG);
                this.nameList.splice(num, 1);
            }
            if (this.middleCounter === 14 && !this.middleCounterLock) {
                this.middleCounterLock = true;
                num = this.nameList.indexOf(Item.MIDDLE);
                this.nameList.splice(num, 1);
            }
            if (this.smallCounter === 26 && !this.smallCounterLock) {
                this.smallCounterLock = true;
                num = this.nameList.indexOf(Item.SMALL);
                this.nameList.splice(num, 1);
            }
            if (this.hammerCounter === 16 && !this.hammerCounterLock) {
                this.hammerCounterLock = true;
                num = this.nameList.indexOf(Item.HAMMER);
                this.nameList.splice(num, 1);
            }
        }
    }

    private countName(name: string): void {
        switch (name) {
            case Item.BIG:
                this.bigCounter += 1;
                cc.log("%c大金币 " + this.bigCounter, "color:green");
                break;
            case Item.MIDDLE:
                this.middleCounter += 1;
                cc.log("%c中金币 " + this.middleCounter, "color:yellow");
                break;
            case Item.SMALL:
                this.smallCounter += 1;
                cc.log("%c小金币 " + this.smallCounter, "color:orange");
                break;
            case Item.HAMMER:
                this.hammerCounter += 1;
                cc.log("大铁锤 " + this.hammerCounter);
                break;
        }
    }

    private resetParam(): void {
        this.nameList = [Item.BIG, Item.MIDDLE, Item.SMALL, Item.HAMMER];
        this.bigCounterLock = false;
        this.middleCounterLock = false;
        this.smallCounterLock = false;
        this.hammerCounterLock = false;
        this.bigCounter = 0;
        this.middleCounter = 0;
        this.smallCounter = 0;
        this.hammerCounter = 0;
    }
}
