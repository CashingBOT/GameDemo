import { GameCore } from "../GameCore";
import { PopupType, SysPopupLogic } from "../../View/SysPopupLogic";
import { GameService } from "./GameService";
import { CodeMap } from "../Map/CodeMap";
import { MapLocalStorage } from "./EventMapService";
import { PromptService } from "./PromptService";

/**
 * 错误处理
 */
class ErrorControl extends Core.BaseLogic {
    /**
     * 发现未捕捉错误码
     */
    @Core.event(Core.CoreEventMap.CORE_ON_CAPTURE_CODE)
    private codeNoListening(code: number) {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: "未捕捉错误码：" + code,
            closeButtonShow: false,
        });
    }

    /** 电脑网络断开 = app ws断开 */
    @Core.code(Core.CoreCodeMap.CORE_WS_NOT_NET)
    @Core.event(Core.CoreEventMap.CORE_NET_DISCONNECT)
    private offLine(code) {
        Core.webSockets.close();
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: `网络断开,请检查网络!`,
            confirm: () => {
                GameService.logout();
            },
            closeButtonShow: false,
        });
    }

    /**
     * 电脑网络连接上
     */
    @Core.event(Core.CoreEventMap.CORE_NET_CONNECTION)
    private onLine() {
        GameCore.connectSocket(GameCore.localStorage.getItem(MapLocalStorage.token));
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: "网络断开,重新连接中。。。",
            confirm: () => {},
            closeButtonShow: false,
            confirmButtonShow: false,
        });
    }

    /**
     * ws网络断开
     */
    @Core.event(Core.CoreEventMap.CORE_WS_DISCONNECT)
    private webSocketBreak() {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: "网络断开,重新连接中。。。",
            confirm: () => {},
            closeButtonShow: false,
            confirmButtonShow: false,
        });
    }

    /**
     * 重连成功
     */
    @Core.event(Core.CoreEventMap.CORE_WS_RECONNECTION_SUCCES)
    private reConnection() {
        SysPopupLogic.clearViewDataList();
        GameCore.openPopup(null, false);
    }

    /**
     * 重新连接失败
     */
    @Core.event(Core.CoreEventMap.CORE_WS_RECONNECTION_FAILUE)
    private reConnectionLose() {
        cc.warn("重连失败。。。。。。。。");
        SysPopupLogic.clearViewDataList();
        GameCore.openPopup(null, false).then(() => {
            GameCore.openPopup({
                type: PopupType.HINT,
                msg: "重新连接失败，请重新登陆",
                confirm: () => {
                    GameService.logout();
                },
                closeButtonShow: false,
            });
        });
    }

    /**
     * 系统异常，请稍后重试
     */
    @Core.code(
        CodeMap.YELL_TIME_ERROR,
        CodeMap.LUCKY_BOX_RECEIVE_TIME,
        CodeMap.LEVEL_REWARD_NOT_EXIST,
        CodeMap.ERROR_6204,
        CodeMap.GRADE_REWARD_IS_STATUS,

        CodeMap.INVITE_NOT_EXIST
    )
    private systemException(code) {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: `系统异常，请稍后重试(${code})`,
            closeButtonShow: false,
        });
    }

    /**
     * 需要刷新数据的
     * @param code d
     */
    @Core.code(
        CodeMap.PARAMETER_ERROR,
        CodeMap.NOT_CONFIG,
        CodeMap.FUNCTION_NOT_EXIST,
        CodeMap.USER_NOT_EXIST,
        CodeMap.USER_ACCOUNT_NOT_EXIST,
        CodeMap.USER_BALANCE_ERROR,
        CodeMap.DAY_RECEIVE_NOT_EXIST,
        CodeMap.RANDOM_ERROR_5001,
        CodeMap.SIGN_IN_IS_NOT_EXIST,
        CodeMap.DAY_RECEIVE_IS_NOT_EXIST,
        CodeMap.LEVEL_CONFIG_ERROR,
        CodeMap.REDBAG_CONFIG_ERROR,
        CodeMap.YELL_IS_NOT_EXIST,
        CodeMap.NOVICE_BAG_IS_NOT_EXIST,
        CodeMap.GRADE_IS_NOT_EXIST,
        CodeMap.LUCK_BOX_IS_NOT_EXIST,
        CodeMap.STALL_ERROR_6005
    )
    private codeUpdate(code) {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: `系统异常，请稍后重试(${code})`,
            closeButtonShow: false,
            confirm: () => {
                GameService.updateMain();
            },
        });
    }

    /**
     * 您已与服务器断开连接，请重新登录
     */
    @Core.code(CodeMap.SERVER_CLOSE, CodeMap.SERVICE_ERROR)
    private code_1012(code) {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: `您已与服务器断开连接，请重新登录(${code})`,
            confirm: () => {
                GameService.updateMain();
            },
            closeButtonShow: false,
        });
    }

    /**
     * 账号异常被踢下线
     */
    @Core.code(CodeMap.OTHER_LOGIN_OFFLINE)
    private kickOut(code) {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: `检测到账号在别处登录,请检查账号安全(${code})`,
            confirm: () => {
                GameService.logout();
            },
            closeButtonShow: false,
        });
    }

    /**
     * 账号异常被踢下线
     */
    @Core.code(CodeMap.TIMEOUT_OFFLINE)
    private code_4904(code) {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: `您已与服务器断开连接，请重新登录!(${code})`,
            confirm: () => {
                GameService.logout();
            },
            closeButtonShow: false,
        });
    }

    /**
     * 连接上限
     */
    @Core.code(CodeMap.CONN_OVER_LIMIT, CodeMap.BUSY)
    private upperLimit(code) {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: `系统异常，请稍后重试(${code})`,
            confirm: () => {
                GameService.logout();
            },
            closeButtonShow: false,
        });
    }

    /**
     * 配置更改错误码 - 等级奖励
     */
    @Core.code(CodeMap.ERROR_6206)
    private code_6206() {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: "啊哦，地摊遇到了一点小问题，请点击确定按钮刷新重试!",
            confirm: () => {
                GameService.updateMain();
            },
            closeButtonShow: false,
        });
    }

    /**
     * 摊位已加速!
     */
    @Core.code(CodeMap.EXIST_ADV_UP_COUNT)
    private code_6002(code) {
        this.hint(`摊位已处于加速状态(${code})`);
    }

    /**
     * 摊位金币不足,不能升级
     */
    @Core.code(CodeMap.GOLD_NOT_ENOUGH)
    private code_6003(code) {
        this.hint(`金币不足，无法升级(${code})`);
    }

    /**
     * 摊位等级超过上限
     */
    @Core.code(CodeMap.STALL_LEVEL_MAX)
    private code_6004(code) {
        this.hint(`摊位等级已达上限(${code})`);
    }

    /**
     * 宝箱领取已达上限!
     */
    @Core.code(CodeMap.LUCKY_BOX_RECEIVE_UPPER)
    private code_6202(code) {
        this.hint(`今日宝箱领取次数已用完，请明日再试!(${code})`);
    }

    /**
     * 新手礼包已领取!
     */
    @Core.code(CodeMap.NOVICE_BAG_IS_EXIST)
    private code_7009(code) {
        this.hint(`您已领取过新手礼包!(${code})`);
    }

    /**
     * 今日已达上限!
     */
    @Core.code(CodeMap.YELL_FREQUENCY_UPPER)
    private code_6101(code) {
        this.hint(`今日吆喝次数已用完，请明日再试!(${code})`);
    }

    /**
     * 微信号已被他人绑定，请确认后重试!
     */
    @Core.code(CodeMap.WX_BINDING_EXIST)
    private code_1103(code) {
        PromptService.prompt(`微信号已被他人绑定，请确认后重试(${code})`);
    }

    /**
     * 手机号已被他人绑定，请确认后重试!
     */
    @Core.code(CodeMap.PHONE_BINDING_EXIST)
    private code_1104(code) {
        PromptService.prompt(`手机号已被他人绑定，请确认后重试(${code})`);
    }

    /**
     * 奖励领取失败，请稍后重试!
     */
    @Core.code(CodeMap.INVITE_OBTAIN_FAIL)
    private code_7102(code) {
        PromptService.prompt(`奖励领取失败，请稍后重试(${code})`);
    }

    private hint(title: string) {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: title,
            closeButtonShow: false,
        });
    }

    /**
     * 需要重新登陆的错误信息
     */
    @Core.code(CodeMap.CODE_1102, CodeMap.CODE_1111)
    private codeLogout(code) {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: `系统异常，请稍后重试(${code})`,
            closeButtonShow: false,
            confirm: () => {
                GameService.logout();
            },
        });
    }
    /**
     * 获取用户信息错误
     */
    @Core.code(CodeMap.CODE_10026)
    private code_10026(code) {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: `用户信息异常，请稍后重试(${code})`,
            closeButtonShow: false,
            confirm: () => {
                GameService.logout();
            },
        });
    }
}

export const ErrorService = new ErrorControl();
