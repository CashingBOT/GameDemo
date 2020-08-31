import { MapGlobalEvent, MenuButtonId } from "../Game/service/EventMapService";

const { ccclass, property, menu, disallowMultiple, executionOrder } = cc._decorator;

/**
 * 红点广告事件数据结构
 */
export interface PointEventObj {
    /** 红点类型 */
    type: MenuButtonId;
    /** 显示或隐藏 */
    show: boolean;
}

/**
 * 红点组件逻辑
 * @example
 * 《《《组件不是直接挂到按钮组件上面的》》》
 * 直接挂到对应的组件节点上面，然后添加对应的type即可通过GameCore.setPoint()方法控制显示或是隐藏
 * 或者通过事件类型MapGlobalEvent.updatePoint => 数据结构pointEventObj 来控制开关
 */
@ccclass
@menu("游戏组件/PointBind")
@disallowMultiple
@executionOrder(-1)
export class PointComponent extends Core.ComponentLogic {
    /** 绑定的类型 */
    @property({
        type: cc.Enum(MenuButtonId),
        tooltip: `按钮id=>用于红点显示或隐藏`,
    })
    pointType: MenuButtonId = MenuButtonId.NONE;

    coreOnLoad() {
        this.node.active = false;
    }

    /**
     * 更新红点
     * @param type 需要更新的红点功能类型
     * @param show 显示或隐藏
     */
    @Core.event(MapGlobalEvent.updatePoint)
    private updatePoint(data: PointEventObj) {
        if (data.type === this.pointType) {
            let node = this.node;

            if (data.show) {
                node.active = true;
                node.setScale(0.1);
                node.y += 20;
                cc.tween(node)
                    .to(0.4, { scale: 1 }, { easing: "backOut" })
                    .delay(0.2)
                    .to(0.3, { y: node.y - 20 }, { easing: "bounceOut" })
                    .start();
            } else {
                cc.tween(node)
                    .to(0.4, { scale: 0 }, { easing: "backIn" })
                    .call(() => {
                        node.active = false;
                    })
                    .start();
            }
        }
    }
}
