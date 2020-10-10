import ResList from "./ResList";
import Config from "./Config";
import { GameCore } from "./Game/GameCore";
import R from "./R";
import { MapLocalStorage, MapHttpApi } from "./Game/service/EventMapService";
import { GameService, SDKAdType } from "./Game/service/GameService";

//注册游戏核心模块
const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends Core.ApplicationLogic {
    /**
     * 更新组件
     */
    private hotUpdate: Core.HotUpdate = null;
    /**
     * 初始化加载
     */
    @property(cc.Node)
    public initLoadView: cc.Node = null;
    /**
     * 进度条
     */
    @property(cc.Sprite)
    public loadProgress: cc.Sprite = null;
    /**
     * 进度条文本
     */
    @property(cc.Label)
    private loadLb: cc.Label = null;
    /**
     * 弹窗
     */
    @property(cc.Node)
    private popup: cc.Node = null;
    /**
     * 弹窗文本
     */
    @property(cc.Label)
    private popupLb: cc.Label = null;
    /**
     * 弹窗回调
     */
    private callback: Function = null;

    constructor() {
        super();
        this.coreRegisterRes(ResList);
        this.coreRegisterConfig(Config);
    }

    protected async loadApplication() {
        let json = await this.getConfig();
        GameCore.config.webSocketUrl = json.wsUrl;
        GameCore.config.httpUrl = json.httpUrl;
        GameCore.config.version = json.version;
        GameCore.config.phoneSystem = cc.sys.os;

        Core.httpRequest.setUrl(GameCore.config.httpUrl);

        if (cc.sys.isNative) {
            let res = await Core.shellRequest.send({
                uri: "/init",
                data: {
                    advertisingAppId: Core.SystemConfig.isIos
                        ? GameCore.config.advertisingAppIdIOS
                        : GameCore.config.advertisingAppIdAndroid,
                    advertisingId: Core.SystemConfig.isIos
                        ? GameCore.config.advertisingIdIOS
                        : GameCore.config.advertisingIdAndroid,
                    YDCaptchaID: GameCore.config.YDCaptchaID,
                },
            });
            if (!res.net) {
                this.popupLb.string = "当前无网络连接请检查后重试";
                this.callback = Core.CommonFun.reboot;
                this.popup.active = true;
                return false;
            }
            GameCore.config.device = res.id; //设备ID
            GameCore.config.mobileMan = res.mobileMan; //手机型号
            if (!Core.SystemConfig.isIos) {
                GameCore.config.channelId = res.channelId; //渠道ID
            }
            if (res.openinstallData) {
                GameCore.config.inviteCode = res.openinstallData.inviteCode; //邀请码
            }

            this.hotUpdate = this.node.getComponent(Core.HotUpdate);
            let buildV = this.hotUpdate.getBuildVersion();
            let json = {
                channel: GameCore.config.channelId,
                innerVersion: buildV,
                osType: Core.SystemConfig.isIos ? 2 : 1,
            };
            this.loadLb.string = "正在获取服务器配置";
            let netData: HttpInitCallBack = await Core.httpRequest.send(JSON.stringify(json), "/bdt/init", "POST");

            GameCore.config.isPhoneLogin = netData.loginButtons.phone;
            GameCore.config.isWXLogin = netData.loginButtons.wx;
            GameCore.config.isTouristLogin = netData.loginButtons.tourist;

            if (netData.running.status) {
                this.popupLb.string = netData.running.notice;
                this.callback = () => {
                    cc.game.end();
                };
                this.popup.active = true;
                return false;
            }

            if (netData.appVersion.audit) {
                GameCore.config.isReview = true;
                //TODO 后续要增加测试服，先写死
                GameCore.config.webSocketUrl = "ws://stall-ws-uat.qa.xxg.com/bdt-game-backend";
                GameCore.config.httpUrl = "http://stall-api-uat.qa.xxg.com/bdt-game";
                Core.httpRequest.setUrl(GameCore.config.httpUrl);

                return true;
            }

            await GameService.playAd(SDKAdType.LAUNCH);

            if (parseInt(buildV) >= netData.appVersion.innerVersion) {
                return true;
            }

            if (netData.appVersion.upgradeType == 1) {
                this.loadLb.string = "正在检查更新内容";
                this.hotUpdate.setUrl(netData.appVersion.url);
                let obj: Core.IUpdateCheck = await this.hotUpdate.checkUpdate();
                //检查到需要更新
                if (obj.state == Core.EUpdateState.NEW_VERSION_FOUND) {
                    this.popupLb.string = "检测到内容需要（" + obj.size + "）更新，是否现在更新？";
                    this.callback = this.startUpdate;
                    this.popup.active = true;
                    return false;
                } else if (obj.state == Core.EUpdateState.ALREADY_UP_TO_DATE) {
                    return true;
                } else {
                    this.popupLb.string = "更新模块出错（" + obj.state + "）";
                    this.callback = Core.CommonFun.reboot;
                    this.popup.active = true;
                    return false;
                }
            } else if (netData.appVersion.upgradeType == 2) {
                if (Core.SystemConfig.isIos) {
                    this.popupLb.string = "检测到最新版本，请前去更新";
                    this.callback = () => {
                        cc.sys.openURL(netData.appVersion.url);
                    };
                    this.popup.active = true;
                } else {
                    this.popupLb.string = "检测到最新版本，需要下载安装";
                    this.callback = () => {
                        this.popup.active = false;
                        this.downloaderInstallApk(netData.appVersion.url);
                    };
                    this.popup.active = true;
                }
                return false;
            }
        } else {
            return true;
        }
    }

    protected async startApplication() {
        //初始化全局能用逻辑
        GameCore.init();

        this.loadLb.string = "正在连接服务器";
        if (GameCore.localStorage.getItem(MapLocalStorage.token)) {
            await GameCore.connectSocket(GameCore.localStorage.getItem(MapLocalStorage.token));
        } else {
            await Core.viewManager.openView(R.LoginView);
        }

        return true;
    }

    /**
     * 读取项目配置文件
     */
    private getConfig(): Promise<any> {
        return new Promise((callback) => {
            cc.resources.load(
                "Config/config",
                cc.JsonAsset,
                (completedCount: number, totalCount: number, item: any) => {},
                (error: Error, resource: cc.JsonAsset) => {
                    if (error) {
                        console.log(error);
                        callback(null);
                    } else {
                        callback(resource.json);
                    }
                }
            );
        });
    }

    /**
     * 下载apk并且安装
     * @param url 远程路径
     */
    private downloaderInstallApk(url: string) {
        this.loadLb.string = "正在下载安装包（0%）";
        let fullPath = jsb.fileUtils.getWritablePath() + "stall.apk";
        let downloader = new jsb.Downloader();
        downloader.setOnTaskProgress(
            (
                task: jsb.DownloaderTask,
                bytesReceived: number,
                totalBytesReceived: number,
                totalBytesExpected: number
            ) => {
                if (bytesReceived == totalBytesExpected) {
                    return;
                }
                this.loadProgress.fillRange = totalBytesReceived / totalBytesExpected;
                let num = ((totalBytesReceived / totalBytesExpected) * 100).toFixed(0);
                this.loadLb.string = "正在下载安装包（" + num + "%）";
            }
        );
        downloader.setOnTaskError(
            (task: jsb.DownloaderTask, errorCode: number, errorCodeInternal: number, errorStr: string) => {
                this.popupLb.string = "下载安装包失败（" + errorCode + ")";
                jsb.fileUtils.removeDirectory(fullPath);
                this.callback = () => {
                    cc.game.end();
                };
                this.popup.active = true;
            }
        );
        downloader.setOnFileTaskSuccess((task: jsb.DownloaderTask) => {
            this.loadLb.string = "下载完成正在安装";
            Core.shellRequest.send({
                uri: "/install/apk",
                data: {
                    path: task.storagePath,
                },
            });
        });
        downloader.createDownloadFileTask(url, fullPath); //创建下载任务
    }

    /**
     * 开始更新
     */
    private startUpdate() {
        if (cc.sys.isNative) {
            this.hotUpdate = this.node.getComponent(Core.HotUpdate);
            this.hotUpdate.hotUpdate();

            this.popup.active = false;
            this.initLoadView.active = true;
            this.loadLb.string = "正在更新资源（0%）";
            this.loadProgress.fillRange = 0;
        }
    }

    /**
     * 弹窗回调
     */
    private popupCallBack() {
        if (this.callback) {
            this.callback();
        }
    }

    /**
     * 更新进度
     */
    private hotUpdateSchedule(event: Core.IUpdateEvent) {
        if (event.state == Core.EUpdateState.UPDATE_PROGRESSION) {
            this.loadProgress.fillRange = event.percent;
            let num = (event.percent * 100).toFixed(0);
            this.loadLb.string = "正在更新资源（" + num + "%）";
        } else if (event.state == Core.EUpdateState.UPDATE_FAILED) {
            this.popupLb.string = "更新失败，请重新尝试";
            this.popup.active = true;
            this.callback = Core.CommonFun.reboot;
        }
    }

    /**
     * 工程初始化加载进度
     */
    protected initLoadProgress(num: number) {
        this.popupLb.string = "正在加载资源请稍后";
        this.loadProgress.fillRange = num / 100;
        if (num == 100) {
            this.initLoadView.destroy();
        }
    }
}
