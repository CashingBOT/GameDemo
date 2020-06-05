const { ccclass, menu, requireComponent, disallowMultiple } = cc._decorator;
/**
 * 轻量级TableView，直接挂在ScrollView所在的节点上即可
 */
@ccclass
@menu("i18n:MAIN_MENU.component.ui/TableViewLight")
@requireComponent(cc.ScrollView)
@disallowMultiple
export default class TableViewLight extends cc.Component {

    /**
     * item父节点
     */
    private content: cc.Node = null;
    /**
     * item高度
     */
    private itemHeight: number = null;
    /**
     * 可视上边界
     */
    private topY: number = null;
    /**
     * 可视下边界
     */
    private bottomY: number = null;

    /**
     * 生命周期
     */
    protected onLoad(): void {
        window.requestAnimationFrame(() => { // 下一帧调用，避免widget未加载

            this.setScrollHandler();

            this.initVal();

            this.setOpacity();
        });
    }

    /**
     * 初始化变量
     */
    private initVal(): void {
        if (this.node.anchorY === 0) {
            this.topY = this.node.parent.convertToWorldSpaceAR(this.node.position).y + this.node.height;
            this.bottomY = this.topY - this.node.height;
        }
        if (this.node.anchorY === 1) {
            this.topY = this.node.parent.convertToWorldSpaceAR(this.node.position).y;
            this.bottomY = this.topY - this.node.height;
        }
        this.itemHeight = this.content.children[0].height;
    }

    /**
     * 注册ScrollView回调
     */
    private setScrollHandler(): void {
        let scrollViewEventHandler = new cc.Component.EventHandler();
        scrollViewEventHandler.target = this.node;
        scrollViewEventHandler.component = "TableViewLight";
        scrollViewEventHandler.handler = "scrollViewCallback";
        scrollViewEventHandler.customEventData = "TableViewLight";

        let scrollView = this.node.getComponent(cc.ScrollView);
        scrollView.scrollEvents.push(scrollViewEventHandler);
        this.content = scrollView.content;
    }

    /**
     * 滚动回调
     */
    private scrollViewCallback(): void {
        this.setOpacity();
    }

    /**
     * 设置透明度
     */
    private setOpacity():void {
        this.content.children.forEach(node => {
            let itemPosY = this.content.convertToWorldSpaceAR(node.position).y;

            if (node.anchorY === 0) {
                // 出界的item透明度设置为0
                if (itemPosY > this.topY || itemPosY < this.bottomY) {
                    node.opacity = 0;
                }
                else {
                    node.opacity = 255;
                }
            }

            if (node.anchorY === 0.5) {
                // 出界的item透明度设置为0
                if (itemPosY - 1 / 2 * this.itemHeight > this.topY || itemPosY + 1 / 2 * this.itemHeight < this.bottomY) {
                    node.opacity = 0;
                }
                else {
                    node.opacity = 255;
                }
            }

            if (node.anchorY === 1) {
                // 出界的item透明度设置为0
                if (itemPosY - this.itemHeight > this.topY || itemPosY + this.itemHeight < this.bottomY) {
                    node.opacity = 0;
                }
                else {
                    node.opacity = 255;
                }
            }
        });
    }
}
