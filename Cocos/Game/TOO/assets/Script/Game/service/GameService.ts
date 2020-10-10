import { GameCore } from "../GameCore";
import { MapGlobalEvent, MapLocalStorage } from "./EventMapService";
import R from "../../R";
import { UserInfoService } from "./UserInfoService";
import { PromptService } from "./PromptService";
import { RedPointService } from "./RedPointService";

export const enum SDKShareType {
    /** 微信 */
    WX = 1,
    /** 朋友圈 */
    FRIEND_GROUP = 2,
    /** 保存至手机 */
    PHONE_PHOTO = 3,
}

export const enum SDKAdType {
    /** 开屏广告 */
    LAUNCH = 0,
    /** 正常广告 */
    NORMAL = 1,
}

/**
 * 游戏通用操作
 */
class GameControl extends Core.BaseLogic {
    /**
     * 登出
     */
    public logout() {
        Core.viewManager.goToMainView();
        Core.viewManager.closeView("MainView");
        Core.webSockets.close();
        UserInfoService.clear();
        GameCore.localStorage.delItem(MapLocalStorage.token);
        Core.viewManager.openView(R.LoginView);
        RedPointService.removeAll();
    }

    /**
     * 刷新界面=>token未过期
     */
    async updateMain() {
        Core.viewManager.goToMainView();
        Core.eventManager.event(MapGlobalEvent.updateGame);
    }

    /**
     * 复制字符串到剪贴板
     */
    public async strToClipboard(targetStr: string) {
        return new Promise(async (resolve, reject) => {
            if (cc.sys.isNative) {
                let ret = await Core.shellRequest.send({
                    uri: "/copy",
                    data: {
                        str: targetStr,
                    },
                });
                if (ret && ret.res) {
                    resolve();
                } else {
                    PromptService.prompt("复制失败");
                    reject();
                }
            } else {
                Core.CommonFun.strToClipboard(targetStr);
                resolve();
            }
        });
    }

    public async share(type: SDKShareType, imgPath: string) {
        if (cc.sys.isNative) {
            let ret = await Core.shellRequest.send({
                uri: "/share",
                data: {
                    path: imgPath,
                    scene: type, //1.好友 2.朋友圈
                },
            });
            if (ret && ret.res) {
                if (type == SDKShareType.PHONE_PHOTO) {
                    PromptService.prompt("保存图片成功");
                } else {
                    PromptService.prompt("分享成功");
                }
            } else {
                if (type == SDKShareType.PHONE_PHOTO) {
                    PromptService.prompt("保存图片失败");
                } else {
                    PromptService.prompt("分享失败");
                }
            }
        }
    }

    /**
     * 播放广告
     */
    public playAd(adType: SDKAdType) {
        return new Promise(async (resolve, reject) => {
            if (cc.sys.isNative && !GameCore.config.isReview) {
                if (adType == SDKAdType.NORMAL) {
                    Core.viewManager.openShieldView(true);
                    setTimeout(() => {
                        Core.viewManager.closeShieldView();
                    }, 10000);
                }

                Core.audioManager.setAllMute();
                let id: string;
                if (adType == SDKAdType.LAUNCH) {
                    id = Core.SystemConfig.isIos
                        ? GameCore.config.openAdvertisingIdIOS
                        : GameCore.config.openAdvertisingIdAndroid;
                } else if (adType == SDKAdType.NORMAL) {
                    id = Core.SystemConfig.isIos
                        ? GameCore.config.advertisingIdIOS
                        : GameCore.config.advertisingIdAndroid;
                }
                let ret = await Core.shellRequest.send({
                    uri: "/advertising",
                    data: {
                        type: adType,
                        advertisingId: id,
                    },
                });

                Core.audioManager.setAllNoMute();
                Core.viewManager.closeShieldView();
                if (ret && ret.res) {
                    resolve();
                } else {
                    if (adType == SDKAdType.LAUNCH) {
                        resolve();
                    } else {
                        reject();
                    }
                }
            } else {
                resolve();
            }
        });
    }

    /**
     * 行为验证
     */
    public verifyBehavior() {
        return new Promise(async (resolve, reject) => {
            if (cc.sys.isNative) {
                let ret = await Core.shellRequest.send({
                    uri: "/behavior",
                    data: {},
                });
                if (ret && ret.res) {
                    resolve();
                } else {
                    PromptService.prompt("行为验证失败");
                    reject();
                }
            } else {
                resolve();
            }
        });
    }

    /**
     * 微信登录
     */
    public wxLogin(): Promise<string> {
        return new Promise(async (resolve, reject) => {
            if (cc.sys.isNative) {
                let ret = await Core.shellRequest.send({
                    uri: "/login/weChat",
                    data: {},
                });
                if (ret) {
                    resolve(ret.code);
                } else {
                    reject();
                }
            } else {
                reject();
                PromptService.prompt("请使用其他登录方式");
            }
        });
    }
}

export const GameService = new GameControl();
