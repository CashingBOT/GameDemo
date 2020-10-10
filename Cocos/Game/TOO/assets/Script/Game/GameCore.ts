import { MapGlobalEvent, MenuButtonId } from "./service/EventMapService";
import R from "../R";
import { PopupObject, SysPopupLogic, sysPopupViewDataList, PopupType } from "../View/SysPopupLogic";
import { ProtocolControl } from "./control/ProtocolControl";
import { LocalStorageService } from "./service/LocalStorageService";
import { HttpService } from "./service/HttpService";
import { GameConfig } from "../GameConfig";
import { PointEventObj } from "../component/PointComponent";
import { RewardObject, RewardLogic } from "../View/RewardLogic";
import { Utils } from "./game-lib/Utils";
import { MenuButtonEventObj } from "../component/MenuButton";
import { ErrorService } from "./service/ErrorService";
import { PromptService } from "./service/PromptService";
import { UserInfoService } from "./service/UserInfoService";

// export default { injectable, inject, reifyClass, event, GameEvent };

/**
 * 游戏中用到的通用逻辑
 */
class GameCoreControl extends Core.BaseLogic {
    /**
     * 初始化
     */
    init() {
        this.event.on(MapGlobalEvent.openPopup, this.openPopup, this);
        ErrorService;
        //注册通信组件
        new ProtocolControl();
        //注册本地储存
        LocalStorageService.init(this.config.gameId);
    }

    /**
     * 打开提示窗
     * @param obj 传入的数据 关闭的时候不需要传数据
     * @param show 默认显示，不传，需要关闭的时候传入false obj为null
     * @returns 通过promise返回当前打开界面的单例
     * @example
     * PopupType.HINT 默认弹窗 有关闭按钮和确认按钮
     * PopupType.BONUS 分红弹窗 有关闭按钮和确认按钮
     * PopupType.NOTICE 公告弹窗 只有确认按钮，内容带滚动
     */
    openPopup(obj: PopupObject | null, show: boolean = true): Promise<SysPopupLogic | void> | null {
        if (!show) {
            if (SysPopupLogic.openView) {
                return SysPopupLogic.openView.closeView();
            }
            return;
        }

        return new Promise((resolve) => {
            if (obj.openCall) {
                console.warn("openCall 通过promise返回，这里不需要绑定，不会执行");
            }
            obj.openCall = (e) => {
                resolve(e);
            };
            sysPopupViewDataList.push(obj);
            if (!SysPopupLogic.isOpen) {
                SysPopupLogic.isOpen = true;
                Core.viewManager.openView(R.SysPopupView, obj);
            }
        });
    }

    /**
     * 打开领取奖励界面
     * @param obj 领取奖励打开的界面数据 传隐藏时可无值
     * @returns 通过promise返回当前打开界面的单例
     */
    openRewardView(obj: RewardObject | null): Promise<RewardLogic> {
        return new Promise((resolve) => {
            if (obj.openCall) {
                console.warn("openCall 通过promise返回，这里不需要绑定，不会执行");
            }
            obj.openCall = (e) => {
                resolve(e);
            };
            Core.viewManager.openView(R.RewardView, obj);
        });
    }

    /**
     * 事件管理器
     */
    event = Core.eventManager;

    /**
     * 设置更新红点
     * @param type 功能类型
     * @param show 显示或隐藏
     */
    setPoint(type: MenuButtonId, show: boolean) {
        this.event.event(MapGlobalEvent.updatePoint, <PointEventObj>{ type: type, show: show });
    }

    /**
     * 设置菜单按钮显示或隐藏
     */
    setMenuButtonShow(id: MenuButtonId, show: boolean) {
        this.event.event(MapGlobalEvent.updateMenuButtonState, <MenuButtonEventObj>{ id: id, show: show });
    }

    /**
     * 文本小提示框
     */
    prompt(str: string) {
        PromptService.prompt(str);
    }

    /**
     * 连接socket
     * @param token token
     */
    async connectSocket(token: string) {
        let param = `token=${token}&deviceCode=${GameCore.config.device}&mobileMan=${GameCore.config.mobileMan}&deviceType=${cc.sys.os}&channel=${GameCore.config.channelId}`;
        let tag = await Core.webSockets.open(GameCore.config.webSocketUrl + "/" + Core.Base64.instance.encode(param));
        if (tag === true) {
            let net = await Core.webSockets.send<xxgBuf.InitRet>("InitReq", new xxgBuf.InitReq(), true);
            if (net) {
                UserInfoService.init(net);
                await Core.viewManager.openView(R.MainView, net);
            } else {
                //TODO临时修改
                GameCore.openPopup({ type: PopupType.HINT, msg: "服务器数据错误！" });
            }
        } else {
            await Core.viewManager.openView(R.LoginView, (token: string) => {
                this.connectSocket(token);
            });
        }
    }

    /**
     * 本地数据储存
     */
    localStorage = LocalStorageService;

    /**
     * http模块
     */
    http = HttpService;

    /**
     * 游戏配置
     */
    config = GameConfig;

    /**
     * 工具类
     */
    utils = Utils;
}

const GameCore = new GameCoreControl();

export { GameCore };
