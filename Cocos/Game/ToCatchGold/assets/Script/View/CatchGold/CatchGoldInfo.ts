/**
 * 道具类型
 */
export const enum ToolType {
    BIG,
    SMALL,
    IRON,
}

/**
 * 游戏阶段
 */
export const enum GamePhase {
    ONE,
    TWO,
    THREE,
}

/**
 * 掉落物类型
 */
export const enum Item {
    BIG = "big",
    MIDDLE = "middle",
    SMALL = "small",
    HAMMER = "hammer",
}

/**
 * 事件
 */
export const enum CatchGoldMap {
    GAME_START = "GAME_START",
    GAME_END = "GAME_END",
    GAME_CLOSE = "GAME_CLOSE",
}

/**
 * 掉落高度
 */
export const DROP_HEIGHT: number = 1000;

/**
 * 掉落高度
 */
export const PLAYER_SPEED: number = 8;

/**
 * 接金子数据
 */
class CatchGoldInfo extends Core.BaseModel {
    /** 道具类型 */
    @Core.field
    public toolType: number = null;

    /** 获得的金子 */
    @Core.field
    public goldAmount: number = 0;

    /** 游戏阶段 */
    @Core.field
    public phase: number = null;

    /** 玩家速度 */
    public playerSpeed: number = PLAYER_SPEED;

    /** 玩家接取范围 */
    public playerCatchRange: number = 70;

    /** 惩罚损失金 */
    public penaltyLoss: number = 1;

    /** 惩罚倒地时间 */
    public penaltyComa: number = null;
}

/**
 * 接金子数据
 */
export const CatchGoldData: CatchGoldInfo = new CatchGoldInfo();
