cc.Class({
    extends: cc.Component,

    editor: CC_EDITOR && {
        menu: "i18n:MAIN_MENU.component.ui/ToggleButton",
        executeInEditMode: true,
    },

    properties: {
        openSpriteFrame: cc.SpriteFrame,
        closeSpriteFrame: cc.SpriteFrame,
        selectType: {
            default: false
        },
        selectDir: {
            default: 0,
            tooltip: "左边是0，右边是1"
        },
        openTag: {
            default: false,
            type: cc.Boolean,
            notify () {
                this._changeStatus();
            }
        },
        /**
         * !#en If Button is clicked, it will trigger event's handler
         * !#zh 按钮的点击事件列表。
         * @property {Component.EventHandler[]} clickEvents
         */
        clickEvents: {
            default: [],
            type: cc.Component.EventHandler,
        }
    },

    onLoad () {
        if (!this._sprite) {
            this._sprite = this.node.children[0].getComponent(cc.Sprite);
        }

        this._changeStatus();
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    },

    onTouchStart (evt) {
        evt.stopPropagation();
    },

    onTouchEnd (evt) {
        if (this.selectType) {
            let pos = evt.getLocation();
            pos = this._sprite.node.parent.convertToNodeSpaceAR(pos);
            let _dir = 0;
            if (pos.x < this.node.width / 2) { // 父节点和子节点X锚点必须设为0
                _dir = 0;
            } else {
                _dir = 1;
            }

            if (this.selectDir === _dir) {
                return;
            } else {
                this.selectDir = _dir;
            }
        }


        this.openTag = !this.openTag;
        this._changeStatus();
        cc.Component.EventHandler.emitEvents(this.clickEvents, this.openTag, this.node);
        evt.stopPropagation();
    },

    isOpen () {
        return this.openTag;
    },

    _changeStatus () {
        if (this.openTag) {
            this._sprite.spriteFrame = this.openSpriteFrame;
        } else {
            this._sprite.spriteFrame = this.closeSpriteFrame;
        }
    }

});