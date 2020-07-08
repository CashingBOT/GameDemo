"use strict";
cc._RF.push(module, 'e8b7erzmEtIDr3kIq5mN9PO', 'BackGround');
// scripts/BackGround.ts

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Background = /** @class */ (function (_super) {
    __extends(Background, _super);
    function Background() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.far_bg = []; //用于管理背景图片结点的数组,记得回cocos面板中添加数组的结点数量
        _this.bg_speed = 1; //移动时控制速度的变量
        return _this;
    }
    Background.prototype.update = function (dt) {
        this.bgMove(this.far_bg, this.bg_speed);
    };
    Background.prototype.onLoad = function () {
        //碰撞开启
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
    };
    Background.prototype.bgMove = function (bgList, speed) {
        //每次循环三张图片一起滚动
        for (var index = 0; index < bgList.length; index++) {
            bgList[index].y -= speed;
        }
        if (bgList[0].y <= -1500) {
            bgList[0].y = 1499; //离开场景后将此背景图的y重新赋值，位于场景的上方
        }
        if (bgList[1].y <= -1500) {
            bgList[1].y = 1499;
        }
        if (bgList[2].y <= -1500) {
            bgList[2].y = 1499;
        }
    };
    __decorate([
        property([cc.Node])
    ], Background.prototype, "far_bg", void 0);
    __decorate([
        property
    ], Background.prototype, "bg_speed", void 0);
    Background = __decorate([
        ccclass
    ], Background);
    return Background;
}(cc.Component));
exports.default = Background;

cc._RF.pop();