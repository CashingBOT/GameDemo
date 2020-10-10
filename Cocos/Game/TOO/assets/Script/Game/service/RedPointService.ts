export enum RedPointType {
    /** 签到 */
    singIn = 1,
    /** 每日任务 */
    dailyTask = 2,
}

/**
 * 小红点服务逻辑
 * @description 注意，如果要添加新的属性红点的时候 RedPointType 和属性名称要和RedPointControl里面对应的属性名称一样
 */
class RedPointControl extends Core.BaseModel {
    /** 签到 */
    @Core.field
    singIn: boolean = false;
    /** 每日任务 */
    @Core.field
    dailyTask: boolean = false;
    /** 红点数据列表 */
    private points: number[] = [];
    /**
     * 设置数据
     */
    setData(d: xxgBuf.UnReadPush) {
        d.unreads.forEach((e) => {
            this.addPoint(e);
        });
    }

    /**
     * 添加小红点
     */
    addPoint(type: RedPointType) {
        if (!this.points.includes(type)) {
            this[RedPointType[type]] = true;
            this.points.push(type);
        }
    }

    /**
     * 移除小红点
     */
    remove(type: RedPointType) {
        if (this.points.includes(type)) {
            this[RedPointType[type]] = false;
            this.points.splice(this.points.indexOf(type), 1);
        }
    }

    /**
     * 清除所有红点
     */
    removeAll() {
        this.points.forEach((e) => {
            this[RedPointType[e]] = false;
        });
        this.points = [];
    }
}

export const RedPointService = new RedPointControl();
