import { PointComponent } from "./PointComponent";
import { MenuButtonId } from "../Game/service/EventMapService";

const { ccclass, property } = cc._decorator;

/**
 * 按钮事件数据对象
 */
export interface MenuButtonEventObj {
    /** 按钮id */
    id: MenuButtonId;
    /** 显示或隐藏 */
    show: boolean;
}

/**
 * 按钮列表分类类型
 */
export const enum MenuButtonType {
    /** 顶部按钮 => sprite */
    TOP = 1,
    /** 右边按钮 => spine */
    RIGHT = 2,
    /** 左边按钮 => sprite + name */
    LEFT = 3,
}

/**
 * 按钮映射资源列表
 */
@ccclass("MenuButtonList")
export class MenuButtonList {
    /** 按钮所在区域类型 */
    @property({
        type: cc.Enum(MenuButtonId),
        tooltip: "按钮id",
    })
    buttonId: MenuButtonId = MenuButtonId.RANK;
    /** 按钮特效 */
    @property(sp.SkeletonData)
    skeletonData: sp.SkeletonData = null;
    /** 按钮纹理 */
    @property(cc.SpriteFrame)
    spriteFrame: cc.SpriteFrame = null;
    /** 按钮名称 */
    @property("")
    name: string = "";
}

@ccclass
export class MenuButton extends Core.ComponentLogic {
    /** 红点 */
    @property(cc.Node)
    private pointNode: cc.Node = null;
    /** 名称 */
    @property(cc.Node)
    private nameNode: cc.Node = null;
    /** 状态节点 */
    @property(cc.Node)
    private statusLabelNode: cc.Node = null;
    /** 奖励资源 => 可领取 */
    @property(cc.SpriteFrame)
    private availableRes: cc.SpriteFrame = null;
    /** 奖励资源 => 已领取 */
    @property(cc.SpriteFrame)
    private receivedRes: cc.SpriteFrame = null;
    /** 特效节点 */
    @property(cc.Node)
    private spineNode: cc.Node = null;
    /** 红点组件 */
    @property(PointComponent)
    pointComponent: PointComponent = null;
    /** 小手指 */
    @property(cc.Node)
    private handHintNode: cc.Node = null;
    /**
     * 按钮id
     */
    private buttonId: number = null;

    coreOnLoad() {
        this.statusLabelNode.active = false;
        this.handHintNode.active = false;
        this.node.on("click", () => {
            if (this.onClick) {
                this.onClick(this.buttonId);
            }
        });

        if (this.buttonId === MenuButtonId.NOVICE) {
            this.setHandShow(true);
        }
    }

    init(id: number) {
        this.buttonId = id;
        this.bindPoint();
    }

    /**
     * 设置按钮名称
     * @param name 要设置按钮的名称
     * @param outlineColor 描述颜色
     */
    setName(name: string, outlineColor: string = "#0086c5") {
        this.nameNode.active = true;
        this.nameNode.getComponent(cc.Label).string = name;
        this.nameNode.getComponent(cc.LabelOutline).color = cc.color().fromHEX(outlineColor);
    }

    /**
     * 设置按钮特效
     */
    setSpine(data: sp.SkeletonData) {
        this.node.getComponent(cc.Sprite).enabled = false;
        let ani = this.spineNode.getComponent(sp.Skeleton);
        ani.loop = true;
        this.spineNode.active = true;
        ani.skeletonData = data;
        ani.animation = "animation";
    }

    /**
     * 设置纹理
     */
    setSpriteFrame(data: cc.SpriteFrame) {
        this.node.getComponent(cc.Sprite).spriteFrame = data;
    }

    /**
     * 绑定红点
     */
    private bindPoint() {
        this.pointComponent.pointType = this.buttonId;
    }

    /**
     * 设置按钮领取状态
     * @param receive 是否可领取
     * @param show 状态文本是否显示
     */
    setReceiveState(receive: boolean, show: boolean = true) {
        this.statusLabelNode.getComponent(cc.Sprite).spriteFrame = receive ? this.availableRes : this.receivedRes;
        this.statusLabelNode.active = show;
        // this.getComponent(cc.Button).interactable = receive;
        this.nameNode.active = false;
    }

    /**
     * 设置小手指显示或隐藏
     * @param show 显示或隐藏
     */
    setHandShow(show: boolean) {
        if (this.handHintNode) {
            this.handHintNode.active = show;
        }
    }

    /**
     * 点击事件
     */
    onClick: Function;
}
