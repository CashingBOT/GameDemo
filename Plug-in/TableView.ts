const { ccclass, property, menu, disallowMultiple } = cc._decorator;

@ccclass()
@menu("i18n:MAIN_MENU.component.ui/TableViewFixed")
@disallowMultiple
export default class TableViewFixed<T> extends cc.Component {
    /******************** Class scope value ********************/

    /**
     * 方向
     */
    public static Direction = cc.Enum({
        Horizontal: 0,
        Vertical: 1,
    });
    /**
     * item模板
     */
    @property(cc.Node)
    itemTemplate: cc.Node = null;
    /**
     * 页边距
     */
    @property(cc.Float)
    edgeMargin: number = 0;
    /**
     * item的间隔
     */
    @property(cc.Float)
    itemMargin: number = 0;
    /**
     * item点击事件回调
     */
    @property([cc.Component.EventHandler])
    itemClickEvents: cc.Component.EventHandler[] = [];
    /**
     * item设置数据事件回调
     */
    @property(cc.Component.EventHandler)
    itemSetDataEvent: cc.Component.EventHandler = null;
    /**
     * 数据
     */
    private _data: T[] = [];
    /**
     * 获取数据
     */
    public get data(): T[] {
        return this._data;
    }
    /**
     * 只更新单个数据
     */
    private refreshOneItem = false;
    /**
     * item列表
     */
    protected _itemList: cc.Node[] = [];
    /**
     * item索引和item的映射字典
     */
    private itemIdxMap: Map<cc.Node, number> = new Map();
    /**
     * scrollView组件
     */
    protected _scrollView: cc.ScrollView = null;
    /**
     * item容器
     */
    protected _container: cc.Node = null;
    /**
     * 可视范围
     */
    protected _viewRect: cc.Size = null;
    /**
     * item大小
     */
    protected _itemSize: cc.Size = null;
    /**
     * 布局开关
     */
    protected _needDoLayout = false;
    /**
     * 方向
     */
    private _direction = TableViewFixed.Direction.Vertical;

    /******************** Live callbacks ********************/

    protected onLoad(): void {
        // init field
        this._scrollView = this.getComponent(cc.ScrollView);
        this._container = this._scrollView.content;
        this._viewRect = this.node.getContentSize();
        this._itemSize = this.itemTemplate.getContentSize();
        // create new event handler
        const scrollEventHandler = new cc.Component.EventHandler();
        scrollEventHandler.target = this.node;
        scrollEventHandler.component = "TableViewFixed";
        scrollEventHandler.handler = "onScroll";
        this._scrollView.scrollEvents.push(scrollEventHandler);
        // dir
        if (this._scrollView.horizontal === true && this._scrollView.vertical === false) {
            this._direction = TableViewFixed.Direction.Horizontal;
        } else if (this._scrollView.horizontal === false && this._scrollView.vertical === true) {
            this._direction = TableViewFixed.Direction.Vertical;
        } else {
            cc.error("List View 必须唯一滚动方向!");
        }
    }

    protected update(dt: number): void {
        if (this._needDoLayout) {
            this.doLayout();
        }
    }

    /******************** Logic ********************/

    /**
     * 计算item位置
     * @param itemIdx item索引
     * @returns item的坐标
     */
    protected calcItemPos(itemIdx: number): cc.Vec2 {
        if (this._direction === TableViewFixed.Direction.Horizontal) {
            const posX =
                this.edgeMargin + this._itemSize.width / 2 + (this._itemSize.width + this.itemMargin) * itemIdx;
            const posY = 0;
            return cc.v2(posX, posY);
        } else {
            const posX = 0;
            const posY =
                -this.edgeMargin - this._itemSize.height / 2 - (this._itemSize.height + this.itemMargin) * itemIdx;
            return cc.v2(posX, posY);
        }
    }

    /**
     * 滚动事件回调
     */
    private onScroll(): void {
        this.checkItemShow();
    }

    /**
     * 检查item显示
     */
    protected checkItemShow(): void {
        // check exist item
        let items: { [key: number]: cc.Node } = {};
        for (let i = 0; i < this._itemList.length; i++) {
            const item = this._itemList[i];
            let itemIndex = this.itemIdxMap.get(item);
            item.active = this.needShow(itemIndex);
            items[itemIndex] = item;
        }
        for (let i = 0; i < this.data.length; i++) {
            const show = this.needShow(i);
            if (show) {
                let item = items[i];
                if (items[i] == null) {
                    // data没有对应的viewItem时进行item的选定和初始化
                    item = this.pickItem();
                    item.active = true;
                    this.itemIdxMap.set(item, i);
                    this.setItemData(item, this.data[i], i);
                    item.position = this.calcItemPos(i);
                }
            }
        }
    }

    /**
     * 选取item
     * @returns 新item
     */
    private pickItem(): cc.Node {
        for (let i = 0; i < this._itemList.length; i++) {
            const item = this._itemList[i];
            if (item.active === false) {
                return item;
            }
        }
        return this.newItem();
    }

    /**
     * 创建新item并返回
     */
    private newItem(): cc.Node {
        const node = cc.instantiate(this.itemTemplate);
        this._itemList.push(node);
        node.parent = this._container;
        node.on(cc.Node.EventType.TOUCH_END, this.itemOnTouch, this);
        return node;
    }

    /**
     * item触摸事件回调
     */
    itemOnTouch(event: cc.Event.EventTouch): void {
        const startPos = event.getStartLocation();
        const endPos = event.getLocation();
        const distance = startPos.sub(endPos).mag();
        if (distance < 25) {
            const item: cc.Node = event.target;
            if (item.active) {
                let itemIndex = this.itemIdxMap.get(item);
                this.onItemClick(item, this.data[itemIndex], itemIndex);
            }
        }
    }

    /**
     * 判断是否展示并返回结果
     */
    private needShow(itemIdx: number): boolean {
        if (itemIdx >= this.data.length) {
            return false;
        }
        if (this._direction === TableViewFixed.Direction.Horizontal) {
            const containerX = this._container.x;
            const itemX = this.calcItemPos(itemIdx).x;
            const offset = itemX + containerX;
            return (
                offset > -(this._viewRect.width + this._itemSize.width) / 2 &&
                offset < (this._viewRect.width + this._itemSize.width) / 2
            );
        } else {
            const containerY = this._container.y;
            const itemY = this.calcItemPos(itemIdx).y;
            const offset = itemY + containerY;
            return (
                offset < (this._viewRect.height + this._itemSize.height) / 2 &&
                offset > -(this._viewRect.height + this._itemSize.height) / 2
            );
        }
    }

    /**
     * 执行布局
     */
    protected doLayout(): void {
        const count = this.data.length;
        for (let i = 0; i < this._itemList.length; i++) {
            const item = this._itemList[i];
            item.active = false;
        }
        if (this._direction === TableViewFixed.Direction.Horizontal) {
            const width = this.edgeMargin * 2 + this._itemSize.width * count + this.itemMargin * (count - 1);
            const height = this._viewRect.height;
            this._container.setContentSize(cc.size(width, height));
            this._scrollView.scrollToLeft(0);
        } else {
            const width = this._viewRect.width;
            const height = this.edgeMargin * 2 + this._itemSize.height * count + this.itemMargin * (count - 1);
            this._container.setContentSize(cc.size(width, height));
            this._scrollView.scrollToTop(0);
        }
        this.checkItemShow();
        this.refreshItems(); // TODO: 暂时
        this._needDoLayout = false;
    }

    /**
     * 初始化单个item
     */
    private setItemData(item: cc.Node, data: T, index: number): void {
        this.itemSetDataEvent.emit([item, data, index]);
    }

    /**
     * item点击事件，初始化单个item
     */
    private onItemClick(item: cc.Node, data: T, index: number): void {
        for (let handler of this.itemClickEvents) {
            handler.emit([item, data, index]);
        }
    }

    /******************** External call ********************/

    /**
     * 设置可视范围
     */
    public set viewRect(v: any) {
        this._viewRect = v;
    }

    /**
     * 设置数据
     */
    public set data(ds: T[]) {
        this._data = ds;
        // 设置完数据，打开布局开关
        if (this.refreshOneItem) {
            this.refreshOneItem = false;
            return;
        }
        this._needDoLayout = true;
    }

    /**
     * 刷新item
     */
    public refreshItems(): void {
        this._itemList.forEach((item: cc.Node) => {
            let itemIndex = this.itemIdxMap.get(item);
            if (this.data[itemIndex]) {
                this.setItemData(item, this.data[itemIndex], itemIndex);
            }
        });
    }

    /**
     * 只刷新一次
     */
    public refreshItemsOnce(): void {
        this.refreshOneItem = true;
    }
}
