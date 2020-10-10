const { ccclass, property, menu, disallowMultiple, requireComponent, executionOrder } = cc._decorator;

const enum directionType {
    /** 向上添加 */
    top = 1,
    /** 向下添加 */
    bottom = 2,
}

/**
 * list view 组件
 * @description 使用方法参考ListViewComponent.prefab组件
 */
@ccclass
@menu("游戏组件/ListView")
@requireComponent(cc.ScrollView)
@disallowMultiple
// @executionOrder(-1)
export default class ListView extends cc.Component {
    /** item */
    @property({
        type: cc.Prefab,
        tooltip: "item组件",
    })
    private itemNode: cc.Node = null;

    /** 刷新频率 */
    @property({
        type: cc.Integer,
        range: [1, 10],
        tooltip: "刷新频率（值越小刷新频率越低、性能越高）",
        slide: true,
    })
    private updateRate = 3;

    /** 渲染事件（渲染器） */
    @property({
        type: cc.Component.EventHandler,
        tooltip: "渲染事件（渲染器）",
    })
    private renderEvent: cc.Component.EventHandler = new cc.Component.EventHandler();

    /** 滚动事件 */
    @property({
        type: cc.Component.EventHandler,
        tooltip: "滚动事件",
    })
    private scrollEvent: cc.Component.EventHandler = new cc.Component.EventHandler();

    /** item总数量 */
    private _items: number = 0;
    /** item总数量 */
    get items() {
        return this._items;
    }
    set items(length: number) {
        if (this._items && this._items != length) {
            this.updateItemLength = true;
        }
        this._items = length;
    }
    /** 更新数据长度 */
    private updateItemLength: boolean = false;
    /** item列表 */
    itemNodeList: cc.Node[] = [];
    /** scroll content */
    private scrollContent: cc.Node;
    /** scroll view */
    scrollView: cc.ScrollView;
    /** 已经添加过的数量总数 */
    private addSum: number = 0;

    /** 渲染列表的方向 => 竖 从上到下，从下到上 */

    /** item 对象池 */
    private itemPool: cc.NodePool = null;
    /** 记录点击滚动开始时的y轴起始值 */
    private oldY = 0;

    /** 是否在初始化 */
    private isInit: boolean = false;

    onLoad() {
        this.scrollView = this.node.getComponent(cc.ScrollView);
        this.scrollContent = this.scrollView.content;
        if (!this.scrollContent) {
            console.error("miss scroll content");
            return;
        }

        this.itemPool = new cc.NodePool();

        this.scrollView.node.on("scrolling", this.onScrollEvent, this);

        // this.scrollView.node.on("scroll-to-bottom", this.onScrollToBottom, this);
        // this.scrollView.node.on("scroll-to-top", this.onScrollToTop, this);
    }

    start() {
        this.initItem();
    }

    /**
     * 初始化item
     */
    private initItem() {
        if (this.isInit) {
            return;
        }
        this.isInit = true;
        this.updateItemLength = false;
        if (this.itemNodeList.length) {
            this.itemNodeList.forEach((e) => this.itemPool.put(e));
        }
        this.addSum = 0;
        this.itemNodeList = [];
        this.scrollContent.height = 0;
        this.scheduleOnce(() => {
            for (let x = 0; x < this.items; x++) {
                let node = this.addItem(directionType.bottom, x);
                if (Math.abs(0 - node.y) + node.height > this.scrollView.node.height) {
                    break;
                }
            }
            this.isInit = false;
        });
    }

    private onScrollToTop(e: cc.ScrollView) {
        // console.log(1);
        // e.stopAutoScroll();
        // e.brake = 0;
        e.inertia = true;
        // this.scrollView.scrollTo(cc.v2(0 - 50), 0.3);
    }

    // /** 滚动到底 */
    // private onScrollToBottom(e) {
    //     console.log(e);
    // }

    private onScrollEvent(e: cc.ScrollView) {
        let idx;
        let itemPos;
        let preNode;

        for (let x = this.updateRate; x > -1; x--) {
            if (this.oldY < e.getScrollOffset().y) {
                // console.log("u");
                itemPos = this.itemNodeList[0].convertToWorldSpaceAR(cc.v2());
                //remove top to pool
                if (e.node.convertToNodeSpaceAR(itemPos).y > this.itemNodeList[0].height) {
                    cc.Tween.stopAllByTarget(this.itemNodeList[0]);
                    this.itemPool.put(this.itemNodeList[0]);
                    this.itemNodeList.splice(0, 1);
                }

                if (this.itemNodeList.length) {
                    preNode = this.itemNodeList[this.itemNodeList.length - 1];
                    idx = preNode["idx"];
                    itemPos = preNode.convertToWorldSpaceAR(cc.v2());
                    //add to bottom
                    if (
                        idx < this.items - 1 &&
                        e.node.convertToNodeSpaceAR(itemPos).y + this.getScrollViewHeight() - preNode.height >= -20
                    ) {
                        // console.log("add bottom");
                        idx++;
                        this.addItem(directionType.bottom, idx);
                    }
                } else {
                    this.addItem(directionType.bottom, this.items - 1);
                }
            } else {
                // console.log("d");
                preNode = this.itemNodeList[this.itemNodeList.length - 1];
                itemPos = preNode.convertToWorldSpaceAR(cc.v2());
                //bottom remove to pool
                if (e.node.convertToNodeSpaceAR(itemPos).y + this.getScrollViewHeight() <= 0) {
                    cc.Tween.stopAllByTarget(preNode);
                    this.itemPool.put(preNode);
                    this.itemNodeList.pop();
                    // console.warn("del bottom");
                }

                if (this.itemNodeList.length) {
                    //add to top
                    idx = this.itemNodeList[0]["idx"];
                    itemPos = this.itemNodeList[0].convertToWorldSpaceAR(cc.v2());
                    if (idx > 0 && e.node.convertToNodeSpaceAR(itemPos).y <= 0) {
                        idx--;
                        this.addItem(directionType.top, idx);
                    }
                } else {
                    this.addItem(directionType.top, 0);
                }
            }
        }
        this.oldY = e.getScrollOffset().y;
        if (this.scrollEvent) {
            cc.Component.EventHandler.emitEvents([this.scrollEvent], e);
        }
    }

    /**
     * 添加一个item到场景
     * @param direction 添加的方向位置
     * @param idx 下标
     */
    private addItem(direction: directionType, idx: number): cc.Node {
        let node = this.getItem(),
            y: number = 0;

        this.scrollContent.addChild(node);
        node.active = false; //TODO 正常来说false的做属性改变是不会影响到render的
        this.sendRenderEvent(node, idx);

        node["idx"] = idx;
        switch (direction) {
            case directionType.top: //top
                y = this.itemNodeList.length ? this.itemNodeList[0].y + node.height : 0;
                this.itemNodeList.unshift(node);
                break;
            case directionType.bottom: //bottom
                let preNode = this.itemNodeList[this.itemNodeList.length - 1];
                y = this.itemNodeList.length ? preNode.y - preNode.height : -this.scrollContent.height + node.height;
                this.itemNodeList.push(node);
                if (!this.scrollContent.height) y = 0;
                if (this.addSum <= idx) {
                    this.addSum++;
                    this.scrollContent.height += node.height;
                }
                break;
        }

        node.y = y;
        node.active = true;
        return node;
    }

    /**
     * 创建一个item
     */
    private getItem(): cc.Node {
        let node: cc.Node;
        if (this.itemPool.size()) {
            node = this.itemPool.get();
        } else {
            node = cc.instantiate(this.itemNode);
        }
        return node;
    }

    /**
     * 发送渲染事件
     * @param item 渲染的item
     * @param idx 下标
     */
    private sendRenderEvent(item: cc.Node, idx: number) {
        if (this.renderEvent) {
            cc.Component.EventHandler.emitEvents([this.renderEvent], item, idx);
        }
    }

    /**
     * 监听或是获取滚动容器高度
     */
    private getScrollViewHeight(): number {
        return this.scrollView.node.height;
    }

    /**
     * TODO
     * 添加数据，删除数据
     */

    /**
     * 更新当前item列表 TODO 暂时未测试
     * @param refreshAllItem 是否刷新所有item的render
     */
    refreshData(refreshAllItem?: boolean) {
        let node: cc.Node,
            idx: number = 0,
            maxY: number = 0,
            lastNode;

        if (this.updateItemLength || !this.itemNodeList.length) {
            //TODO 如果更新了数据长度，初始化整个列表
            this.initItem();
            return;
        }

        this.oldY = 0;
        if (this.itemNodeList.length) {
            lastNode = this.itemNodeList[this.itemNodeList.length - 1];
            idx = lastNode["idx"] + 1;
            maxY = this.itemNodeList[0].y;
            if (refreshAllItem) {
                //刷新所有item
                let oldHeight = 0,
                    newHeight = 0;

                //更新高度适配
                this.itemNodeList.forEach((e, index) => {
                    oldHeight += e.height;
                    this.sendRenderEvent(e, e["idx"]);
                    if (index) {
                        e.y = this.itemNodeList[index - 1].y - this.itemNodeList[index - 1].height;
                    }
                    newHeight += e.height;
                });
                this.scrollContent.height += newHeight - oldHeight;
            }
            if (Math.abs(maxY - lastNode.y) + lastNode.height > this.scrollView.node.height) {
                return;
            }
        }

        if (this.addSum === this.itemNodeList.length) {
            return;
        }

        for (let x = 0; x < this.items; x++) {
            node = this.addItem(directionType.bottom, idx);
            if (Math.abs(maxY - node.y) + node.height > this.scrollView.node.height) {
                break;
            }
            idx++;
        }
    }

    /**
     * 在顶部添加一条数据 => 目前只支持加一个
     * @param time 移动时间
     * @description 此功能暂时被这个游戏定制了，其它地方不建议用
     * TODO 少一个优化，添加列表的时候没有去判断已经在场景外的item，然后移出
     */
    addItemTop(time: number = 0.2): Promise<cc.Node> {
        let scrollY = Math.floor(this.scrollView.getScrollOffset().y);

        if (scrollY) {
            this.scrollView.scrollToTop(0.4);
        }

        return new Promise((resolve) => {
            // TODO 此处貌 似可优化，有时间 再看
            this.scheduleOnce(
                () => {
                    this.items++;
                    if (this.items <= 4) {
                        let oldHeight = this.itemNodeList[0].height;
                        // TODO 这里需要优化，，，，，，，，，，，，优化 ，，，，，，优化
                        this.sendRenderEvent(this.itemNodeList[0], 0);

                        let idx = 1;
                        let node = this.getItem();
                        node["idx"] = idx;
                        this.addSum++;
                        this.scrollContent.addChild(node);
                        this.sendRenderEvent(node, idx);
                        this.itemNodeList.splice(1, 0, node);
                        this.scrollContent.height = 0;
                        this.itemNodeList.forEach((e, index) => {
                            e["idx"] = index;
                            if (index) {
                                e.y = this.itemNodeList[index - 1].y - this.itemNodeList[index - 1].height;
                            } else {
                                e.y = 0;
                            }
                            this.scrollContent.height += e.height;
                        });
                        if (this.scrollView.node.height <= 1334) {
                            this.scrollContent.y = oldHeight - this.itemNodeList[0].height;
                            this.scrollView.scrollToTop(0.4);
                        }
                        resolve(this.itemNodeList[1]);
                        return;
                    }

                    let idx = 1;
                    let node = this.getItem();
                    node["idx"] = idx;
                    this.scrollContent.addChild(node);
                    this.sendRenderEvent(node, idx);
                    node.y = -(this.itemNodeList[0].height - node.height);
                    this.itemNodeList[0].y = node.height;
                    this.addSum++;
                    this.scrollContent.height += node.height;
                    this.itemNodeList.splice(1, 0, node);
                    this.itemNodeList.forEach((e, index) => {
                        cc.Tween.stopAllByTarget(e);
                        cc.tween(e)
                            .to(time, { y: e.y - node.height })
                            .start();
                        e["idx"] = index;
                    });

                    this.scheduleOnce(
                        () => {
                            this.onScrollEvent(this.scrollView);
                        },
                        scrollY ? 0.4 : 0
                    );
                    resolve(node);
                },
                scrollY ? 0.4 : 0
            );
        });
    }
}
