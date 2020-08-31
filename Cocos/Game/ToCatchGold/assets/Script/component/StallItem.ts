import R from "../R";

const { ccclass, property } = cc._decorator;

/** 人物行走方向 */
const enum directionType {
    LEFT = 1,
    RIGHT = 2,
}

/** 人物特效角色类型 */
const enum OwnerRole {
    /** 小孩 */
    CHILD = 1,
    /** 女青年 */
    WOMAN = 2,
    /** 男青年 */
    MAN = 3,
    /** 老太太 */
    OLD_WOMAN = 4,
    /** 老头 */
    OLD_MAN = 5,
    /** 永浩 */
    YONG_HAO = 6,
    /** 有志 */
    YOU_ZHI = 7,
    /** 佳奇 */
    JIA_QI = 8,
    /** 威雅 */
    WEI_YA = 9,
    /** 至尊摊主 */
    SUPREME = 10,
}

/**
 * 人物特效资源列表
 */
const OwnerResList: Map<OwnerRole, string> = new Map([
    [OwnerRole.CHILD, R.Spine_baiditan_02],
    [OwnerRole.WOMAN, R.Spine_baiditan_03],
    [OwnerRole.MAN, R.Spine_baiditan_01],
    [OwnerRole.OLD_WOMAN, R.Spine_baiditan_04],
    [OwnerRole.OLD_MAN, R.Spine_baiditan_06],
    [OwnerRole.YONG_HAO, R.Spine_baiditan_09],
    [OwnerRole.YOU_ZHI, R.Spine_baiditan_08],
    [OwnerRole.JIA_QI, R.Spine_baiditan_05],
    [OwnerRole.WEI_YA, R.Spine_baiditan_07],
    [OwnerRole.SUPREME, R.Spine_baiditan_10],
]);

const StallNameList = {
    lv_1: "服装摊",
    lv_2: "小吃摊",
    lv_3: "音像摊",
    lv_4: "游戏摊",
    lv_5: "烧烤摊",
    lv_6: "杂货摊",
    lv_7: "数码摊",
    lv_8: "土产摊",
    lv_9: "玩具摊",
    lv_10: "古董摊",
};

/**
 * 摊位组件逻辑
 */
@ccclass
export default class StallItem extends Core.ComponentLogic {
    /** 整个房间，不带顶 */
    @property(cc.Node)
    private room: cc.Node = null;
    /** 背景 */
    @property(cc.Sprite)
    private bg: cc.Sprite = null;
    /** 屋顶 */
    @property(cc.Node)
    private rooftop: cc.Node = null;
    /** 屋梁 */
    @property(cc.Node)
    private stull: cc.Node = null;
    /** 地板 */
    @property(cc.Node)
    private floor: cc.Node = null;
    /** 摊主节点 */
    @property(cc.Node)
    private ownerNode: cc.Node = null;
    /** 摊主节点 */
    @property(sp.Skeleton)
    private ownerSpine: sp.Skeleton = null;
    /** 等级级文本 */
    @property(cc.Label)
    private levelLb: cc.Label = null;
    /** 装修特效1 */
    @property(cc.Node)
    private decorationAni: cc.Node = null;
    /** 装修特效2 */
    @property(cc.Node)
    private decorationAni2: cc.Node = null;

    /** 人物移动速度 */
    private speed: number = 40;
    /** 移动动画L */
    private walkTweenLeft: cc.Tween = null;
    /** 移动动画R */
    private walkTweenRight: cc.Tween = null;
    /** 第一次移动 */
    private firstMove: boolean = true;

    /** 设置下标 => 下标为倒序 类似等级 */
    private index: number = 0;
    /** 数据总长度 */
    private dataLength: number = 0;

    /**
     * 资源模块
     */
    @Core.module(Core.Res)
    private res: Core.Res = null;
    @Core.module(Core.Audio)
    private audio: Core.Audio = null;

    coreOnLoad() {}

    coreOnEnable() {
        if (!this.firstMove) {
            this.ownerMove(Math.random() < 0.5 ? directionType.LEFT : directionType.RIGHT);
        }
    }

    /**
     * 设置数据
     * @param idx 渲染下标 0-n 从小到大
     * @param dataLength 数据总长度
     */
    setData(idx: number, dataLength: number) {
        this.stopMove();
        this.firstMove = true;
        this.decorationAni.active = false;
        this.decorationAni2.active = false;
        if (!idx) {
            //最上面一层
            this.rooftop.active = true;
            if (dataLength <= 3) {
                //这个获取到的是scroll的遮罩层
                if (this.node.parent.parent.height > 1334) {
                    this.node.height = 970;
                } else {
                    this.node.height = 770;
                }
            } else {
                this.node.height = 610;
            }

            this.room.active = false;
            return;
        }

        if (idx === dataLength - 1) {
            //最底层
            this.node.height = 118;
            this.room.active = false;
            this.rooftop.active = false;
            return;
        }

        this.index = dataLength - idx - 1;
        this.room.active = true;
        this.node.height = 360;
        this.levelLb.string = this.index + "级\n" + StallNameList[`lv_${this.index % 10 ? this.index % 10 : 10}`];
        this.stull.active = false;
        this.rooftop.active = false;
        this.ownerNode.active = true;

        //加载摊主
        this.res.getRes<sp.SkeletonData>(OwnerResList.get(this.getOwnerRole())).then((e) => {
            let ani = this.ownerSpine;
            ani.loop = true;
            ani.skeletonData = e.obj;
            ani.animation = "idle";
            ani.setCompleteListener((e: sp.spine.TrackEntry) => {
                if (e.animation.name == "idle") {
                    //初始化动画播放完成
                    this.ownerMove(Math.random() < 0.5 ? directionType.LEFT : directionType.RIGHT);
                    this.firstMove = false;
                }
            });
            this.ownerNode.x = Math.floor(Math.random() < 0.5 ? Math.random() * 500 : 250);
        });

        this.setBackground();
    }

    /**
     * 获取这一次摊主角色
     */
    private getOwnerRole(): OwnerRole {
        let role = OwnerRole.CHILD;
        switch (this.index % 5) {
            case OwnerRole.CHILD:
                role = OwnerRole.CHILD;
                break;
            case OwnerRole.WOMAN:
                role = OwnerRole.WOMAN;
                break;
            case OwnerRole.MAN:
                role = OwnerRole.MAN;
                break;
            case OwnerRole.OLD_WOMAN:
                role = OwnerRole.OLD_WOMAN;
                break;
            default:
                role = OwnerRole.OLD_MAN;
                break;
        }

        return role;
    }

    /**
     * 开始装修
     */
    setDecoration() {
        return new Promise((resolve) => {
            this.audio.playSound(R.Mp3_building);
            this.ownerNode.active = false;
            this.decorationAni2.active = true;
            this.decorationAni.active = true;
            this.decorationAni.opacity = 255;
            this.decorationAni2.opacity = 255;
            this.decorationAni.getComponent(sp.Skeleton).animation = "animation";
            this.decorationAni2.getComponent(sp.Skeleton).animation = "animation";
            cc.Tween.stopAllByTarget(this.decorationAni2);
            cc.Tween.stopAllByTarget(this.decorationAni);
            this.scheduleOnce(() => {
                cc.tween(this.decorationAni2)
                    .to(0.4, { opacity: 0 })
                    .call(() => {
                        this.decorationAni2.active = false;
                        this.decorationAni2.opacity = 255;
                        resolve();
                    })
                    .start();
                cc.tween(this.decorationAni)
                    .to(0.4, { opacity: 0 })
                    .call(() => {
                        this.decorationAni.active = false;
                        this.decorationAni.opacity = 255;
                    })
                    .start();
                this.decorationAni.active = false;

                this.ownerNode.active = true;
                this.audio.playSound(R.Mp3_levelup);
            }, 2);
        });
    }

    /**
     * 设置背景 //TODO 需要优化
     */
    private setBackground() {
        this.res
            .getRes<cc.SpriteFrame>(
                R[
                    `Texture_main_stall_${this.index % 10 ? this.index % 10 : 10}_${
                        Math.ceil(this.index / 10) > 5 ? 5 : Math.ceil(this.index / 10)
                    }`
                ]
            )
            .then((e) => {
                this.bg.spriteFrame = e.obj;
            });
    }

    /**
     * 摊主行走
     */
    private ownerMove(direction: directionType) {
        this.stopMove();

        //向左或是向右的间隔距离
        let intervalDistance: number = 0,
            end: number = 0;
        cc.Tween.stopAllByTarget(this.ownerNode);
        if (direction == directionType.LEFT) {
            //向左
            this.ownerSpine.animation = "walk_L";
            intervalDistance = 500 - this.ownerNode.x;
            end = Math.ceil(Math.random() * intervalDistance);

            if (this.ownerNode.x + end >= 500 || end < 200) {
                return this.ownerMove(directionType.RIGHT);
            }

            this.walkTweenLeft = cc
                .tween(this.ownerNode)
                .to(Math.ceil(end / this.speed), { x: this.ownerNode.x + end })
                .call(() => {
                    this.ownerSpine.animation = "idle";
                })
                .start();
        } else {
            //向右
            this.ownerSpine.animation = "walk_R";
            intervalDistance = this.ownerNode.x;
            end = Math.ceil(Math.random() * intervalDistance);

            if (this.ownerNode.x - end <= 0 || end < 200) {
                return this.ownerMove(directionType.LEFT);
            }

            this.walkTweenRight = cc
                .tween(this.ownerNode)
                .to(Math.ceil(end / this.speed), { x: this.ownerNode.x - end })
                .call(() => {
                    this.ownerSpine.animation = "idle";
                })
                .start();
        }
    }

    /**
     * 停止人物的左右移动
     */
    private stopMove() {
        this.firstMove = false;
        cc.Tween.stopAllByTarget(this.ownerNode);
        if (this.walkTweenLeft) {
            this.walkTweenLeft.stop();
        }
        if (this.walkTweenRight) {
            this.walkTweenRight.stop();
        }
    }

    coreOnDisable() {
        this.unscheduleAllCallbacks(); // TODO 这里可能会有问题，在装修的时候移出去会没有音效
        this.stopMove();
    }
}
