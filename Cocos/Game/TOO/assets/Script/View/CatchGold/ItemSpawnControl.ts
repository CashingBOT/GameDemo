import { BORDER_X, ItemType, CatchGoldMap, CatchGoldInfo } from "./CatchGoldInfoService";
import PlayerControl from "./PlayerControl";
import ItemControl from "./ItemControl";

const { ccclass, property } = cc._decorator;

/**
 * 物品生成控制
 */
@ccclass
export default class ItemSpawnControl extends Core.ComponentLogic {
    @property(cc.Prefab)
    private prefabItem: cc.Prefab = null;

    @property(cc.Node)
    private playerBox: cc.Node = null;

    public itemPool: cc.NodePool = null;

    private fpsCounter: number = 0;
    private bigCounter: number = 0;
    private middleCounter: number = 0;
    private smallCounter: number = 0;
    private hammerCounter: number = 0;
    private bigCounterLock: boolean = false;
    private middleCounterLock: boolean = false;
    private hammerCounterLock: boolean = false;

    private goldTime: number = 0;
    private finishTime: number = 0;
    private deltaTime: number = 0;

    private nameList: string[] = [ItemType.BIG, ItemType.MIDDLE, ItemType.SMALL, ItemType.HAMMER];

    private collideList: cc.Node[] = [];

    protected coreOnLoad(): void {
        this.initItemPool();
    }

    protected coreUpdate(dt: number): void {
        this.fpsCounter += dt;
        if (this.fpsCounter < 2 * dt) return;
        this.fpsCounter = 0;
        this.collideList.map(this.judgeCollision.bind(this));
    }

    /**
     * 初始化物品对象池
     */
    private initItemPool(): void {
        this.itemPool = new cc.NodePool(ItemControl);
        let initCount = 30;
        for (let i = 0; i < initCount; ++i) {
            let item = cc.instantiate(this.prefabItem);
            this.itemPool.put(item);
        }
    }

    /**
     * 定时生成物品
     */
    @Core.event(CatchGoldMap.SPAWN_ITEM)
    private spawnItem(): void {
        this.goldTime = 0;
        this.finishTime = 59999;
        this.deltaTime = 0;
        this.schedule(this.spawnItemOnce);
    }

    /**
     * 随机生成一个物品
     */
    private spawnItemOnce(): void {
        this.deltaTime += 16;
        if (this.goldTime >= this.finishTime) {
            this.unschedule(this.spawnItemOnce);
        }
        if (this.deltaTime > this.goldTime) {
            this.goldTime += 600;
            this.judgeAmount();
            let newItem: cc.Node = null;
            if (this.itemPool.size() > 0) newItem = this.itemPool.get();
            else newItem = cc.instantiate(this.prefabItem);
            this.node.addChild(newItem);
            newItem.name = this.randomSpawnName();
            newItem.x = this.randomSpawnPosX();
            this.countName(newItem.name);
            newItem.getComponent(ItemControl).initDropItem();
            this.collideList.push(newItem);
        }
    }

    /**
     * 随机生成物品名字
     */
    private randomSpawnName(): string {
        let num = Math.floor(Math.random() * 100);
        let ifHammer: boolean = this.nameList.indexOf(ItemType.HAMMER) !== -1 && num < 10;
        let ifBig: boolean = this.nameList.indexOf(ItemType.BIG) !== -1 && num < 20 && num >= 10;
        let ifMiddle: boolean = this.nameList.indexOf(ItemType.MIDDLE) !== -1 && num < 40 && num >= 20;
        if (ifHammer) return this.nameList[this.nameList.indexOf(ItemType.HAMMER)];
        if (ifBig) return this.nameList[this.nameList.indexOf(ItemType.BIG)];
        if (ifMiddle) return this.nameList[this.nameList.indexOf(ItemType.MIDDLE)];
        return this.nameList[this.nameList.indexOf(ItemType.SMALL)];
    }

    /**
     * 随机生成物品起始位置
     */
    private randomSpawnPosX(): number {
        let x = Math.floor(Math.random() * (BORDER_X - -BORDER_X + 1)) + -BORDER_X;
        return x;
    }

    /**
     * 判断物品是否到达最大生成数量
     */
    private judgeAmount(): void {
        let num: number = null;
        if (this.bigCounter === 10 && !this.bigCounterLock) {
            this.bigCounterLock = true;
            num = this.nameList.indexOf(ItemType.BIG);
            this.nameList.splice(num, 1);
        }
        if (this.middleCounter === 30 && !this.middleCounterLock) {
            this.middleCounterLock = true;
            num = this.nameList.indexOf(ItemType.MIDDLE);
            this.nameList.splice(num, 1);
        }
        if (this.hammerCounter === 10 && !this.hammerCounterLock) {
            this.hammerCounterLock = true;
            num = this.nameList.indexOf(ItemType.HAMMER);
            this.nameList.splice(num, 1);
        }
    }

    /**
     * 判断碰撞范围
     */
    private judgeCollision(item: cc.Node): void {
        let itemPos = item.parent.convertToWorldSpaceAR(item.position);
        let playerPos = this.playerBox.parent.convertToWorldSpaceAR(this.playerBox.position);
        let conditionX = Math.abs(playerPos.x - itemPos.x) <= item.width + 25;
        let conditionY = Math.abs(playerPos.y - itemPos.y) <= item.height + 50;
        if (item.name === ItemType.HAMMER) {
            conditionX = Math.abs(playerPos.x - itemPos.x) <= item.width;
            conditionY = Math.abs(playerPos.y - itemPos.y) <= item.height + 150;
        }
        if (conditionX && conditionY) {
            // cc.log(item.name + " has been caught");
            if (CatchGoldInfo.canMove) {
                if (item.name !== ItemType.HAMMER) this.playerBox.getComponent(PlayerControl).showScore(item.name);
                item.getComponent(ItemControl).countScore();
                this.destroyItem(item);
            } else {
                if (item.name === ItemType.HAMMER) {
                    item.getComponent(ItemControl).continueDizzy();
                    this.destroyItem(item);
                }
            }
        }
    }

    /**
     * 销毁物品
     */
    @Core.event(CatchGoldMap.DESTROY_ITEM)
    private destroyItem(item: cc.Node): void {
        item.stopAllActions();
        this.itemPool.put(item);
        let num = this.collideList.indexOf(item);
        this.collideList.splice(num, 1);
    }

    /**
     * 物品生成个数计数
     */
    private countName(name: string): void {
        switch (name) {
            case ItemType.BIG:
                this.bigCounter += 1;
                cc.log("%c大金币 " + this.bigCounter, "color:green");
                break;
            case ItemType.MIDDLE:
                this.middleCounter += 1;
                cc.log("%c中金币 " + this.middleCounter, "color:yellow");
                break;
            case ItemType.SMALL:
                this.smallCounter += 1;
                cc.log("%c小金币 " + this.smallCounter, "color:orange");
                break;
            case ItemType.HAMMER:
                this.hammerCounter += 1;
                cc.log("大铁锤 " + this.hammerCounter);
                break;
        }
    }

    /**
     * 重新开始游戏事件
     */
    @Core.event(CatchGoldMap.RESTART_GAME)
    private restartGame(): void {
        this.nameList = [ItemType.BIG, ItemType.MIDDLE, ItemType.SMALL, ItemType.HAMMER];
        this.bigCounter = 0;
        this.middleCounter = 0;
        this.smallCounter = 0;
        this.hammerCounter = 0;
        this.bigCounterLock = false;
        this.middleCounterLock = false;
        this.hammerCounterLock = false;
    }

    /**
     * 暂停游戏事件
     */
    @Core.event(CatchGoldMap.PAUSE_GAME)
    private pauseGame(): void {
        cc.director.getScheduler().pauseTarget(this);
    }

    /**
     * 恢复游戏事件
     */
    @Core.event(CatchGoldMap.RESUME_GAME)
    private resumeGame(): void {
        cc.director.getScheduler().resumeTarget(this);
    }
}
