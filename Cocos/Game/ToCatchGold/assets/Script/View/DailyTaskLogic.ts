import DailyTaskItem, { DailyTaskStatus } from "../component/DailyTaskItem";
import { DAILY_EVENT } from "../Game/service/EventMapService";
import R from "../R";
import { RedPointService, RedPointType } from "../Game/service/RedPointService";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DailyTaskLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.FULL;

    /** 任务数据 */
    public taskData: xxgBuf.IDailyTaskRet = null;

    /** 任务节点列表 */
    public dailyTaskItemList: DailyTaskItem[] = [];

    /** 模版节点 */
    @property(cc.Node)
    public templeNode: cc.Node = null;

    /** 任务layout */
    @property(cc.Node)
    public taskBox: cc.Node = null;

    public init(data: xxgBuf.IDailyTaskRet) {
        this.taskData = data;

        // //假数据
        // this.taskData = <xxgBuf.IDailyTaskReq>{};
        // this.taskData.taskInfo = [];
        // for (let index = 0; index < 2; index++) {
        //     let data = <xxgBuf.ITaskInfo>{};
        //     data.actualNum = 5;
        //     data.rule = 5;
        //     data.status = 0;
        //     data.taskDesc = "任务描述xxx";
        //     data.taskId = index;
        //     data.rewardType = 1;
        //     data.balance = 10000;
        //     data.taskType = index;
        //     this.taskData.taskInfo.push(data);
        // }

        // for (let index = 2; index < 4; index++) {
        //     let data = <xxgBuf.ITaskInfo>{};
        //     data.actualNum = 5;
        //     data.rule = 5;
        //     data.status = 2;
        //     data.taskDesc = "任务描述xxx";
        //     data.taskId = index;
        //     data.rewardType = 2;
        //     data.balance = 10;
        //     data.taskType = index;
        //     this.taskData.taskInfo.push(data);
        // }
    }

    protected coreOnLoad() {
        this.taskData.taskInfo.sort((a, b) => {
            let as = a.status ? a.status : 0;
            let bs = a.status ? a.status : 0;
            return as - bs;
        });

        for (let index = 0; index < this.taskData.taskInfo.length; index++) {
            let taskNode = cc.instantiate(this.templeNode);
            this.taskBox.addChild(taskNode);
            taskNode.active = true;
            taskNode.getComponent(DailyTaskItem).setData(this.taskData.taskInfo[index]);
            this.dailyTaskItemList.push(taskNode.getComponent(DailyTaskItem));
        }
        this.taskBox.getComponent(cc.Layout).updateLayout();
    }

    @Core.event(DAILY_EVENT.REFRESH)
    private refreshView() {
        this.taskData.taskInfo.sort((a, b) => {
            let as = a.status ? a.status : 0;
            let bs = a.status ? a.status : 0;
            return as - bs;
        });

        for (let index = 0; index < this.dailyTaskItemList.length; index++) {
            const dailyTaskItem = this.dailyTaskItemList[index];
            dailyTaskItem.setData(this.taskData.taskInfo[index]);
        }
    }

    /**
     * 关闭按钮回调
     * @param event
     * @param customerData
     */
    private closeBtnCallback(event: cc.Event, customerData: string) {
        this.coreCloseView();
    }

    protected coreOnDestroy() {
        for (let index = 0; index < this.taskData.taskInfo.length; index++) {
            if (this.taskData.taskInfo[index].status == DailyTaskStatus.GET) return;
        }
        RedPointService.remove(RedPointType.dailyTask);
    }
}
