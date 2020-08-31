import ListView from "../component/ListView";
import { MenuButton, MenuButtonEventObj, MenuButtonList, MenuButtonType } from "../component/MenuButton";
import StallItem from "../component/StallItem";
import { TimestampFormatType } from "../Game/game-lib/Utils";
import { GameCore } from "../Game/GameCore";
import { CodeMap } from "../Game/Map/CodeMap";
import { MapGlobalEvent, MapHttpApi, MapLocalStorage, MenuButtonId } from "../Game/service/EventMapService";
import { UserInfoService } from "../Game/service/UserInfoService";
import R from "../R";
import { RewardViewType } from "./RewardLogic";
import { PopupType } from "./SysPopupLogic";
import { GameService, SDKAdType } from "../Game/service/GameService";
import { PromptService } from "../Game/service/PromptService";
import { RedPointService } from "../Game/service/RedPointService";
import NotificationControl from "../Game/control/NotificationControl";
import { WithdrawData } from "./WithdrawLogic";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainLogic extends Core.ViewLogic {
    /** 摊位的zIndex */
    private itemIndex: number = 999;
    style = Core.EViewStyle.FULL;

    /** list 组件 */
    @property(ListView)
    private listView: ListView = null;

    /** 点击事件屏蔽层 */
    @property(cc.Node)
    private shieldLayer: cc.Node = null;
    /** 今日分红文本节点 */
    @property(cc.Label)
    private todayBonus: cc.Label = null;
    /** 今日红包文本节点 */
    @property(cc.Label)
    private redBag: cc.Label = null;
    /** 升级还需要金币文本节点 */
    @property(cc.Label)
    private nextGoldCoin: cc.Label = null;
    /** 当前金币文本节点 */
    @property(cc.Label)
    private currentGoldCoin: cc.Label = null;
    /** 升级按钮 */
    @property(cc.Button)
    private levelUpButton: cc.Button = null;
    /** 玩家头像 */
    @property(cc.Sprite)
    private headIcon: cc.Sprite = null;

    /** 按钮预置体 */
    @property(cc.Prefab)
    private buttonPrefab: cc.Prefab = null;

    /** 按钮列表容器 => top */
    @property(cc.Node)
    private topBtnBox: cc.Node = null;
    /** 按钮列表容器  => top */
    @property(cc.Node)
    private rightBtnBox: cc.Node = null;
    /** 按钮列表容器  => top */
    @property(cc.Node)
    private leftBtnBox: cc.Node = null;

    /** 功能菜单按钮列表资源映射 => top */
    @property([MenuButtonList])
    private buttonResList: MenuButtonList[] = [];
    /** 注册的按钮列表 */
    private menuButtonList: Map<MenuButtonId, MenuButton> = new Map();

    //========== 当前收入相关
    /** 当前收入动画金币按钮列表 */
    @property([cc.Node])
    private revenueIcons: cc.Node[] = [];
    /** 当前收入文本节点 */
    @property(cc.Label)
    private currentRevenue: cc.Label = null;
    /** 收入上限文本节点 */
    @property(cc.Label)
    private upperLimit: cc.Label = null;
    /** 加速按钮节点 */
    @property(cc.Node)
    private addSpeedNode: cc.Node = null;
    /** 加速中节点 */
    @property(cc.Node)
    private addSpeedIngNode: cc.Node = null;
    /** 金币显示下标 */
    private revenueIconIndex: number = -1;
    /** 当前累积收入 */
    private currentRevenueSum: number = 0;
    /** 收入的时间间隔 */
    private currentRevenueInterval = 1000;
    /** 当前收入id */
    private incomeTimeId: number;
    /**
     * 加速倒计时id
     */
    private addTimeId: number;

    /** 需要加速到当前 => 加速金币入使用 */
    private isAddSpeedNow: boolean = false;
    //========== end

    /**
     * 离开的游戏时间
     */
    private leaveTime: number = 0;

    //========== 吆喝相关
    /** 吆喝喇叭资源映射列表 */
    @property([cc.SpriteFrame])
    private yellSpeakerSpriteFrame: cc.SpriteFrame[] = [];
    /** 吆喝喇叭节点 */
    @property(cc.Sprite)
    private yellSpeakerNodeSprite: cc.Sprite = null;
    /**吆喝的按钮 */
    @property(cc.Node)
    private yellNode: cc.Node = null;
    //========== end

    //========== 背景滚动相关
    /** 背景 */
    @property(cc.Node)
    private bg: cc.Node = null;
    /** 云朵容器 */
    @property(cc.Node)
    private cloudsBox: cc.Node = null;
    //========== end

    @Core.module(Core.Audio)
    private audio: Core.Audio = null;
    /** 时间管理器 */
    @Core.module(Core.Timer)
    private timer: Core.Timer = null;
    /** 资源 */
    @Core.module(Core.Res)
    private res: Core.Res = null;

    /** 传入的init数据 */
    private data: xxgBuf.InitRet = null;
    /** 金币对象池 */
    private goldIconPool: cc.NodePool = new cc.NodePool();
    /** 金币预置节点 */
    @property(cc.Prefab)
    private goldIcon: cc.Prefab = null;

    //========== 送审相关
    /** 顶部送审文本 */
    @property(cc.Node)
    private reviewBox: cc.Node = null;
    /** 红包文本 */
    @property(cc.Node)
    private redBoxNode: cc.Node = null;
    /** 转盘按钮 */
    @property(cc.Node)
    private turntableNode: cc.Node = null;
    /** 揽客按钮 */
    @property(cc.Node)
    private inviteNode: cc.Node = null;
    //========== end

    //========== 小手指提示功能相关
    /** 升级小手指 */
    @property(cc.Node)
    private levelUpHand: cc.Node = null;
    /** 金币收入小手指 */
    @property(cc.Node)
    private goldHand: cc.Node = null;
    /** 红包提现小手指 */
    @property(cc.Node)
    private redHand: cc.Node = null;
    //========== end

    /** 升级中 */
    private levelUpIng: boolean = false;
    /** 是否触发过0点更新 */
    private isZeroUpdate: boolean = false;

    init(d: xxgBuf.InitRet) {
        this.data = d;
        NotificationControl.init(d);
    }

    coreOnLoad() {
        if (this.levelUpHand) this.levelUpHand.active = false;
        if (this.goldHand) this.goldHand.active = false;
        if (this.redHand) this.redHand.active = false;
        this.shieldLayer.active = false;
        this.addSpeedIngNode.active = false;
        this.addSpeedNode.active = false;
        this.listView.items = UserInfoService.level + 2;
        this.menuButtonRender();
        this.scheduleOnce(() => {
            this.updateBgHeight();
        });
    }

    async coreStart() {
        //获取是否首次进入过提现
        UserInfoService.enteredWithdraw = GameCore.localStorage.getItem(
            MapLocalStorage.enteredWithdraw,
            UserInfoService.uid
        );
        this.bindViewData();
        //播放背景音效
        this.audio.playMusic(R.Mp3_lobby);
        GameCore.setPoint(MenuButtonId.BIND_REWARD, true);
        this.initViewData();
        //检测是否有公告
        await new Promise((resolve) => {
            GameCore.http.send<NoticeContent[]>(<HttpNoticeObjReq>{}, MapHttpApi.bdt_notice_query).then((data) => {
                if (!data || data.length == 0) {
                    resolve();
                    return;
                }
                GameCore.openPopup({
                    type: PopupType.NOTICE,
                    msg: data[0].content,
                    confirm: () => {
                        resolve();
                    },
                });
            });
        });
        this.offlineIncome();
    }

    coreOnEnable() {
        if (this.isZeroUpdate) {
            this.zeroNoticeUpdate();
        }
    }

    /**
     * 零点更新数据
     */
    @Core.netPush("ZeroNoticePush")
    private zeroNotice() {
        if (this.node.active) {
            this.isZeroUpdate = false;
            this.zeroNoticeUpdate();
        } else {
            this.isZeroUpdate = true;
        }
    }

    /**
     * 零点更新提示
     */
    private zeroNoticeUpdate() {
        Core.viewManager.goToMainView();
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: "新的一天要开始喽！",
            closeButtonShow: false,
            confirm: async () => {
                this.isZeroUpdate = false;
                this.updateViewData(true);
            },
        });
    }

    /**
     * 更新界面数据
     */
    @Core.event(MapGlobalEvent.updateGame)
    private async updateViewData(newDay = false) {
        let net = await Core.webSockets.send<xxgBuf.InitRet>("InitReq", new xxgBuf.InitReq(), true);
        if (net) {
            if (newDay) PromptService.prompt("新的一天开始啦！");
            UserInfoService.init(net);
            this.init(net);
            this.initViewData();
        } else {
            //TODO临时修改
            GameCore.openPopup({ type: PopupType.HINT, msg: "服务器数据错误！" });
        }
    }

    /**
     * 初始化界面数据
     */
    private initViewData() {
        this.setCurrentIncome();
        this.setAddRevenueSpeed(UserInfoService.advUpTime, UserInfoService.advMultiple);
        //幸运宝箱
        switch (this.data.lBox.boxStatus) {
            case 1: //可领取
                this.updateLuckyBox(true);
                break;
            case 2: //计时中
                this.updateLuckyBox(true, this.data.lBox.second + Date.now());
                break;
            case 3: //已领取
                this.updateLuckyBox(false);
                break;
        }

        //等级奖励
        if (this.data.grade.gradeStatus == 2) {
            //不可领取
            if (this.data.grade.gradeLevel) {
                this.updateLevelRewardButton(false, `${this.data.grade.gradeLevel}级可领取`);
            } else {
                this.updateLevelRewardButton(false);
            }
        } else {
            this.updateLevelRewardButton(true);
        }

        //加速按钮状态
        if (!this.data.accelerateNumber) {
            this.addSpeedNode.getComponent(cc.Button).interactable = false;
            this.addSpeedNode.getChildByName("spine").active = false;
        }

        //送审功能
        if (GameCore.config.isReview) {
            this.inviteNode.active = false;
            this.turntableNode.active = false;
            this.reviewBox.active = true;
            this.redBoxNode.active = false;
            this.setMenuButtonShow({ id: MenuButtonId.SUPREME, show: false });
            this.setMenuButtonShow({ id: MenuButtonId.RANK, show: false });
            this.setMenuButtonShow({ id: MenuButtonId.BOUTIQUE, show: false });
            this.setMenuButtonShow({ id: MenuButtonId.GAME, show: false });
        }
    }

    /**
     * 绑定界面数据=> 包括红点
     */
    private bindViewData() {
        this.coreOnModel(UserInfoService, "todayProfit", (e) => {
            if (this.todayBonus) this.todayBonus.string = e + "";
        });
        this.coreOnModel(UserInfoService, "redBag", (e) => {
            if (this.redBag) this.redBag.string = e + "";
            this.redHand.active = e >= 0.5 && !this.data.isWithdraw;
        });
        this.coreOnModel(UserInfoService, "enteredWithdraw", (e) => {
            this.redHand.active = !e && UserInfoService.redBag >= 0.5;
        });

        this.coreOnModel(UserInfoService, "upperLimit", (e) => {
            if (this.upperLimit) this.upperLimit.string = e + "";
        });
        this.coreOnModel(UserInfoService, "currentGoldCoin", (e) => {
            if (this.currentGoldCoin) this.currentGoldCoin.string = "当前金币：" + e;
            if (UserInfoService.level < 200) this.levelUpHand.active = e >= UserInfoService.nextGoldCoin;
        });
        this.coreOnModel(UserInfoService, "nextGoldCoin", (e) => {
            if (this.nextGoldCoin) this.nextGoldCoin.string = "升级消耗：" + e;
        });
        this.coreOnModel(UserInfoService, "yellCount", (e) => {
            this.setYellSpeaker(e);
        });

        this.coreOnModel(UserInfoService, "headPortrait", (e: string) => {
            if (!e) {
                return;
            }
            if (e.indexOf("http") !== -1) {
                this.res.loadExternal(e).then((e) => {
                    this.headIcon.spriteFrame = new cc.SpriteFrame(e);
                });
            }
        });

        //红点逻辑
        this.coreOnModel(RedPointService, "dailyTask", (e: boolean) => {
            GameCore.setPoint(MenuButtonId.DAILY_TASK, e);
        });
        this.coreOnModel(RedPointService, "singIn", (e: boolean) => {
            GameCore.setPoint(MenuButtonId.SING_IN, e);
        });
    }

    /**
     * 主场景列表渲染事件
     */
    private mainListRender(item: cc.Node, idx: number) {
        let component = item.getComponent(StallItem);
        component.node.zIndex = this.itemIndex - idx;
        component.setData(idx, this.listView.items);
    }

    /**
     * 滚动事件
     */
    private scrollEvent(e: cc.ScrollView) {
        let y = e.getScrollOffset().y,
            maxY = this.bg.height - this.listView.scrollView.node.height - 184;

        if (y < 0) {
            y = 0;
        }
        if (y > maxY) {
            y = maxY;
        }

        this.bg.y = y;

        let cloudsY = this.cloudsBox.height - this.listView.scrollView.node.height;

        if (cloudsY < 0) cloudsY = 0;
        this.cloudsBox.y = cloudsY * (y / maxY);
    }

    /**
     * 背景高度
     */
    private updateBgHeight() {
        let addH = 610;
        if (this.listView.items <= 3) {
            //这个获取到的是scroll的遮罩层
            if (this.listView.scrollView.node.height > 1334) {
                addH = 970;
            } else {
                addH = 770;
            }
        }

        this.bg.height = (this.listView.items - 2) * 360 + addH + 300;

        this.cloudsBox.height =
            this.bg.height * 0.8 < this.listView.scrollView.node.height
                ? this.listView.scrollView.node.height
                : this.bg.height * 0.8;
    }

    /**
     * 离线功能
     */
    private offlineIncome() {
        if (this.data.offlineIncome) {
            GameCore.openRewardView({
                type: RewardViewType.GOLD,
                msg: this.data.offlineIncome,
                title: "恭喜获取离线奖励!",
                times: this.data.videoNumber,
                timesLabelHide: true,
                gainByAdConfirm: async (v) => {
                    await GameService.playAd(SDKAdType.NORMAL);
                    await v.close();
                    let data = await Core.webSockets.send<xxgBuf.StallGoldRet>(
                        "StallGoldReq",
                        new xxgBuf.StallGoldReq({ type: 1 })
                    );
                    this.data.videoNumber = data.videoNumber;
                    GameCore.openRewardView({
                        type: RewardViewType.GOLD_REWARD,
                        msg: data.gold * 2,
                        gainConfirm: () => {
                            UserInfoService.currentGoldCoin = data.totalGold;
                        },
                    });
                },
            });
        }
    }

    //=============== 功能菜单按钮

    /**
     * 等级奖励按钮状态更新
     * @param receive 按钮领取状态
     * @param txt 下一级可领取文本
     */
    private updateLevelRewardButton(receive: boolean, txt?: string) {
        let btn = this.getMenuButtonById(MenuButtonId.LEVEL_REWARD);

        if (txt) {
            btn.setReceiveState(receive, false);
            btn.setName(txt, "#e26a12");
        } else {
            btn.setReceiveState(receive);
            if (!receive) {
                this.setMenuButtonShow({ id: MenuButtonId.LEVEL_REWARD, show: false });
            }
        }
        btn.setHandShow(receive);
    }

    /**
     * 更新幸运宝箱按钮
     * @param receive 是否可领取 (如果有time，这个值就是倒计时结束以后要变化的值)
     * @param time 结束时的时间戳
     */
    private async updateLuckyBox(receive: boolean, endTime: number = 0) {
        let btn = this.getMenuButtonById(MenuButtonId.LUCKY_BOK);
        if (btn) {
            let time = endTime - Date.now();
            if (time > 0) {
                btn.setReceiveState(false, false);
                btn.setName(GameCore.utils.timestampFormat(time, TimestampFormatType.MM_SS));
                // time--;
                GameCore.setPoint(MenuButtonId.LUCKY_BOK, false);
                await this.timer.setTimeout(1000).promise;

                return this.updateLuckyBox(receive, endTime);
            } else {
                if (receive) {
                    this.data.lBox.boxStatus = 1;
                    GameCore.setPoint(MenuButtonId.LUCKY_BOK, true);
                } else {
                    GameCore.setPoint(MenuButtonId.LUCKY_BOK, false);
                }
                btn.setReceiveState(receive);
            }
        }
    }

    /**
     * 通过按钮id获取一个按钮的组件
     */
    private getMenuButtonById(id: MenuButtonId): MenuButton | null {
        return this.menuButtonList.get(id);
    }

    /**
     * 设置指定按钮显示或是隐藏
     * @param data 按钮状态控制数据
     */
    @Core.event(MapGlobalEvent.updateMenuButtonState)
    private setMenuButtonShow(data: MenuButtonEventObj) {
        if (this.menuButtonList.has(data.id)) {
            this.menuButtonList.get(data.id).node.active = data.show;
        }
    }

    /**
     * 渲染按钮列表
     */
    private menuButtonRender() {
        let list = [],
            x = 0,
            l = 0;

        list = this.getButtonListByType(MenuButtonType.TOP);
        for (l = list.length; x < l; x++) {
            this.topBtnBox.addChild(this.createMenuBtn(list[x].id));
        }
        list = this.getButtonListByType(MenuButtonType.RIGHT);
        x = 0;
        for (l = list.length; x < l; x++) {
            this.rightBtnBox.addChild(this.createMenuBtn(list[x].id));
        }
        list = this.getButtonListByType(MenuButtonType.LEFT);
        x = 0;
        for (l = list.length; x < l; x++) {
            this.leftBtnBox.addChild(this.createMenuBtn(list[x].id));
        }
    }

    /**
     * 通过按钮类型获取按钮列表
     */
    private getButtonListByType(type: MenuButtonType) {
        let list = [],
            btnList = this.data.buttonList;
        for (let x = 0, l = btnList.length; x < l; x++) {
            if (btnList[x].type === type) {
                list.push(btnList[x]);
            }
        }
        return list;
    }

    /**
     * 创建一个菜单按钮 绑定相应资源
     * @param id 按钮id
     */
    private createMenuBtn(id: MenuButtonId) {
        let btn = cc.instantiate(this.buttonPrefab),
            control = btn.getComponent(MenuButton),
            resList = this.buttonResList;
        control.init(id);
        for (let x = resList.length - 1; x > -1; x--) {
            if (resList[x].buttonId == id) {
                if (resList[x].spriteFrame) {
                    control.setSpriteFrame(resList[x].spriteFrame);
                }
                if (resList[x].skeletonData) {
                    control.setSpine(resList[x].skeletonData);
                }
                if (resList[x].name) {
                    control.setName(resList[x].name);
                }
                break;
            }
        }

        control.onClick = (e) => this.menuClickEvent(e);
        this.menuButtonList.set(id, control);
        return btn;
    }

    private tag = true;

    /**
     * 菜单按钮点击事件
     */
    @Core.event(MapGlobalEvent.mainMenuTrigger)
    private async menuClickEvent(e: MenuButtonId) {
        switch (e) {
            case MenuButtonId.RANK:
                break;
            // case MenuButtonId.GUIDE_BOOK:
            //     break;
            case MenuButtonId.LUCKY_BOK:
                //幸运宝箱
                this.onLuckyBox();
                break;
            case MenuButtonId.SING_IN:
                let signData = await Core.webSockets.send<xxgBuf.ISignInRet>("SignInReq", new xxgBuf.SignInReq({}));
                if (signData) Core.viewManager.openView(R.SignInView, signData);
                break;
            case MenuButtonId.DAILY_TASK:
                let dailyData = await Core.webSockets.send<xxgBuf.IDailyTaskRet>(
                    "DailyTaskReq",
                    new xxgBuf.DailyTaskReq({})
                );
                if (dailyData) Core.viewManager.openView(R.DailyTaskView, dailyData);
                break;
            case MenuButtonId.SUPREME:
                break;
            // case MenuButtonId.SUPREME:
            //     break;
            case MenuButtonId.LEVEL_REWARD:
                if (this.data.grade.gradeStatus == 2) {
                    //不可领取
                    GameCore.openPopup({
                        type: PopupType.HINT,
                        msg: this.data.grade.gradeLevel ? `升级到${this.data.grade.gradeLevel}级可领取` : "奖励已领完",
                    });
                    break;
                }
                Core.webSockets.send<xxgBuf.GradReceiveRet>("GradReceiveReq", xxgBuf.GradReceiveReq).then((d) => {
                    if (d) {
                        if (d.type == 1) {
                            if (d.status == 2) {
                                //不可领取
                                if (d.gradeLevel) {
                                    this.updateLevelRewardButton(false, `${d.gradeLevel}可领取`);
                                } else {
                                    this.updateLevelRewardButton(false);
                                }
                            } else {
                                this.updateLevelRewardButton(true);
                            }

                            this.data.grade.gradeLevel = d.gradeLevel;
                            this.data.grade.gradeStatus = d.status;

                            GameCore.openRewardView({
                                type: RewardViewType.GOLD,
                                msg: d.gold,
                                times: d.count,
                                gainConfirm: () => {
                                    //金币
                                    UserInfoService.currentGoldCoin = d.totalGold;
                                },
                                gainByAdConfirm: async (v) => {
                                    await GameService.playAd(SDKAdType.NORMAL);
                                    await v.close();

                                    let data = await Core.webSockets.send<xxgBuf.GradVideoGetMoneyRet>(
                                        "GradVideoGetMoneyReq",
                                        new xxgBuf.GradVideoGetMoneyReq({ money: d.gold })
                                    );
                                    if (data) {
                                        this.data.videoNumber--;
                                        GameCore.openRewardView({
                                            type: RewardViewType.GOLD_REWARD,
                                            msg: data.balance * 2,
                                            gainConfirm: () => {
                                                UserInfoService.currentGoldCoin = data.totalBalance;
                                            },
                                        });
                                    }
                                },
                            });
                        } else {
                            //转盘
                        }
                    }
                });
                break;
            case MenuButtonId.BIND_REWARD:
                let bindData = await Core.webSockets.send<xxgBuf.IRedBagConfigRet>(
                    "RedBagConfigReq",
                    new xxgBuf.RedBagConfigReq({})
                );
                if (bindData) Core.viewManager.openView(R.BindingGiftView, bindData);
                break;
            case MenuButtonId.NOVICE:
                Core.webSockets.send<xxgBuf.NoviceBagSaveRet>("NoviceBagSaveReq", xxgBuf.NoviceBagSaveReq).then((e) => {
                    if (!e) {
                        this.setMenuButtonShow({ id: MenuButtonId.NOVICE, show: false });
                        return;
                    }
                    if (e.goldReceive) {
                        GameCore.openRewardView({
                            type: RewardViewType.NOVICE_REWARD_GOLD,
                            msg: e.goldReceive.gold,
                            gainConfirm: () => {
                                UserInfoService.currentGoldCoin = e.goldReceive.totalGold;
                                if (e.redBagReceive) {
                                    GameCore.openRewardView({
                                        type: RewardViewType.NOVICE_REWARD_RED,
                                        msg: e.redBagReceive.redBag / 100,
                                        gainConfirm: () => {
                                            this.setMenuButtonShow({ id: MenuButtonId.NOVICE, show: false });
                                            UserInfoService.redBag = e.redBagReceive.totalRedBag / 100;
                                        },
                                    });
                                }
                            },
                        });
                    }
                });

                break;
            // case MenuButtonId.GAME:
            //     break;
            // case MenuButtonId.BOUTIQUE:
            //     break;
            default:
                GameCore.openPopup({ type: PopupType.HINT, msg: "即将开放，敬请期待！" });
                break;
        }
    }

    /**
     * 幸运宝箱
     */
    private onLuckyBox() {
        switch (this.data.lBox.boxStatus) {
            case 1: //可领取
                Core.webSockets
                    .send<xxgBuf.LuckyBoxReceiveRet>("LuckyBoxReceiveReq", xxgBuf.LuckyBoxReceiveReq)
                    .then((e) => {
                        if (e) {
                            let type: RewardViewType;
                            switch (e.type) {
                                case 1: //金币
                                    type = RewardViewType.GOLD;

                                    if (e.status == 2) {
                                        this.updateLuckyBox(true, e.second + Date.now());
                                    } else {
                                        this.updateLuckyBox(false);
                                    }
                                    this.data.lBox.boxStatus = e.status;
                                    break;
                                case 2: //红包
                                    type = RewardViewType.RED;
                                    break;
                                case 3: //幸运转盘
                                    type = RewardViewType.DIAL;
                                    break;
                            }

                            GameCore.openRewardView({
                                type: type,
                                msg: e.balance,
                                times: e.count,
                                gainConfirm: () => {
                                    if (type == RewardViewType.GOLD) {
                                        UserInfoService.currentGoldCoin = e.totalGold;
                                    }
                                },
                                gainByAdConfirm: (v) => {
                                    GameService.playAd(SDKAdType.NORMAL).then(() => {
                                        switch (e.type) {
                                            case 1: //金币
                                                Core.webSockets
                                                    .send<xxgBuf.VideoGetMoneyRet>(
                                                        "VideoGetMoneyReq",
                                                        xxgBuf.VideoGetMoneyReq
                                                    )
                                                    .then((d) => {
                                                        if (d) {
                                                            v.close().then(() => {
                                                                GameCore.openRewardView({
                                                                    type: RewardViewType.GOLD_REWARD,
                                                                    msg: d.balance * 2,
                                                                    gainConfirm: () => {
                                                                        UserInfoService.currentGoldCoin =
                                                                            d.totalBalance;
                                                                    },
                                                                });
                                                            });
                                                            this.data.videoNumber--;
                                                        }
                                                    });
                                                break;
                                            case 2: //红包
                                                Core.webSockets
                                                    .send<xxgBuf.VideoGetRedPacketRet>(
                                                        "VideoGetRedPacketReq",
                                                        xxgBuf.VideoGetRedPacketReq
                                                    )
                                                    .then((d) => {
                                                        if (d) {
                                                            if (d.status == 2) {
                                                                this.updateLuckyBox(true, d.second + Date.now());
                                                            } else {
                                                                this.updateLuckyBox(false);
                                                            }
                                                            this.data.lBox.boxStatus = d.status;
                                                            v.close().then(() => {
                                                                GameCore.openRewardView({
                                                                    type: RewardViewType.RED_REWARD,
                                                                    msg: d.balance / 100,
                                                                    gainConfirm: () => {
                                                                        UserInfoService.redBag = d.totalBalance / 100;
                                                                    },
                                                                });
                                                            });
                                                        }
                                                    });
                                                break;
                                            case 3: //幸运转盘
                                                break;
                                        }
                                    });
                                },
                            });
                        }
                    });
                break;
            case 2: //计时中
                GameCore.openPopup({ type: PopupType.HINT, msg: "宝箱正在蓄力中" });
                break;
            case 3: //已领取
                GameCore.openPopup({ type: PopupType.HINT, msg: "今日领奖次数已用完，请明日再领" });
                break;
        }
    }

    //=============== end =====

    /**
     * 打开个人中心
     */
    private openUserInfo() {
        Core.viewManager.openView(R.SettingView);
    }

    /**
     * 提现
     */
    private async withDrawEvent() {
        await WithdrawData.requestNet();
        Core.viewManager.openView(R.WithdrawView);
    }

    /**
     * 邀请
     */
    private async invitationView() {
        if (!UserInfoService.bindWx) {
            GameCore.openPopup({
                type: PopupType.HINT,
                msg: "绑定微信后开启揽客功能，是否前往绑定？",
                confirm: async () => {
                    if (cc.sys.isNative) {
                        GameService.wxLogin()
                            .then(async (code) => {
                                if (code) {
                                    let netData = await Core.webSockets.send<xxgBuf.BindingWxRet>(
                                        "BindingWxReq",
                                        new xxgBuf.BindingWxReq({ wxCode: code })
                                    );

                                    if (netData) {
                                        UserInfoService.nickname = netData.user.nickname;
                                        UserInfoService.setHeadPortrait(netData.user.headPortrait);
                                        PromptService.prompt("微信绑定成功");
                                        UserInfoService.bindWx = true;
                                    }
                                } else {
                                    PromptService.prompt("微信验证失败");
                                }
                            })
                            .catch(() => {
                                PromptService.prompt("微信验证超时");
                            });
                    }
                },
            });
            return;
        }

        let invDataNet = await Core.webSockets.send<xxgBuf.IInvitationRet>(
            "InvitationReq",
            new xxgBuf.InvitationReq({})
        );
        let myInvDataNet = await Core.webSockets.send<xxgBuf.IMyInvitationRet>(
            "MyInvitationReq",
            new xxgBuf.MyInvitationReq({})
        );
        if (invDataNet && myInvDataNet) {
            Core.viewManager.openView(R.InvitationView, { invData: invDataNet, myInvData: myInvDataNet });
        }
    }

    /**
     * 升级
     */
    private async levelUp() {
        if (this.levelUpIng) return;

        //金币 不足，看广告获取金币
        if (UserInfoService.currentGoldCoin < UserInfoService.nextGoldCoin) {
            GameCore.openRewardView({
                type: RewardViewType.GOLD_AD,
                msg: 1000,
                times: this.data.videoNumber,
                gainByAdConfirm: async (e) => {
                    await GameService.playAd(SDKAdType.NORMAL);
                    await e.close();
                    let d = await Core.webSockets.send<xxgBuf.StallGoldRet>(
                        "StallGoldReq",
                        new xxgBuf.StallGoldReq({ type: 3 })
                    );
                    this.data.videoNumber = d.videoNumber;

                    GameCore.openRewardView({
                        type: RewardViewType.GOLD_REWARD,
                        msg: d.gold,
                        gainConfirm: () => {
                            UserInfoService.currentGoldCoin = d.totalGold;
                        },
                    });
                },
                cancel: () => {},
            });
            return;
        }
        this.shieldLayer.active = true;
        let d = await Core.webSockets.send<xxgBuf.UpgradeRet>("UpgradeReq", xxgBuf.UpgradeReq);
        if (!d) {
            this.shieldLayer.active = false;
            return;
        }

        this.data.grade.gradeStatus = d.gradeStatus;
        if (d.gradeStatus == 1) {
            this.updateLevelRewardButton(true);
        }

        this.levelUpIng = true;
        UserInfoService.outputs = d.outputs;
        UserInfoService.upperLimit = d.upperLimit;
        UserInfoService.level = d.level;
        this.setCurrentIncome();

        UserInfoService.currentGoldCoin -= UserInfoService.nextGoldCoin;

        this.listView.addItemTop().then(async (e) => {
            this.updateBgHeight();
            let control = e.getComponent(StallItem);
            await control.setDecoration();

            UserInfoService.nextGoldCoin = d.nextLevelMoney;
            await new Promise((resolve) => {
                GameCore.openRewardView({
                    type: RewardViewType.GOLD,
                    msg: d.gold,
                    times: this.data.videoNumber,
                    gainConfirm: () => {
                        UserInfoService.currentGoldCoin = d.currentMoney;
                        this.levelUpIng = false;
                        resolve();
                        if (!d.redBak) this.shieldLayer.active = false;
                        //幸运转盘功能暂时不接入
                    },
                    gainByAdConfirm: async (v) => {
                        this.levelUpIng = false;
                        await GameService.playAd(SDKAdType.NORMAL);
                        await v.close();
                        let data = await Core.webSockets.send<xxgBuf.StallGoldRet>(
                            "StallGoldReq",
                            new xxgBuf.StallGoldReq({ type: 2 })
                        );

                        this.data.videoNumber = data.videoNumber;
                        GameCore.openRewardView({
                            type: RewardViewType.GOLD_REWARD,
                            msg: data.gold * 2,
                            gainConfirm: () => {
                                UserInfoService.currentGoldCoin = data.totalGold;
                                resolve();
                                this.shieldLayer.active = false;
                            },
                        });
                    },
                });
            });

            if (d.redBak) {
                GameCore.openRewardView({
                    type: RewardViewType.RED,
                    msg: 99,
                    gainByAdConfirm: async (v) => {
                        await GameService.playAd(SDKAdType.NORMAL);
                        await v.close();
                        let data = await Core.webSockets.send<xxgBuf.UpgradeRedEnvelopeRet>(
                            "UpgradeRedEnvelopeReq",
                            xxgBuf.UpgradeRedEnvelopeReq
                        );
                        GameCore.openRewardView({
                            type: RewardViewType.RED_REWARD,
                            msg: data.redEnvelope / 100,
                            gainConfirm: () => {
                                UserInfoService.redBag = data.totalRedEnvelope / 100;
                            },
                        });
                    },
                });
            }
        });
    }

    //=============== 当前收入功能

    /**
     * 设置当前收入
     */
    private async setCurrentIncome() {
        if (this.revenueIconIndex < 0) {
            this.revenueIcons.forEach((e) => (e.active = false));
        }

        if (this.incomeTimeId) this.timer.clearTimeout(this.incomeTimeId);
        let { id, promise } = this.timer.setTimeout(this.currentRevenueInterval);
        this.incomeTimeId = id;
        await promise;

        if (this.revenueIconIndex < this.revenueIcons.length) {
            this.revenueIconIndex++;
            let icon = this.revenueIcons[this.revenueIconIndex];
            if (icon) {
                icon.active = true;
                icon.setScale(0);
                cc.Tween.stopAllByTarget(icon);
                icon.y = 100;
                cc.Tween.stopAllByTarget(icon);
                cc.tween(icon)
                    .to(0.3, { scale: 1 }, { easing: "backOut" })
                    .to(0.6, { y: this.revenueIconIndex > 3 ? 9 : -11 }, { easing: "bounceOut" })
                    .start();
            }
        }

        UserInfoService.currentRevenue +=
            UserInfoService.outputs *
            UserInfoService.advMultiple *
            (this.isAddSpeedNow ? Math.ceil(this.leaveTime / 1000) : 1);
        this.isAddSpeedNow = false;
        if (UserInfoService.currentRevenue >= UserInfoService.upperLimit) {
            UserInfoService.currentRevenue = UserInfoService.upperLimit;
            this.goldHand.active = true;
        } else {
            this.goldHand.active = false;
        }
        if (this.currentRevenue) this.currentRevenue.string = UserInfoService.currentRevenue + "";

        if (UserInfoService.currentRevenue === UserInfoService.upperLimit) {
            return;
        }

        return this.setCurrentIncome();
    }

    @Core.event(Core.CoreEventMap.CORE_ON_HIDE)
    private onHide() {
        this.leaveTime = Date.now();
    }
    @Core.event(Core.CoreEventMap.CORE_ON_SHOW)
    private onShow() {
        this.leaveTime = Date.now() - this.leaveTime;
        this.isAddSpeedNow = true;
    }

    /**
     * 收取金币
     */
    private async gatherGoldAnimation() {
        if (!UserInfoService.currentRevenue) return;

        let d = await Core.webSockets.send<xxgBuf.CollectMoneyRet>("CollectMoneyReq", xxgBuf.CollectMoneyReq);
        if (!d) return;

        UserInfoService.currentGoldCoin = d.currentMoney;

        this.revenueIconIndex = -1;
        UserInfoService.currentRevenue = 0;

        if (this.currentRevenue) this.currentRevenue.string = 0 + "";

        let node: cc.Node;
        return new Promise((resolve) => {
            this.revenueIcons.forEach((e, index) => {
                if (!e.active) return;
                node = this.createGoldIcon();
                e.active = false;
                node.x = e.x;
                node.parent = e.parent;
                node.setScale(1);
                node.active = true;
                if (index < 4) {
                    node.y = -11;
                } else {
                    node.y = 9;
                }
                cc.tween(node)
                    .delay(0.1 * index)
                    .to(0.3, { y: node.y + 50 }, { easing: "backOut" })
                    .repeat(2, cc.tween(node).to(0.3, { scaleX: -1 }).to(0.3, { scaleX: 1 }))
                    .call((e: cc.Node) => {
                        let end = e.parent.convertToNodeSpaceAR(
                            this.levelUpButton.node.convertToWorldSpaceAR(cc.v2(0, 0))
                        );

                        cc.tween(e)
                            .to(0.6, { x: end.x, y: end.y }, { easing: "backIn" })
                            .call(() => this.goldIconPool.put(e))
                            .start();
                    })
                    .start();
            });
            this.scheduleOnce(() => {
                this.setCurrentIncome();
            });
            this.scheduleOnce(() => {
                // this.setCurrentIncome();
                resolve();
            }, 3);
        });
    }

    /**
     * 摊位加速次数已用完!
     */
    @Core.code(CodeMap.ADV_UP_COUNT)
    private code_6001(code) {
        GameCore.openPopup({
            type: PopupType.HINT,
            msg: `今日加速次数已达上限!(${code})`,
            closeButtonShow: false,
            confirm: () => {
                this.addSpeedNode.getComponent(cc.Button).interactable = false;
                this.addSpeedNode.getChildByName("spine").active = false;
            },
        });
    }

    /**
     * 加速金币收入
     */
    private addRevenueSpeed() {
        if (UserInfoService.advMultiple > 1) {
            GameCore.prompt("加速中。。。");
            return;
        }
        if (!this.data.accelerateNumber) {
            this.code_6001(6001);
            return;
        }
        Core.viewManager.openView(R.IncomeHintView, {
            times: this.data.accelerateNumber,
            time: this.data.advUpTimeConfig,
            call: () => {
                Core.webSockets.sendUDP("WatchVideoUdp", xxgBuf.WatchVideoUdp);
                Core.webSockets.send<xxgBuf.AccelerateRet>("AccelerateReq", new xxgBuf.AccelerateReq()).then((e) => {
                    if (e) {
                        this.setAddRevenueSpeed(e.advUpTime, e.advUpDouble);
                        if (e.accelerateNumber) {
                            this.data.accelerateNumber = e.accelerateNumber;
                        } else {
                            this.addSpeedNode.getComponent(cc.Button).interactable = false;
                            this.addSpeedNode.getChildByName("spine").active = false;
                        }
                    }
                });
            },
        });
    }

    /**
     * 设置加速时间和倍数
     */
    private setAddRevenueSpeed(time: number, advUpDouble: number = 1) {
        UserInfoService.advUpTime = time;
        UserInfoService.advMultiple = advUpDouble;

        if (time) {
            this.addSpeedIngNode.active = true;
            this.addSpeedNode.active = false;
        } else {
            this.addSpeedNode.active = true;
            this.addSpeedIngNode.active = false;
            return;
        }
        if (this.addTimeId) this.timer.clearInterval(this.addTimeId);

        this.addSpeedIngNode.getChildByName("timeLb").getComponent(cc.Label).string = GameCore.utils.timestampFormat(
            UserInfoService.advUpTime * 1000,
            TimestampFormatType.MM_SS
        );
        let endTime = UserInfoService.advUpTime * 1000 + Date.now();
        this.addTimeId = this.timer.setInterval(() => {
            if (endTime - Date.now() <= 0) {
                UserInfoService.advMultiple = 1;
                this.addSpeedNode.active = true;
                this.addSpeedIngNode.active = false;
                if (this.addTimeId) this.timer.clearInterval(this.addTimeId);
            }
            this.addSpeedIngNode
                .getChildByName("timeLb")
                .getComponent(cc.Label).string = GameCore.utils.timestampFormat(
                endTime - Date.now(),
                TimestampFormatType.MM_SS
            );
        }, 1000);
    }
    //=============== end =====

    //=============== 吆喝功能
    /**
     * 设置吆喝按钮喇叭状态
     * @param times 点击按钮次数
     */
    private setYellSpeaker(times: number = 0) {
        this.yellSpeakerNodeSprite.spriteFrame = this.yellSpeakerSpriteFrame[times];
    }

    /**
     * 吆喝按钮点击事件
     */
    private yellClickEvent() {
        Core.webSockets.send<xxgBuf.YellRet>("YellReq", new xxgBuf.YellReq()).then(async (e) => {
            if (!e) return;

            UserInfoService.yellCount = e.yellCount ? e.yellCount : 0;

            if (!UserInfoService.yellCount) {
                this.yellNode.getComponent(cc.Button).interactable = false;
                this.yellSpeakerNodeSprite.setMaterial(0, cc.Material.getBuiltinMaterial("2d-gray-sprite"));
                this.timer.setTimeout(10000).promise.then(() => {
                    this.yellSpeakerNodeSprite.setMaterial(0, cc.Material.getBuiltinMaterial("2d-sprite"));
                    this.yellNode.getComponent(cc.Button).interactable = true;
                });
            }

            if (e.obtainMoney) {
                await new Promise((resolve) => {
                    //触发获取金币
                    GameCore.openRewardView({
                        type: RewardViewType.GOLD_REWARD,
                        msg: e.obtainMoney,
                        gainConfirm: () => {
                            resolve();
                            UserInfoService.currentGoldCoin = e.currentMoney;
                        },
                    });
                    this.audio.playSound(R.Mp3_collectcoin);
                });
            }

            //触发得到红包 => 查看广告， 领红包
            if (e.isTriggerRedBag) {
                GameCore.openRewardView({
                    type: RewardViewType.RED,
                    msg: 99,
                    gainByAdConfirm: async (v) => {
                        await GameService.playAd(SDKAdType.NORMAL);
                        v.close().then(() => {
                            Core.webSockets
                                .send<xxgBuf.YellRedBagReceiveRet>("YellRedBagReceiveReq", xxgBuf.YellRedBagReceiveReq)
                                .then((d) => {
                                    if (d) {
                                        GameCore.openRewardView({
                                            type: RewardViewType.RED_REWARD,
                                            msg: d.balance / 100,
                                            gainConfirm: () => {
                                                UserInfoService.redBag = d.totalBalance / 100;
                                            },
                                        });
                                    }
                                });
                        });
                    },
                });
            }
        });
    }

    /**
     * 吆喝时间没有超过10秒!
     */
    @Core.code(CodeMap.YELL_TIME_SHORT)
    private yellTimeShort(code) {
        GameCore.openPopup({ type: PopupType.HINT, msg: `吆喝得太快喽，休息一下~(${code})` });
    }

    //=============== end =====

    /**
     * 创建一个金币icon
     */
    private createGoldIcon() {
        if (this.goldIconPool.size()) {
            return this.goldIconPool.get();
        }
        return cc.instantiate(this.goldIcon);
    }
}
