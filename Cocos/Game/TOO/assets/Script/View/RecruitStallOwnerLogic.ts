import ViewAnimation from "../component/ViewAnimation";
import { UserInfoService } from "../Game/service/UserInfoService";
import R from "../R";

const { ccclass, property } = cc._decorator;

/**
 * 招募摊主转盘列表界面
 */
@ccclass
export default class RecruitStallOwnerLogic extends Core.ViewLogic {
    /** 头像列表容器 */
    @property(cc.Node)
    private headList: cc.Node = null;
    /** 背景特效 */
    @property(sp.Skeleton)
    private backgroundSpine: sp.Skeleton = null;
    /** 招募按钮 */
    @property(cc.Button)
    private recruitBtn: cc.Button = null;
    /** 动画节点列表 */
    private spineList: { node: cc.Node; id: string }[] = [
        { node: null, id: "sk001" },
        { node: null, id: "sk002" },
        { node: null, id: "sk003" },
        { node: null, id: "sk004" },
        { node: null, id: "sk002" },
        { node: null, id: "sk001" },
        { node: null, id: "sk004" },
        { node: null, id: "sk003" },
        { node: null, id: "sk001" },
        { node: null, id: "sk003" },
    ];
    /** 转的起始速度 */
    private speed: number = 30;
    /** 最小的间隔速度 */
    private fastSpeed: number = 6;
    /** 转的递增值 */
    private index: number = 0;
    /** 当前转的下标 */
    private currentIndex: number = 1;
    /** 圈数 */
    private roundCount: number = 0;
    /** 是否开始转 */
    private goRound: boolean = false;
    /** 选择要停下的位置 */
    private stopIndex: number = 0;
    /** 招募返回数据 */
    private recruitData: xxgBuf.RecruitStallOwnerRet = null;
    /** 数据 */
    private data: {
        level: number;
        call: Function;
    };

    /** 音频组件 */
    @Core.module(Core.Audio)
    private audio: Core.Audio = null;

    init(d) {
        this.data = d;
    }

    coreStart() {
        for (let x = 0, l = this.headList.childrenCount; x < l; x++) {
            this.spineList[x].node = this.headList.children[x].getChildByName("spine");
        }
    }

    /**
     * 开始转
     */
    private setGoRound() {
        this.recruitBtn.interactable = false;
        Core.webSockets
            .send<xxgBuf.RecruitStallOwnerRet>(
                "RecruitStallOwnerReq",
                new xxgBuf.RecruitStallOwnerReq({ level: this.data.level })
            )
            .then((e) => {
                if (e) {
                    this.goRound = true;
                    this.spineList[this.stopIndex].node.active = false;
                    this.backgroundSpine.animation = "animation2";
                    this.stopIndex = this.getOwnerIndex(e.stallOwner);
                    UserInfoService.blessing = Number((e.blessing / 100 + UserInfoService.blessing).toFixed(2));
                    this.recruitData = e;
                }
            });
    }

    /**
     * 转=>停下
     */
    private roundStop() {
        this.backgroundSpine.animation = "animation3";
        this.audio.playSound(R.Mp3_slotbonus);
        this.speed = 30;
        this.goRound = false;
        this.roundCount = 0;
        this.scheduleOnce(() => {
            if (this.recruitData) {
                if (this.data?.call) this.data?.call(this.recruitData.stallOwner);
                Core.viewManager.closeView(R.RecruitStallOwnerView);
                Core.viewManager.openView(R.StallInfoView, {
                    id: this.recruitData.stallOwner,
                    value: UserInfoService.blessing,
                });
            }
        }, 2);
    }

    /**
     * 点关闭按钮
     */
    private clickCloseView() {
        if (this.recruitData) {
            if (this.data?.call) this.data?.call(this.recruitData.stallOwner);
            Core.viewManager.closeView(R.RecruitStallOwnerView);
            Core.viewManager.openView(R.StallInfoView, {
                id: this.recruitData.stallOwner,
                value: UserInfoService.blessing,
            });
        } else {
            this.getComponent(ViewAnimation).closeViewAnimation();
        }
    }

    /**
     * 通过摊主id获取摊主对应的下标
     */
    private getOwnerIndex(id: string) {
        let x = 0,
            l = this.spineList.length,
            index: number = 0;
        for (; x < l; x++) {
            if (this.spineList[x].id == id) {
                index = x;
                if (Math.random() < 0.4) {
                    break;
                }
            }
        }
        return index;
    }

    coreUpdate() {
        if (!this.goRound) {
            return;
        }
        this.index++;
        if (this.index >= this.speed) {
            let node = this.spineList[this.currentIndex].node;
            node.getComponent(sp.Skeleton).loop = false;
            node.getComponent(sp.Skeleton).animation = "animation2";
            node.active = true;
            this.audio.playSound(R.Mp3_slotfinish);
            this.index = 0;

            //减速
            if (this.roundCount > 2) {
                this.speed *= 1.2;
                if (this.speed >= 15) {
                    this.speed = 15;
                    if (this.stopIndex === this.currentIndex) {
                        node.getComponent(sp.Skeleton).loop = true;
                        node.getComponent(sp.Skeleton).animation = "animation3";
                        this.roundStop();
                    }
                }
            } else {
                //加速
                this.speed = this.speed / 1.2;
                if (this.speed <= this.fastSpeed) {
                    this.speed = this.fastSpeed;
                }
            }
            this.currentIndex++;
            if (this.currentIndex >= this.spineList.length) {
                this.currentIndex = 0;
                this.roundCount++;
            }
        }
    }
}
