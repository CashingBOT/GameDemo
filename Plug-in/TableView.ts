const { ccclass, property, menu, disallowMultiple } = cc._decorator;
/**
 * 界面脚本接口
 */
interface ViewLogic extends Core.ViewLogic {
    /**
     * 初始化item，暴露给TableView组件
     * @see 注意，模板item的active要设为false
     * @param data 和传给TableView.getData的数据结构相等
     * @param index 子节点索引
     * @param counter data数据索引
     * @example content.children[index].getChildByName("label").getComponent(cc.Label).string = data[counter] + "";
     */
    initItem?(data: any, index: number, counter: number): void;
}
/**
 * 垂直排列选项枚举
 */
enum VerticalDirection {
    TOP_TO_BOTTOM,
    BOTTOM_TO_TOP
}
/**
 * 初始化item所需要的数据
 */
let data: Array<any> = [];
/**
 * 滚动视图
 * @see 内置Layout，可在属性检查器设置
 * @see Loop无限循环滚动，可在属性检查器开启
 * @see 把模板item的active设置为false(属性检查器左上角取消打勾)
 * @extends {cc.ScrollView}
 * @method getData 获得item数据，用于初始化item
 * @method updateData 获得item数据，用于更新itemList
 */
@ccclass
@menu("i18n:MAIN_MENU.component.ui/TableView")
@disallowMultiple
export default class TableView extends cc.ScrollView {

    /**
     * 界面脚本所在节点
     */
    @property({
        type: cc.Node,
        tooltip: CC_DEV && "界面脚本所在节点"
    })
    scriptNode: cc.Node = null;
    /**
     * 开启无限滚动
     */
    @property({
        tooltip: CC_DEV && "开启无限滚动"
    })
    loop: boolean = false;
    /**
     * 上间距
     */
    @property({
        type: cc.Integer,
        tooltip: CC_DEV && "上间距"
    })
    private top: number = 0;
    /**
     * 下间距
     */
    @property({
        type: cc.Integer,
        tooltip: CC_DEV && "下间距"
    })
    private bottom: number = 0;
    /**
     * 相邻间距
     */
    @property({
        type: cc.Integer,
        tooltip: CC_DEV && "相邻间距"
    })
    private spacingY: number = 0;
    @property({
        type: cc.Enum(VerticalDirection),
        tooltip: CC_DEV && "垂直排列子节点的方向"
    })
    verticalDirection: VerticalDirection = VerticalDirection.TOP_TO_BOTTOM;
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
     * Y坐标偏移量
     */
    private posY: number = null;
    /** 
     * 是否锁定滚动
     */
    private isScrollLock: boolean = false;
    /** 
     * 增量(前一时间的偏移量和当前时间的偏移量差)
     */
    private delta: number = 0;
    /** 
     * 节点列表，操作该列表实现重用
     */
    private itemList: Array<cc.Node> = [];
    /** 
     * cell对象池
     */
    private cellPool: cc.NodePool = new cc.NodePool;
    /** 
     * 上滚列表
     */
    private scrollToTopList: Array<cc.Node> = [];
    /** 
     * 下滚列表
     */
    private scrollToBottomList: Array<cc.Node> = [];
    /** 
     * content初始高度
     */
    private initialContentHeight: number = null;
    /** 
     * 界面脚本
     * @function initItem 初始化item
     */
    private viewScript: ViewLogic = null;
    /** 
     * 数据计数
     */
    private dataCounter: number = 0;
    /** 
     * 首次赋值后的初始数据计数
     */
    private initialDataCounter: number = 0;

    /**
     * 生命周期
     */
    protected onLoad(): void {
        window.requestAnimationFrame(() => { // 下一帧调用，避免widget未加载

            this.initNodePool();

            this.setScrollHandler();

            this.setLayout();

            this.initBorder();

            this.setOpacity();
        });
    }

    /** 
     * 初始化对象池
     */
    private initNodePool(): void {

        this.viewScript = this.scriptNode.getComponent(this.scriptNode.name.replace("Portrait", "").replace("View", "Logic"));

        // 计算可视范围内的cell个数，生成放入对象池，多生成一个用于重用
        for (let i = 0; i < Math.ceil(this.node.height / this.content.children[0].height) + 1; i++) {
            let newItem = cc.instantiate(this.content.children[0]);
            newItem.zIndex = i + 1;
            this.cellPool.put(newItem);
        }

        for (let i = 0; i < data.length; i++) {
            let cell = null;
            if (this.cellPool.size() > 0) {
                cell = this.cellPool.get(); // 后进先出
            } else {
                if (this.loop) { // 若开启无限滚动，生成所有item
                    cell = cc.instantiate(this.content.children[0]);
                    cell.zIndex = i + 1;
                } else {
                    break;
                }
            }
            this.content.addChild(cell); // 注意children下标越大，zIndex越小
            if (this.viewScript.initItem) this.viewScript.initItem(data, i + 1, this.dataCounter);
            cell.active = true;
            this.itemList.push(cell);
            this.dataCounter++;
        }

        this.initialDataCounter = this.dataCounter;

        if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
            this.scrollToBottomList = this.itemList;
        } else {
            this.scrollToTopList = this.itemList;
        }
    }

    /**
     * 设置布局
     */
    private setLayout(): void { // 该方法只与Layout有关
        let len = this.itemList.length;
        this.itemHeight = this.content.children[0].height;
        this.content.height = len * this.itemHeight + (len - 1) * this.spacingY + this.top + this.bottom;
        this.initialContentHeight = this.content.height;

        if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
            this.itemList.forEach((item, index) => {
                item.y -= this.top;
                item.y -= index * (this.itemHeight + this.spacingY);
            });
        } else {
            this.itemList.forEach((item, index) => {
                item.y += this.bottom;
                item.y += index * (this.itemHeight + this.spacingY);
            });
        }
    }

    /**
     * 初始化可视边界纵坐标
     */
    private initBorder(): void { // 根据锚点确定可视范围边界
        if (this.node.anchorY === 0) {
            this.topY = this.node.parent.convertToWorldSpaceAR(this.node.position).y + this.node.height;
            this.bottomY = this.topY - this.node.height;
        }

        if (this.node.anchorY === 1) {
            this.topY = this.node.parent.convertToWorldSpaceAR(this.node.position).y;
            this.bottomY = this.topY - this.node.height;
        }
    }

    /**
     * 注册ScrollView回调
     */
    private setScrollHandler(): void {
        let scrollViewEventHandler = new cc.Component.EventHandler();
        scrollViewEventHandler.target = this.node;
        scrollViewEventHandler.component = "TableView";
        scrollViewEventHandler.handler = "scrollViewCallback";
        scrollViewEventHandler.customEventData = "TableView";

        let scrollView = this.node.getComponent(cc.ScrollView);
        scrollView.scrollEvents.push(scrollViewEventHandler);
        this.content = scrollView.content;
    }

    /**
     * 滚动回调
     */
    private scrollViewCallback(scrollView: cc.ScrollView): void {
        this.setOpacity();

        // 当前滚动视图偏移量，往下滚动该值增大
        let curPosY = scrollView.getScrollOffset().y;

        // 获取增量delta
        if (this.posY !== null && this.posY !== curPosY && this.isScrollLock) {
            this.delta = this.posY - curPosY;
            this.isScrollLock = false;
        }
        if (this.posY !== curPosY && !this.isScrollLock) {
            this.posY = curPosY;
            this.isScrollLock = true;
        }

        // 增量为负，向下滚动
        if (this.delta < 0) {
            this.setScrollDownPos();
        }

        // 增量为正，向上滚动
        if (this.delta > 0) {
            this.setScrollUpPos();
        }
    }

    /** 
     * 设置向下滚动位置
     */
    private setScrollDownPos(): void {
        if (this.scrollToBottomList.length !== 0) {
            this.scrollToBottomList.forEach(node => {
                let itemPosY = this.content.convertToWorldSpaceAR(node.position).y;
                if (this.loop) {
                    if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                        // 开启无限滚动，子节点由上到下排列的情况
                        // item完全超出上边界后移动到到最下面，没有停止条件
                        if (itemPosY - 1 / 2 * this.itemHeight > this.topY) {
                            node.y -= this.itemList.length * (this.itemHeight + this.spacingY);
                            // 越往下滚content高度越大
                            this.content.height += this.itemHeight + this.spacingY;
                            this.scrollToTopList.push(node);
                        }
                    } else {
                        // 开启无限滚动，子节点由下到上排列的情况
                        // item完全超出上边界并且content未恢复初始高度时，移动到到最下面
                        if (itemPosY - 1 / 2 * this.itemHeight > this.topY && this.content.height > this.initialContentHeight) {
                            // 越往下滚content高度越小，直到恢复初始高度
                            this.content.height -= this.itemHeight + this.spacingY;
                            node.y -= this.itemList.length * (this.itemHeight + this.spacingY);
                        }
                    }
                } else {
                    if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                        // 未开启无限滚动，子节点由上到下排列的情况
                        // item完全超出上边界并且数据没有展示完时，移动到到最下面
                        if (itemPosY - 1 / 2 * this.itemHeight > this.topY && this.dataCounter < data.length) {
                            node.y -= this.itemList.length * (this.itemHeight + this.spacingY);
                            this.content.height += this.itemHeight + this.spacingY;
                            // 给移动到最下面的item添加未展示的数据
                            this.viewScript.initItem(data, node.zIndex, this.dataCounter);
                            this.scrollToTopList.push(node);
                            this.dataCounter++;
                        }
                    } else {
                        // 未开启无限滚动，子节点由下到上排列的情况
                        // 回滚还原先前数据
                        if (itemPosY - 1 / 2 * this.itemHeight > this.topY && this.dataCounter > this.initialDataCounter) {
                            node.y -= this.itemList.length * (this.itemHeight + this.spacingY);
                            this.content.height -= this.itemHeight + this.spacingY;
                            this.dataCounter--;
                            // 给item添加上一次的数据
                            this.viewScript.initItem(data, node.zIndex, this.dataCounter - this.itemList.length);
                        }
                    }
                }
            });

            if (this.verticalDirection === VerticalDirection.BOTTOM_TO_TOP) {
                // 子节点由下到上排列时，向下滚动的停止条件
                if (this.content.height < this.initialContentHeight) {
                    this.content.height = this.initialContentHeight;
                    this.scrollToBottomList = [];
                }
            }
        }
    }

    /** 
     * 设置向上滚动位置
     */
    private setScrollUpPos(): void {
        if (this.scrollToTopList.length !== 0) {
            this.scrollToTopList.forEach(node => {
                let itemPosY = this.content.convertToWorldSpaceAR(node.position).y;
                if (this.loop) {
                    if (this.verticalDirection === VerticalDirection.BOTTOM_TO_TOP) {
                        // 开启无限滚动，子节点由上到下排列的情况
                        // item完全超出下边界后移动到到最上面，没有停止条件
                        if (itemPosY + 1 / 2 * this.itemHeight < this.bottomY) {
                            this.content.height += this.itemHeight + this.spacingY;
                            node.y += this.itemList.length * (this.itemHeight + this.spacingY);
                            this.scrollToBottomList.push(node);
                        }
                    } else {
                        // 开启无限滚动，子节点由下到上排列的情况
                        // item完全超出下边界并且content未恢复初始高度时，移动到到最上面
                        if (itemPosY + 1 / 2 * this.itemHeight < this.bottomY && this.content.height > this.initialContentHeight) {
                            this.content.height -= this.itemHeight + this.spacingY;
                            node.y += this.itemList.length * (this.itemHeight + this.spacingY);
                        }
                    }
                } else {
                    if (this.verticalDirection === VerticalDirection.BOTTOM_TO_TOP) {
                        // 未开启无限滚动，子节点由上到下排列的情况
                        // item完全超出下边界并且数据没有展示完时，移动到到最上面
                        if (itemPosY + 1 / 2 * this.itemHeight < this.bottomY && this.dataCounter < data.length) {
                            node.y += this.itemList.length * (this.itemHeight + this.spacingY);
                            this.content.height += this.itemHeight + this.spacingY;
                            // 给移动到最上面的item添加未展示的数据
                            this.viewScript.initItem(data, node.zIndex, this.dataCounter);
                            this.scrollToBottomList.push(node);
                            this.dataCounter++;
                        }
                    } else {
                        // 未开启无限滚动，子节点由下到上排列的情况
                        // 回滚还原先前数据
                        if (itemPosY + 1 / 2 * this.itemHeight < this.bottomY && this.dataCounter > this.initialDataCounter) {
                            node.y += this.itemList.length * (this.itemHeight + this.spacingY);
                            this.content.height -= this.itemHeight + this.spacingY;
                            this.dataCounter--;
                            // 给item添加上一次的数据
                            this.viewScript.initItem(data, node.zIndex, this.dataCounter - this.itemList.length);
                        }
                    }
                }
            });

            if (this.verticalDirection === VerticalDirection.TOP_TO_BOTTOM) {
                // 子节点由上到下排列时，向上滚动的停止条件
                if (this.content.height < this.initialContentHeight) {
                    this.content.height = this.initialContentHeight;
                    this.scrollToTopList = [];
                }
            }
        }
    }

    /**
     * 设置透明度
     */
    private setOpacity(): void {
        this.itemList.forEach(node => {
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

    /**
     * 获得item数据，用于初始化item，暴露给界面脚本
     */
    public getData<T>(itemData: Array<T>): void {
        data = itemData || [];
    }

    /**
     * 获得item数据，用于更新itemList，暴露给界面脚本
     */
    public updateData<T>(itemData: Array<T> | T): void {
        // 类型保护
        function isArray(arr: Array<T> | T): arr is Array<T> {
            return true;
        }
        if (isArray(itemData)) {
            data.push(...itemData);
        } else {
            data.push(itemData);
        }
    }
}