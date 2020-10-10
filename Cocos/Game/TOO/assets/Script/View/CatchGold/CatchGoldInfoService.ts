/**
 * 横向边界
 */
export const BORDER_X: number = 375 - 92; // 屏幕宽度 - 玩家宽度/2

/**
 * 掉落高度
 */
export const DROP_HEIGHT: number = 1200;

/**
 * 玩家速度
 */
export const PLAYER_SPEED: number = 400;

/**
 * 掉落物类型
 */
export const enum ItemType {
    BIG = "big",
    MIDDLE = "middle",
    SMALL = "small",
    HAMMER = "hammer",
}

/**
 * 动画类型
 */
export const enum AnimType {
    NONE = "",
    ANIM_1 = "animation",
    ANIM_2 = "animation2",
    ANIM_3 = "animation3",
}

/**
 * 接金子事件
 */
export const enum CatchGoldMap {
    SPAWN_ITEM = "spawnItem",
    PAUSE_GAME = "pauseGame",
    RESUME_GAME = "resumeGame",
    RESTART_GAME = "restartGame",
    PLAYER_DIZZY = "playerDizzy",
    DESTROY_ITEM = "destroyItem",
}

class CatchGoldData extends Core.BaseModel {
    /** 免费次数 */
    @Core.field
    public gameNum: number = 0;
    /** 剩余观看视频次数 */
    @Core.field
    public videoNum: number = 0;
    /** 获得的大金子数量 */
    @Core.field
    public bigGoldAmount: number = 0;
    /** 获得的中金子数量 */
    @Core.field
    public middleGoldAmount: number = 0;
    /** 获得的小金子数量 */
    @Core.field
    public smallGoldAmount: number = 0;
    /** 能否移动 */
    public canMove: boolean = true;

    /** 清空数据 */
    public clearScore(): void {
        this.bigGoldAmount = 0;
        this.middleGoldAmount = 0;
        this.smallGoldAmount = 0;
        this.canMove = true;
    }

    /** 初始化次数 */
    public async initNum(): Promise<void> {
        let gameData = await Core.webSockets.send<xxgBuf.IGameInfoRet>("GameInfoReq", new xxgBuf.GameInfoReq({}));
        if (gameData) {
            this.gameNum = gameData.gameNum;
            this.videoNum = gameData.videoNum;
        }
    }
}

/**
 * 接金子数据
 */
export const CatchGoldInfo = new CatchGoldData();
