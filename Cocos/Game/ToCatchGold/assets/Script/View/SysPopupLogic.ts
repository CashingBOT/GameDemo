import ViewAnimation from "../component/ViewAnimation";
import R from "../R";

const { ccclass, property } = cc._decorator;

/**
 * 提示框传入数据类型结构
 */
export interface PopupObject {
    /**
     * 弹窗类型
     */
    type?: PopupType;
    /** 数据 */
    msg: string;
    /** 确认事件 */
    confirm?: { (d: SysPopupLogic): void };
    /** 关闭或取消事件 */
    cancel?: Function;
    /** 关闭按钮是否显示 */
    closeButtonShow?: boolean;
    /** 确认按钮是否显示 */
    confirmButtonShow?: boolean;
    /** 打开界面回调 可以获取到当前打开弹窗的实例，用来关闭指定弹窗 */
    openCall?: { (e: SysPopupLogic): void };
}

/**
 * 弹窗数据类型
 */
export const enum PopupType {
    /** 默认弹窗 */
    HINT = 1,
    /** 获取分红 */
    BONUS = 2,
    /** 公告 */
    NOTICE = 3,
}

/** 要弹窗的数据列表=>队列用 */

export let sysPopupViewDataList: PopupObject[] = [];

/**
 * 弹窗 => 获得分红，提示，公告
 */
@ccclass
export class SysPopupLogic extends Core.ViewLogic {
    static isOpen: boolean = false;
    static openView: SysPopupLogic = null;

    /** 清除弹窗列表 */
    static clearViewDataList() {
        sysPopupViewDataList = [];
    }

    /** 关闭按钮 */
    @property(cc.Node)
    private closeBtn: cc.Node = null;
    /** 确认按钮，精灵 */
    @property(cc.Sprite)
    private confirmSprite: cc.Sprite = null;
    /** 标题节点 */
    @property(cc.Sprite)
    private titleSprite: cc.Sprite = null;
    /** 默认弹窗标题纹理 */
    @property(cc.SpriteFrame)
    private titleHint: cc.SpriteFrame = null;
    /** 获取得分红标题纹理 */
    @property(cc.SpriteFrame)
    private titleBonus: cc.SpriteFrame = null;
    /** 公告标题纹理 */
    @property(cc.SpriteFrame)
    private titleNotice: cc.SpriteFrame = null;
    /** 数据缓存 */
    private data: PopupObject | null = null;
    /** 确认按钮 默认纹理 */
    @property(cc.SpriteFrame)
    private confirmHint: cc.SpriteFrame = null;
    /** 确认按钮 分红纹理 */
    @property(cc.SpriteFrame)
    private confirmBonus: cc.SpriteFrame = null;
    /** 确认按钮 公告纹理 */
    @property(cc.SpriteFrame)
    private confirmNotice: cc.SpriteFrame = null;
    /** 默认内容节点 */
    @property(cc.Node)
    private hintNode: cc.Node = null;
    /** 获取分红内容节点 */
    @property(cc.Node)
    private bonusNode: cc.Node = null;
    /** 分红文本节点 */
    @property(cc.Label)
    private bonusText: cc.Label = null;
    /** 公告节点 */
    @property(cc.Node)
    private noticeNode: cc.Node = null;
    /** 公告文本节点 */
    @property(cc.Label)
    private noticeText: cc.Label = null;

    init(data: PopupObject) {
        this.data = data;
        if (this.data.closeButtonShow != false) {
            this.data.closeButtonShow = true;
        }
        if (this.data.confirmButtonShow != false) {
            this.data.confirmButtonShow = true;
        }
    }

    coreOnLoad() {
        SysPopupLogic.openView = this;
        if (this.data.openCall) {
            this.data.openCall(this);
        }
        this.hintNode.active = false;
        this.bonusNode.active = false;
        this.noticeNode.active = false;
        this.closeBtn.active = true;
        this.closeBtn.active = this.data.closeButtonShow;
        this.confirmSprite.node.active = this.data.confirmButtonShow;
        if (!this.confirmSprite.node.active) {
            this.node.getChildByName("bgBox").height = 590;
        }
        switch (this.data?.type) {
            case PopupType.BONUS:
                this.titleSprite.spriteFrame = this.titleBonus;
                this.confirmSprite.spriteFrame = this.confirmBonus;
                this.bonusText.string = this.data?.msg;
                this.bonusNode.active = true;
                break;
            case PopupType.NOTICE:
                this.titleSprite.spriteFrame = this.titleNotice;
                this.confirmSprite.spriteFrame = this.confirmNotice;
                this.noticeText.string = this.data?.msg;
                this.noticeNode.active = true;
                this.closeBtn.active = false;
                break;
            default:
                this.titleSprite.spriteFrame = this.titleHint;
                this.confirmSprite.spriteFrame = this.confirmHint;
                this.hintNode.getComponent(cc.Label).string = this.data?.msg;
                this.hintNode.active = true;
                break;
        }
    }

    @Core.module(Core.Timer)
    timer: Core.Timer;

    /**
     * 关闭弹窗
     */
    private close() {
        this.coreCloseView();
        if (this.data?.cancel) {
            this.data?.cancel();
        }
    }

    /**
     * 确认按钮
     */
    private async confirm() {
        let call = this.data?.confirm;
        await this.getComponent(ViewAnimation).closeViewAnimation();
        if (call) call(this);
    }

    /**
     * 关闭界面
     */
    async closeView() {
        await this.getComponent(ViewAnimation).closeViewAnimation();
    }

    coreOnDestroy() {
        SysPopupLogic.isOpen = false;
        SysPopupLogic.openView = null;
        if (sysPopupViewDataList.length) {
            sysPopupViewDataList.splice(0, 1);
            if (!sysPopupViewDataList.length) return;
            let d = sysPopupViewDataList[0];
            SysPopupLogic.isOpen = true;
            Core.viewManager.openView(R.SysPopupView, d);
        }
    }
}
