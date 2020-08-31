import { MapGlobalEvent } from "../service/EventMapService";

/**
 * 错误处理
 */
class NotificationControl extends Core.BaseLogic {
    /** 消息队列 */
    private dataList: xxgBuf.IPushMessages[] = [];

    /** 是否有跑马灯组件被激活 开始发送 */
    private canSend: boolean = false;

    /** 跑马灯间隔时间 */
    public frequency: number = 0;

    /** 跑马灯持续时间 */
    public duration: number = 5;

    public init(data: xxgBuf.InitRet) {
        this.frequency = data.marqueeFrequency;
        this.duration = data.marqueeDuration;
    }

    /**
     * 初始化
     * 主要用来重置canSend
     */
    public canSendNotice(flag: boolean) {
        this.canSend = flag;
    }

    /*
     * 设置消息
     * @param list：公告数组
     */
    @Core.netPush("MarqueePush")
    private setData(marqueeData: xxgBuf.IMarqueePush) {
        for (let i = 0; i < marqueeData.mgs.length; i++) {
            // this.dataList.push(list[i].notice);
            this.dataList.push(marqueeData.mgs[i]);
        }

        if (this.canSend) {
            this.sendMessage();
        }
    }

    /*
     * 获取一条公告
     */
    public getNotice() {
        if (this.dataList.length > 0) {
            let str = this.dataList[0];
            return str;
        }
    }

    /*
     * 播放完后删除公告
     */
    public reduceNotice() {
        this.canSend = true;
        if (this.dataList.length > 0) {
            this.dataList.splice(0, 1);
            this.sendMessage();
        }
    }

    /*
     * 发送消息
     */
    private sendMessage() {
        if (this.dataList.length > 0) {
            this.canSend = false;
            this.dataList.sort((a, b) => {
                return b.priority - a.priority;
            });
            Core.eventManager.event(MapGlobalEvent.notification, this.dataList[0]);
        }
    }
}

export default new NotificationControl();
