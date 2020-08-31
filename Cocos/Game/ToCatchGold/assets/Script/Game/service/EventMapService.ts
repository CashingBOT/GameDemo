/**
 * 全局事件
 */
export const enum MapGlobalEvent {
    /**
     * 播放音效
     * @example 传入的数据格式为 cc.AudioClip
     */
    playerSound = "playSoundGlobal",

    /**
     * 打个提示弹窗
     */
    openPopup = "openPopupGlobal",

    /**
     * 更新红点
     */
    updatePoint = "updatePointGlobal",

    /**
     * 更新指定按钮状态
     */
    updateMenuButtonState = "updateMenuButtonStateGlobal",

    /**
     * 注销
     */
    logout = "logoutGlobal",

    /**
     * 跑马灯
     */
    notification = "notificationGlobal",

    /**
     * 触发主界面菜单按钮点击事件
     * @description 传入按钮ID MenuButtonId
     */
    mainMenuTrigger = "mainMenuTriggerGlobal",

    /**
     * 刷新游戏 => 回到主界面，重新请求init协议
     */
    updateGame = "updateGameGlobal",
}

/**
 * 本地储存的数据结构 => 后面内容是要存的key key
 */
export const enum MapLocalStorage {
    /** 缓存token */
    token = "token",
    /** 是否提示 */
    isWithdraw = "isWithdraw",
    /** 是否进入过提现 */
    enteredWithdraw = "enteredWithdraw",
}

/**
 * http Api
 */
export const enum MapHttpApi {
    /** 游客登陆 */
    bdt_login_tourist = "/bdt/login/tourist",
    /** 手机验证码登陆 */
    bdt_login_phone = "/bdt/login/phone",
    /** 微信登陆 */
    bdt_login_wx = "/bdt/login/wx",
    /** 发送短信 */
    bdt_sms_send = "/bdt/sms/send",
    /** 查询公告 */
    bdt_notice_query = "/bdt/notice/query",
}

/** 奖励类型 */
export const enum RewardType {
    /** 金币 */
    GOLD = 1,
    /** 红包 */
    REDBAG = 2,
    /** 轮盘次数 */
    CORONA = 3,
}

/**
 * 按钮唯一id
 * 同时用于红点处理
 */
export enum MenuButtonId {
    NONE = 0,
    /** 排行榜 */
    RANK = 1,
    /** 摊主图鉴 */
    GUIDE_BOOK = 2,
    /** 幸运宝箱 */
    LUCKY_BOK = 3,
    /** 签到 */
    SING_IN = 4,
    /** 每日任务 */
    DAILY_TASK = 5,

    /** 至尊摊主 */
    SUPREME = 6,
    /** 等级奖励 */
    LEVEL_REWARD = 7,
    /** 绑定有礼 */
    BIND_REWARD = 8,
    /** 新手礼包 */
    NOVICE = 9,

    /** 趣味游戏 */
    GAME = 10,
    /** 精品推荐 */
    BOUTIQUE = 11,
    /** 幸运转盘 => 目前这个是自定义 */
    LUCKY_DIAL = 12,

    /** 邀请奖励未领取 */
    INVITE_REWARD = 13,
}

/** 邀请界面 */
export const enum INVITATION_EVENT {
    // 领取奖励
    GET = "invitation_event_get",
}

/** 日常界面 */
export const enum DAILY_EVENT {
    REFRESH = "daily_event_refresh",
}
