import { MapGlobalEvent } from "../Game/service/EventMapService";
import NotificationControl from "../Game/control/NotificationControl";

/**
 * 跑马灯公告组件
 */
const { ccclass, property } = cc._decorator;
@ccclass
export default class NotificationComponent extends Core.ComponentLogic {
    /** 跑马灯容器 */
    @property(cc.Node)
    noticeView: cc.Node = null;

    /** 遮罩 */
    @property(cc.Node)
    mask: cc.Node = null;

    /** 文字节点 */
    @property(cc.Node)
    label: cc.Node = null;

    coreOnLoad() {
        Core.eventManager.on(MapGlobalEvent.notification, this.startNotice, this);
    }

    coreOnEnable() {
        this.noticeView.active = false;
        NotificationControl.canSendNotice(true);
    }

    /**
     * 启动公告
     */
    startNotice(data: xxgBuf.IPushMessages) {
        let str = data;
        if (!str || !this.node.active) return;
        let noticeView = this.noticeView;
        noticeView.active = true;
        noticeView.opacity = 255;
        this.label.getComponent(cc.RichText).string = `<b>${str.content}</b>`;
        this.label.x = this.mask.width;
        // let noticeViewWidth = this.mask.width; //容器宽度

        // 总长度 = 容器长度 + 文字长度
        // 速度 = 容器长度 / 时间
        // 总长度 / 速度 = 时间(duration)
        // let duration = (noticeViewWidth + this.label.width) / (noticeViewWidth / 4); //所需要总时间
        let duration = NotificationControl.duration;
        this.label.stopAllActions();
        this.label.runAction(
            cc.sequence(
                cc.moveTo(duration, cc.v2(-this.label.width, this.label.y)),
                cc.callFunc(() => {
                    noticeView.opacity = 0;
                }),
                cc.delayTime(NotificationControl.frequency),
                cc.callFunc(() => {
                    noticeView.active = false;
                    NotificationControl.reduceNotice();
                })
            )
        );
    }

    coreOnDisable() {
        this.label.stopAllActions();
    }

    coreOnDestroy() {
        this.label.stopAllActions();
        NotificationControl.canSendNotice(false);
        Core.eventManager.off(MapGlobalEvent.notification, this.startNotice);
    }
}
