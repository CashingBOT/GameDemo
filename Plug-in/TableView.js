
cc.Class({
    extends: cc.ScrollView,

    editor: CC_EDITOR && {
        menu: "i18n:MAIN_MENU.component.ui/TableView",
        executeInEditMode: true,
        requireComponent: cc.Mask,
    },

    properties: {
        _pageCallback: null,
        _curPage: 2,
        _totalPage: 1,
        _dataList: [],
        itemPrefab: cc.Prefab,
        spacing: 10,
        _itemPool: null,
        _updateTag: true,

        /**
         * !#en Enable horizontal scroll.
         * !#zh 是否开启水平滚动。
         * @property {Boolean} horizontal
         */
        horizontal: {
            default: false,
            override: true,
            readonly: true,
            animatable: false,
            tooltip: "是否开启水平滚动，当前属性值不可手动更改，当vertical为false的时候默认选中",
        },

        /**
         * !#en Enable vertical scroll.
         * !#zh 是否开启垂直滚动。
         * @property {Boolean} vertical
         */
        vertical: {
            default: true,
            override: true,
            animatable: false,
            tooltip: CC_DEV && 'i18n:COMPONENT.scrollview.vertical',
            notify () {
                this.horizontal = !this.vertical;
                this._updateContentWidget();
            },
        },
    },

    onLoad () {
        if (!this.content && CC_EDITOR) {
            let node = new cc.Node();
            node.name = "content";
            node.parent = this.node;
            let widget = node.addComponent(cc.Widget);
            widget.isAlignTop = widget.isAlignLeft = widget.isAlignBottom = widget.isAlignRight = true;
            widget.top = widget.left = widget.right = widget.bottom = 0;
            this.content = node;
            this._updateContentWidget();
        }

        if (!CC_EDITOR) {
            this.node.on("pageData", this.onPageData, this);
            this._initItem();
        }
    },

    _updateContentWidget () {
        if (!this.content) return;
        let widget = this.content.getComponent(cc.Widget);
        if (this.vertical) {
            this.content.anchorX = this.node.anchorX = 0.5;
            this.content.anchorY = this.node.anchorY = 1;
            widget.isAlignRight = true;
            widget.isAlignBottom = false;
            widget.right = widget.bottom = 0;

        } else {
            this.content.anchorX = this.node.anchorX = 0;
            this.content.anchorY = this.node.anchorY = 0.5;
            widget.isAlignRight = false;
            widget.isAlignBottom = true;
            widget.right = widget.bottom = 0;
        }
    },

    _initItem () {
        this._itemPool = new cc.NodePool(this.itemPrefab.name);
        this._itemH = this.itemPrefab.data.height + this.spacing;
        this._itemW = this.itemPrefab.data.width + this.spacing;
        this._halfH = this.itemPrefab.data.height / 2;
        this._halfW = this.itemPrefab.data.width / 2;
        let initCount = this.vertical ? Math.ceil(this.node.height / this._itemH) + 2 : Math.ceil(this.node.width / this._itemW) + 2;
        this._maxShowNum = initCount;

        for (let i = 0; i < initCount; ++i) {
            let _item = cc.instantiate(this.itemPrefab);
            this._itemPool.put(_item);
        }
    },

    /**
     * 列表数据
     * @param {Object} obj 需要显示的数据
     * @param {Function} pageCallback 需要翻页获取数据的callback
     */
    initData (obj, pageCallback) {
        this._clearData();
        // 如果数据不存在不执行
        if (!obj || !obj.records.length) return;

        this._updateTag = true;

        this._curPage = 2;

        this._totalPage = obj.totalPage;

        this._dataList = obj.records;

        this._pageCallback = pageCallback;

        this._initContent();
    },

    // 翻页数据 push
    pageDataPush (list) {
        this._dataList = [...this._dataList, ...list];
        if (this.vertical) {
            this.content.height = this._itemH * this._dataList.length - this.spacing;
        } else {
            this.content.width = this._itemW * this._dataList.length - this.spacing;
        }

        this._curPage += 1;
        this._updateTag = true;
    },

    onPageData () {
        this._pageCallback && this._pageCallback(this._curPage);
    },

    _initContent () {
        this.content.y = 0;
        let len = Math.min(this._maxShowNum, this._dataList.length);
        for (let i = 0; i < len; ++i) {
            this._addItem(i);
        }

        if (this.vertical) {
            this.content.height = this._itemH * this._dataList.length - this.spacing;
            this._lastPosy = 0;
        } else {
            this.content.width = this._itemW * this._dataList.length - this.spacing;
            this._lastPosx = 0;
        }
    },

    deleteItem (list, index) {
        this._dataList = list;

        if (this.vertical) {
            this.content.height = this._itemH * this._dataList.length - this.spacing;
        } else {
            this.content.width = this._itemW * this._dataList.length - this.spacing;
        }

        let children = this.content.children;
        let num = 0, unuse = [];
        for (let i = 0, len = children.length; i < len; ++i) {
            let child = children[i];
            if (child._index >= index) {
                unuse.push(child);
                num++;
            }
        }

        // 把超出屏幕的item放入对象池
        unuse.map(v => this._itemPool.put(v));

        let _nextIndex = index;
        let newLen = num + _nextIndex > this._dataList.length ? this._dataList.length : num + _nextIndex;
        let surplus = (num + _nextIndex) - newLen;
        for (let j = _nextIndex; j < newLen; ++j) {
            this._addItem(j);
        }

        let _fIndex = children[0]._index, _idx = 1;;
        if (_fIndex === 0) return;
        while (surplus > 0) {
            this._addItem(_fIndex - _idx, true);
            --surplus;
            ++_idx;
        }
    },

    getItem (index) {
        if (!this._dataList[index]) {
            return;
        }

        // 需要去请求下页数据
        if (this._updateTag && index / this._dataList.length >= 2 / 3) {
            this._updateTag = false;
            if (this._curPage <= this._totalPage) {
                this.node.emit("pageData");
            }
        }

        if (this._itemPool.size() === 0) {
            let _item = cc.instantiate(this.itemPrefab);
            this._itemPool.put(_item);
        }

        return this._itemPool.get(this._dataList[index]);
    },

    _addItem (index, insert) {
        let _item = this.getItem(index);

        if (!_item) return;

        if (insert) {
            this.content.insertChild(_item, 0);
        } else {
            _item.parent = this.content;
        }

        if (this.vertical) {
            _item.position = cc.v2(0, -this._itemH * index - this._halfH);
        } else {
            _item.position = cc.v2(this._itemW * index + this._halfW, 0);
        }

        _item._index = index;
    },

    _iteminView () {
        if (this.vertical) {
            // 垂直滑动
            let _curY = this.content.y;
            if (_curY <= 0 || _curY === this._lastPosy) {
                return;
            }

            if (_curY > this._lastPosy) {
                this._scrollBottomItem(_curY);
            } else {
                this._scrollTopItem(_curY);
            }

            this._lastPosy = _curY;
        } else {
            // 水平滑动
            let _curX = this.content.x;
            if (_curX >= 0 || _curX === this._lastPosx) {
                return;
            }

            if (_curX < this._lastPosx) {
                this._scrollRightItem(_curX);
            } else {
                this._scrollLeftItem(_curX);
            }

            this._lastPosx = _curX;
        }
    },

    // 往下滚动，index 变大
    _scrollBottomItem (offsetY) {
        let children = this.content.children;
        let len = children.length;
        let _lastChild = children[len - 1];
        if (_lastChild && _lastChild._index === this._dataList.length - 1) {
            return;
        }

        let num = 0, unuse = [];
        for (let i = 0; i < len; ++i) {
            let child = children[i];
            let posy = Math.abs(child.y + this._halfH) + this._itemH;
            if (offsetY >= posy) {
                unuse.push(child);
                num++;
            }
        }

        // 把超出屏幕的item放入对象池
        unuse.map(v => this._itemPool.put(v));

        let _nextIndex = _lastChild._index + 1;
        let newLen = num + _nextIndex > this._dataList.length ? this._dataList.length : num + _nextIndex;
        for (let j = _nextIndex; j < newLen; ++j) {
            this._addItem(j);
        }
    },

    // 往上滚动，index 变小
    _scrollTopItem (offsetY) {
        let children = this.content.children;
        let _firstChild = children[0];
        if (_firstChild && _firstChild._index === 0) {
            return;
        }

        let num = 0, unuse = [];
        for (let i = children.length - 1; i >= 0; --i) {
            let child = children[i];
            let posy = Math.abs(child.y + this._halfH) + this._itemH;
            let maxOffsetY = offsetY + this._itemH * this._maxShowNum;
            if (posy >= maxOffsetY) {
                unuse.push(child);
                num++;
            }
        }

        // 把超出屏幕的item放入对象池
        unuse.map(v => this._itemPool.put(v));

        let _index = _firstChild._index;
        let newLen = _index - num < 0 ? 0 : _index - num;
        for (let j = _index - 1; j >= newLen; --j) {
            this._addItem(j, true);
        }
    },

    // 往右滚动，index 变大
    _scrollRightItem (offsetX) {
        let children = this.content.children;
        let len = children.length;
        let _lastChild = children[len - 1];
        if (_lastChild && _lastChild._index === this._dataList.length - 1) {
            return;
        }

        let num = 0, unuse = [];
        for (let i = 0; i < len; ++i) {
            let child = children[i];
            let posx = child.x + this._halfW + this._itemW;
            if (Math.abs(offsetX) >= posx) {
                unuse.push(child);
                num++;
            }
        }

        // 把超出屏幕的item放入对象池
        unuse.map(v => this._itemPool.put(v));

        let _nextIndex = _lastChild._index + 1;
        let newLen = num + _nextIndex > this._dataList.length ? this._dataList.length : num + _nextIndex;
        for (let j = _nextIndex; j < newLen; ++j) {
            this._addItem(j);
        }
    },

    // 往左滚动，index 变小
    _scrollLeftItem (offsetX) {
        let children = this.content.children;
        let _firstChild = children[0];
        if (_firstChild && _firstChild._index === 0) {
            return;
        }

        let num = 0, unuse = [];
        for (let i = children.length - 1; i >= 0; --i) {
            let child = children[i];
            let posX = child.x + this._halfW + this._itemW;
            let maxOffsetX = Math.abs(offsetX) + this._itemW * this._maxShowNum;
            if (posX >= maxOffsetX) {
                unuse.push(child);
                num++;
            }
        }

        // 把超出屏幕的item放入对象池
        unuse.map(v => this._itemPool.put(v));

        let _index = children[0]._index;
        let newLen = _index - num < 0 ? 0 : _index - num;
        for (let j = _index - 1; j >= newLen; --j) {
            this._addItem(j, true);
        }

    },

    _clearData () {
        let children = this.content.children;
        for (let i = children.length - 1; i >= 0; --i) {
            let child = children[i];
            this._itemPool.put(child);
        }
    },

    onDisable () {
        this._clearData();
        this._autoScrolling = false;
    },

    onDestroy () {
        if (!CC_EDITOR) {
            this.node.off("pageData", this.onPageData, this);
            this._itemPool.clear();
        }
    },

    _onTouchMoved (event, captureListeners) {
        this._super(event, captureListeners);
        this._iteminView();
    },


    _onMouseWheel (event, captureListeners) {
        this._super(event, captureListeners);
        this._iteminView();
    },

    lateUpdate () {
        if (this._autoScrolling) {
            this._iteminView();
        }
    }
});