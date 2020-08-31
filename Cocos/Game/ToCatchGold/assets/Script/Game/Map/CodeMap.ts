/**
 * code码集合
 */
export const enum CodeMap {
    //==================== 用户信息 ====================
    /** 客户端由于遇到没有预料的情况阻止其完成请求, 因此服务端断开连接 */
    SERVICE_ERROR = 1011,
    /** 务器由于重启而断开连接 */
    SERVER_CLOSE = 1012,
    /** 微信号已被他人绑定，请确认后重试 */
    WX_BINDING_EXIST = 1103,
    /** 手机号已被他人绑定，请确认后重试 */
    PHONE_BINDING_EXIST = 1104,
    /** 账户操作失败 */
    CODE_1102 = 1102,
    /** 用户金币账户不存在 */
    CODE_1111 = 1111,

    /** 参数错误! */
    PARAMETER_ERROR = 3001,
    /** 获取配置错误 */
    NOT_CONFIG = 3002,
    /** 功能不存在! */
    FUNCTION_NOT_EXIST = 3003,
    /** 用户信息不存在! */
    USER_NOT_EXIST = 3101,
    /** 用户余额信息不存在! */
    USER_ACCOUNT_NOT_EXIST = 3102,
    /** 用户账变失败! */
    USER_BALANCE_ERROR = 3103,

    /** 当天已签到! */
    SIGN_IN_IS_EXIST = 4001,
    /** 每日任务配置获取失败! */
    DAY_RECEIVE_NOT_EXIST = 4101,

    //==================== 绑定手机号 ====================
    /** 请输入手机号! */
    BINDING_TEL_IS_NULL = 4201,
    /** 手机号不正确，请重新输入! */
    BINDING_TEL_IS_ERROR = 4202,
    /** 该手机号已被绑定! */
    BINDING_TEL_IS_BINGING = 4203,
    /** 超过每天最大发送数量! */
    BINDING_TEL_OVER_MAX = 4204,
    /** 验证码已经过期 */
    BINDING_TEL_CODE_EXPIRED = 4205,
    /** 验证码错误 */
    BINDING_TEL_CODE_ERROR = 4206,
    /** 发送短信失败 */
    BINDING_TEL_SEND_FAIL = 4207,
    /** 非法手机号 */
    BINDING_TEL_PHONE_ERROR = 4208,

    /** 异地登录踢下线 */
    OTHER_LOGIN_OFFLINE = 4901,
    /** 超过最大连接数 */
    CONN_OVER_LIMIT = 4902,
    /** 系统错误 */
    BUSY = 4903,
    /** 超时踢下线 */
    TIMEOUT_OFFLINE = 4904,

    /** 两个数字之间没有整数了! */
    RANDOM_ERROR_5001 = 5001,
    /** 红包获取失败! */
    RANDOM_ERROR_5002 = 5002,

    /** 摊位加速次数已用完! */
    ADV_UP_COUNT = 6001,
    /** 摊位已加速! */
    EXIST_ADV_UP_COUNT = 6002,
    /** 摊位金币不足,不能升级 */
    GOLD_NOT_ENOUGH = 6003,
    /** 摊位等级超过上限 */
    STALL_LEVEL_MAX = 6004,
    /** 摊位信息不存在! */
    STALL_ERROR_6005 = 6005,

    /** 今日已达上限! */
    YELL_FREQUENCY_UPPER = 6101,
    /** 吆喝获取上一次点击时间出错! */
    YELL_TIME_ERROR = 6102,
    /** 吆喝时间没有超过10秒! */
    YELL_TIME_SHORT = 6103,
    /** 宝箱领取时间间隔过短! */
    LUCKY_BOX_RECEIVE_TIME = 6201,
    /** 宝箱领取已达上限! */
    LUCKY_BOX_RECEIVE_UPPER = 6202,
    /** 没有可领取的等级奖励! */
    LEVEL_REWARD_NOT_EXIST = 6203,
    /** 摊位金币不足! */
    ERROR_6204 = 6204,
    /** 宝箱不可领取! */
    GRADE_REWARD_IS_STATUS = 6205,
    /** 配置更改错误码 - 等级奖励 */
    ERROR_6206 = 6206,

    /** 签到配置不存在! */
    SIGN_IN_IS_NOT_EXIST = 7001,
    /** 每日任务配置不存在! */
    DAY_RECEIVE_IS_NOT_EXIST = 7002,
    /** 等级配置信息不存在! */
    LEVEL_CONFIG_ERROR = 7003,
    /** 红包配置信息不存在! */
    REDBAG_CONFIG_ERROR = 7004,
    /** 吆喝配置不存在! */
    YELL_IS_NOT_EXIST = 7005,
    /** 新手礼包配置不存在! */
    NOVICE_BAG_IS_NOT_EXIST = 7006,
    /** 等级活动不存在! */
    GRADE_IS_NOT_EXIST = 7007,
    /** 幸运宝箱配置不存在! */
    LUCK_BOX_IS_NOT_EXIST = 7008,
    /**  新手礼包已领取! */
    NOVICE_BAG_IS_EXIST = 7009,

    //==================== 邀请 ====================
    /** 揽客/邀请不存! */
    INVITE_NOT_EXIST = 7101,
    /** 揽客/邀请领取失败 */
    INVITE_OBTAIN_FAIL = 7102,
    /** 揽客/邀请领取等级不够 */
    INVITE_OBTAIN_LEVEL_ERROR = 7103,

    //==================== 提现 ====================
    /** 提现失败 */
    WITHDRAW_FAIL = 8001,
    /** 该金额不能提现 */
    WITHDRAW_ERROR_CASH = 8002,
    /** 已有提现申请 */
    HAS_APPLY = 30030,
    /** 今天已经提现 */
    TODAY_CASH = 30031,
    /** 账户余额不足 */
    INSUFFICIENT = 30032,
    /** 账变错误 */
    BALANCE_ERROR = 30033,
    /** 用户无效 */
    USER_INACTIVE = 30034,
    /** 超过最大申请次数 */
    OVER_APPLY = 30035,
    /** 未绑定微信 */
    NOT_BIND_WX = 30036,
    /** 用户不存在 */
    WITHDRAW_USER_NOT_EXIST = 30036,
    /** 超过小额提现金额 */
    OVER_SMALL_AMOUNT = 30038,
    /** 未绑定手机 */
    NOT_BIND_PHONE = 30039,
    /** 小额提现已经申请 */
    SMALL_AMOUNT_APPLIED = 8001,
    /** 账户余额不足，无法提现 */
    INSUFFICIENT_BALANCE = 1110,
    /** 小额提现等级不够 */
    SMALL_AMOUNT_LEVEL_LOW = 8003,

    /** 发送短信失败 */
    SEND_FAIL = 10010,
    /** 非法手机号 */
    PHONE_ERROR = 10014,
    /** 超过每天最大发送数量 */
    OVER_MAX = 10015,
    /** 验证码已经过期 */
    CODE_EXPIRED = 10016,
    /** 验证码错误 */
    CODE_ERROR = 10017,
    /** 发送短信太频繁 */
    CODE_LIMIT = 10018,
    /** 微信认证错误 */
    WX_VERIFY_ERROR = 10025,
    /** 获取用户信息错误 */
    CODE_10026 = 10026,
}
