import ViewAnimation from "../component/ViewAnimation";
import R from "../R";
import { GameCore } from "../Game/GameCore";

const { ccclass, property } = cc._decorator;

/**
 * 可领取奖励的类型
 */
export const enum RewardViewType {
    /** 转盘=>查看广告 */
    DIAL = 1,
    /** 转盘广告后的奖励 */
    DIAL_REWARD = 2,
    /** 普通金币获取 => 查看广告 => 有两个按钮 直接领取和双倍 */
    GOLD = 3,
    /** 成功获取金币奖励 */
    GOLD_REWARD = 4,
    /** 领取爱心 => 查看广告 */
    RED = 5,
    /** 成功领取爱心奖励 */
    RED_REWARD = 6,
    /** 新手礼包 => 金币 */
    NOVICE_REWARD_GOLD = 7,
    /** 新手礼包 => 爱心 */
    NOVICE_REWARD_RED = 8,
    /**看广告领取金币 */
    GOLD_AD = 9,
    /** 转盘爱心碎片奖励 */
    FRAGMENTS_REWARD = 10,
    /** 转盘 华为手机奖励 */
    PHONE_REWARD = 11,
}

/**
 * 提示框传入数据类型结构
 */
export interface RewardObject {
    /**
     * 弹窗类型
     */
    type: RewardViewType;
    /** 金额 */
    msg: number;
    /** 观看视频剩余次数 */
    times?: number;
    /** 次数文本隐藏 */
    timesLabelHide?: boolean;
    /** 直接领取 */
    gainConfirm?: { (e: RewardLogic): void };
    /** 查看广告领取奖励 */
    gainByAdConfirm?: { (e: RewardLogic): void };
    /** 关闭或取消事件 */
    cancel?: { (e: RewardLogic): void };
    /** 打开界面回调 可以获取到当前打开弹窗的实例，用来关闭指定弹窗 */
    openCall?: { (e: RewardLogic): void };
    /**直接领取按钮显示隐藏 */
    confirmButtonDirect?: boolean;
    /** 标题 */
    title?: string;
}

/**
 * 奖励 => 幸运转盘，领取金币，领取爱心，摊位升级等
 */
@ccclass
export class RewardLogic extends Core.ViewLogic {
    /** 艺术字映射 */
    static fontMap = {
        // "0": "01",
        // "1": "23",
        // "2": "45",
        // "3": "67",
        // "4": "89",
        // "5": ":;",
        // "6": "<=",
        // "7": ">?",
        // "8": "@A",
        // "9": "BC",
        // "+": "DE",
        // ".": "F",
        "0": "0",
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
        "+": ":",
        ".": ";",
    };

    /** 数据缓存 */
    private data: RewardObject | null = null;

    /** 内容容器节点 */
    @property(cc.Node)
    private contentNode: cc.Node = null;
    /** 关闭按钮 */
    @property(cc.Node)
    private closeBtn: cc.Node = null;
    /** 开心收入按钮 */
    @property(cc.Node)
    private happyGetBtn: cc.Node = null;
    /** 看广告领取奖励按钮 => blue */
    @property(cc.Node)
    private gainAd: cc.Node = null;
    /** 看广告领取奖励按钮 => yellow */
    @property(cc.Node)
    private gainAdYellow: cc.Node = null;
    /** 直接领取奖励按钮 */
    @property(cc.Node)
    private gainReward: cc.Node = null;
    /** 双倍领取奖励按钮查看广告 */
    @property(cc.Node)
    private gainRewardAd: cc.Node = null;
    /** 双倍查看奖励灰色按钮资源 */
    @property(cc.SpriteFrame)
    private gainRewardAdGreyRes: cc.SpriteFrame = null;
    /** 标题 */
    @property(cc.Label)
    private titleLb: cc.Label = null;
    /** 奖励内容 */
    @property(cc.Node)
    private contentLbNode: cc.Node = null;
    /** 金币提示次数文本 */
    @property(cc.Node)
    private goldHintLb: cc.Node = null;
    /** 金币提示次数文本 => 按钮上的 */
    @property(cc.Node)
    private goldHintButtonLb: cc.Node = null;

    /** 转盘奖励容器 */
    @property(cc.Node)
    private dialBox: cc.Node = null;
    /** 特效容器 */
    @property(cc.Node)
    private aniNode: cc.Node = null;
    /** 动画特效 */
    @property(sp.Skeleton)
    private ani: sp.Skeleton = null;

    /** 新手礼包节点 */
    @property(cc.Node)
    private noviceNode: cc.Node = null;
    /** 新手特效 */
    @property(sp.Skeleton)
    private noviceNodeAni: sp.Skeleton = null;
    /** 新手特效资源 */
    @property(sp.SkeletonData)
    private noviceSkeletonData: sp.SkeletonData = null;
    /** 新手内容文字 */
    @property(cc.Label)
    private noviceLb: cc.Label = null;
    /** 元字节点 */
    @property(cc.Node)
    private yuanNode: cc.Node = null;

    /** 金币特效资源 */
    @property(sp.SkeletonData)
    private goldSkeletonData: sp.SkeletonData = null;
    /** 爱心特效资源 */
    @property(sp.SkeletonData)
    private redSkeletonData: sp.SkeletonData = null;
    /** 转盘奖励=>百万爱心 */
    @property(sp.SkeletonData)
    private loveSkeletonData: sp.SkeletonData = null;
    /** 转盘奖励=>手机 */
    @property(sp.SkeletonData)
    private phoneSkeletonData: sp.SkeletonData = null;
    /** 转盘奖励=>手机发光层 */
    @property(cc.Node)
    private phoneLightLayer: cc.Node = null;

    @Core.module(Core.Audio)
    private audio: Core.Audio = null;

    /**关闭界面动画 */

    init(data: RewardObject) {
        this.data = data;
    }

    coreOnLoad() {
        if (this.data.openCall) {
            this.data.openCall(this);
        }
        this.happyGetBtn.active = false;
        this.gainAd.active = false;
        this.gainAdYellow.active = false;
        this.gainReward.active = false;
        this.gainRewardAd.active = false;
        this.dialBox.active = false;
        this.aniNode.active = false;
        this.closeBtn.active = false;
        this.contentLbNode.active = false;
        this.goldHintLb.active = false;
        this.goldHintButtonLb.active = false;
        this.phoneLightLayer.active = false;

        if (this.data.times < 0) {
            this.data.times = 0;
        }

        if (this.data.type == RewardViewType.NOVICE_REWARD_RED || this.data.type == RewardViewType.NOVICE_REWARD_GOLD) {
            this.contentNode.active = false;
            this.noviceNode.active = true;
            this.noviceReward();
            return;
        } else {
            this.contentNode.active = true;
            this.noviceNode.active = false;
        }

        switch (this.data.type) {
            case RewardViewType.RED:
                this.redReward(true);
                this.setTitle("运气爆棚，发现爱心");
                this.setContent(`最高可得${this.data.msg}爱心`);
                break;
            case RewardViewType.RED_REWARD:
                this.redReward(false);
                this.setTitle("恭喜获得爱心");
                this.setContent(`恭喜获得${this.data.msg}爱心`);
                this.audio.playSound(R.Mp3_getbalance);
                break;
            case RewardViewType.GOLD:
                this.goldReward(true);
                this.setTitle("恭喜获得金币奖励");
                this.setContent(`获得${this.data.msg}金币`, 10);
                break;
            case RewardViewType.GOLD_REWARD:
                this.goldReward(false);
                this.setTitle("恭喜获得金币");
                this.setContent(`获得${this.data.msg}金币`);
                this.audio.playSound(R.Mp3_getcoin);
                break;
            case RewardViewType.DIAL:
                this.dialReward(true);
                this.setTitle("恭喜获得幸运转盘奖励");
                this.setContent(`抽奖次数最高+${this.data.msg}`);
                this.scheduleOnce(() => {
                    this.setCloseBtnAni();
                }, 0.5);
                break;
            case RewardViewType.DIAL_REWARD:
                this.dialReward(false);
                this.setTitle("恭喜获得奖励");
                this.setContent(`抽奖次数+${this.data.msg}`);
                break;
            case RewardViewType.GOLD_AD:
                this.setTitle("观看视频可获取金币奖励");
                this.gainAdYellow.active = true;
                this.goldReward(true, true);
                this.scheduleOnce(() => {
                    this.setCloseBtnAni();
                }, 0.5);
                break;
            case RewardViewType.FRAGMENTS_REWARD:
                this.dialRewardAni(RewardViewType.FRAGMENTS_REWARD);
                this.setTitle("恭喜转盘奖励");
                this.setContent(`100万爱心碎片 x${this.data.msg}`);
                break;
            case RewardViewType.PHONE_REWARD:
                this.dialRewardAni(RewardViewType.PHONE_REWARD);
                this.setTitle("恭喜转盘奖励");
                this.setContent(`华为P40手机碎片 x${this.data.msg}`);
                break;
        }

        if (this.data.title) {
            this.setTitle(this.data.title);
        }

        //直接领取奖励按钮
        // this.gainReward.active = this.data.confirmButtonDirect;
        // if (this.data.confirmButtonDirect == false) {
        //     this.scheduleOnce(() => {
        //         this.setCloseBtnAni();
        //     }, 0.5);
        // }
    }

    /**
     * 转盘奖励=>百万爱心
     */
    private dialRewardAni(type: RewardViewType) {
        if (type === RewardViewType.FRAGMENTS_REWARD) {
            this.ani.skeletonData = this.loveSkeletonData;
        } else {
            this.ani.skeletonData = this.phoneSkeletonData;
            this.phoneLightLayer.active = true;
        }

        this.ani.loop = true;
        this.ani.animation = "animation";
        this.aniNode.active = true;
        this.aniNode.y = 30;
        this.happyGetBtn.active = true;
    }

    /**
     * 新手奖励
     */
    private noviceReward() {
        this.noviceNodeAni.skeletonData = this.noviceSkeletonData;
        this.yuanNode.active = false;
        if (this.data.type === RewardViewType.NOVICE_REWARD_RED) {
            this.audio.playSound(R.Mp3_getbalance);
            //爱心
            this.noviceNodeAni.loop = false;
            this.noviceNodeAni.animation = "hongbao_chuxian";
            this.noviceNodeAni.setCompleteListener((e: sp.spine.TrackEntry) => {
                if (e.animation.name == "hongbao_chuxian") {
                    this.noviceNodeAni.loop = true;
                    this.noviceNodeAni.animation = "hongbao_daiji";
                }
            });
            this.noviceLb.string = GameCore.utils.artisticFontFormat(`+${this.data.msg}`, RewardLogic.fontMap);
            // this.yuanNode.active = true;
        } else {
            this.audio.playSound(R.Mp3_getcoin);
            //金币
            this.noviceNodeAni.loop = false;
            this.noviceNodeAni.animation = "jinbi_chuxian";
            this.noviceNodeAni.setCompleteListener((e: sp.spine.TrackEntry) => {
                if (e.animation.name == "jinbi_chuxian") {
                    this.noviceNodeAni.loop = true;
                    this.noviceNodeAni.animation = "jinbi_daiji";
                }
            });

            this.noviceLb.string = GameCore.utils.artisticFontFormat(`+${this.data.msg}`, RewardLogic.fontMap);
        }
    }

    /**
     * 转盘奖励
     * @param ad 是否是查看广告
     */
    private dialReward(ad: boolean) {
        this.dialBox.active = true;
        if (ad) {
            this.gainAd.active = true;
        } else {
            this.happyGetBtn.active = true;
        }
    }

    /**
     * 获取金币奖励
     * @param ad 是否是查看广告
     * @param isLook 是否是仅看广告
     */
    private goldReward(ad: boolean, isLook: boolean = false) {
        this.ani.skeletonData = this.goldSkeletonData;
        this.ani.loop = true;
        this.ani.animation = "animation";
        this.aniNode.active = true;
        this.aniNode.y = 50;
        if (ad) {
            this.gainReward.active = true;
            this.gainRewardAd.active = true;

            this.goldHintLb.active = !this.data.timesLabelHide;
            this.goldHintButtonLb.active = !this.data.timesLabelHide;

            if (this.data.times) {
                this.goldHintLb.getComponent(
                    cc.RichText
                ).string = `今日剩余次数<color=#FFBE08>${this.data.times}</color>次`;
                this.goldHintButtonLb.getComponent(
                    cc.RichText
                ).string = `今日剩余次数<color=#FFBE08>${this.data.times}</color>次`;
            } else {
                this.goldHintLb.getComponent(cc.RichText).string = `今日观看次数已用完`;
                this.goldHintButtonLb.getComponent(cc.RichText).string = `今日观看次数已用完`;
                this.gainRewardAd.getComponent(cc.Button).interactable = false;
                this.gainRewardAd.getComponent(cc.Sprite).spriteFrame = this.gainRewardAdGreyRes;
            }

            if (this.data.confirmButtonDirect != false) {
                this.data.confirmButtonDirect = true;
            }
            if (isLook) {
                this.goldHintButtonLb.active = false;
                this.gainReward.active = false;
                this.gainRewardAd.active = false;
                this.gainAdYellow.active = true;
                if (!this.data.times) {
                    this.gainAdYellow.getComponent(cc.Button).interactable = false;
                    this.gainAdYellow.getComponent(cc.Sprite).spriteFrame = this.gainRewardAdGreyRes;
                }
            } else {
                this.goldHintLb.active = false;
            }
        } else {
            this.happyGetBtn.active = true;
        }
    }

    /**
     * 打开爱心奖励界面
     * @param ad 是否是查看广告
     */
    private redReward(ad: boolean) {
        this.ani.skeletonData = this.redSkeletonData;
        this.aniNode.active = true;
        this.aniNode.y = -127;
        if (ad) {
            this.scheduleOnce(() => {
                this.setCloseBtnAni();
            }, 0.5);
            this.ani.loop = true;
            this.ani.animation = "animation";
            this.gainAd.active = true;
        } else {
            this.happyGetBtn.active = true;
            this.ani.loop = true;
            this.ani.animation = "animation3";
            // this.ani.loop = false;
            // this.ani.animation = "animation2";
            // this.ani.setCompleteListener((e: sp.spine.TrackEntry) => {
            //     if (e.animation.name === "animation2") {
            //         this.ani.loop = true;
            //         this.ani.animation = "animation3";
            //     }
            // });
        }
    }

    /**
     * 设置标题
     */
    private setTitle(str: string) {
        this.titleLb.string = str;
    }

    /**
     * 设置奖励名称 内容
     */
    private setContent(str: string | null, y: number = -18) {
        if (!str) {
            this.contentLbNode.active = false;
            return;
        }
        if (this.data.type == RewardViewType.DIAL || this.data.type == RewardViewType.DIAL_REWARD) {
            this.contentLbNode.active = false;
            this.dialBox.getChildByName("times").getComponent(cc.Label).string = str;
        } else {
            this.contentLbNode.y = y;
            this.contentLbNode.getComponent(cc.Label).string = str;
            this.contentLbNode.active = true;
        }
    }

    /**
     * 关闭按钮动画
     */
    private setCloseBtnAni() {
        this.closeBtn.active = true;
        let lb = this.closeBtn.getChildByName("lb"),
            icon = this.closeBtn.getChildByName("icon"),
            btn = this.closeBtn.getComponent(cc.Button),
            time = 3;
        btn.interactable = false;
        icon.active = false;
        lb.active = true;
        lb.getComponent(cc.Label).string = time + "";

        this.setCloseLbAni(lb, time);
        this.schedule(
            () => {
                time--;
                this.setCloseLbAni(lb, time);

                if (time <= 0) {
                    btn.interactable = true;
                    lb.active = false;
                    icon.active = true;
                }
            },
            1,
            3
        );
    }

    /**
     * 播放关闭按钮文字特效
     */
    private setCloseLbAni(lb: cc.Node, str: string | number) {
        lb.getComponent(cc.Label).string = str + "";
        cc.Tween.stopAllByTarget(lb);
        lb.setScale(0);
        cc.tween(lb).to(0.5, { scale: 1 }, { easing: "backOut" }).start();
    }

    /**
     * 关闭弹窗
     */
    async close() {
        await this.getComponent(ViewAnimation).closeViewAnimation();
        return new Promise((resolve) => {
            resolve();
        });
    }

    /**
     * 关闭弹窗 => 这个关闭会触发cancel方法
     */
    async closeView() {
        let call = this.data?.cancel;
        await this.close();
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                if (call) {
                    call(this);
                }
                call = null;
            }, 2);
        });
    }

    /**
     * 确认看广告回调
     */
    private confirmAd() {
        //查看广告统一发送协议
        Core.webSockets.sendUDP("WatchVideoUdp", xxgBuf.WatchVideoUdp);
        if (this.data?.gainByAdConfirm) {
            this.data?.gainByAdConfirm(this);
        }
    }
    /**
     * 直接收下回调
     */
    private async confirm() {
        let call = this.data?.gainConfirm;
        await this.getComponent(ViewAnimation).closeViewAnimation();
        setTimeout(() => {
            if (call) {
                call(this);
            }
            call = null;
        }, 2);
    }
}
