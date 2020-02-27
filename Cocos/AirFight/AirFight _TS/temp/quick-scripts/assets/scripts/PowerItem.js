(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/PowerItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '146cbDwP91DNqdcx/0xM8YE', 'PowerItem', __filename);
// scripts/PowerItem.ts

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
var PowerItem = /** @class */ (function (_super) {
    __extends(PowerItem, _super);
    function PowerItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 100;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    PowerItem.prototype.start = function () {
        this.emitter();
    };
    // update (dt) {}
    // emitter: function () {
    //     //var bezier1 = [cc.v2(0, 500), cc.v2(-500, 250), cc.v2(500,-250)];
    //     //var bezier2 = [cc.v2(0, 0), cc.v2(500, -250), cc.v2(0, -600)];
    //     var powerItem = this.node;
    //     powerItem.position = this.node.position;
    //     let moveBy1 = cc.bezierTo(10, bezier1);
    //     //let moveBy2 = cc.bezierTo(10, bezier2);
    //     let reMoveSelf = cc.removeSelf();
    //     let sequence = cc.sequence(moveBy1, reMoveSelf);
    //     powerItem.runAction(sequence);
    // }
    PowerItem.prototype.emitter = function () {
        var lifeItem = this.node;
        lifeItem.position = this.node.position;
        lifeItem.y = this.node.y;
        lifeItem.parent = this.node.parent;
        var distance = (cc.winSize.height + this.node.y);
        var duration = distance / this.speed;
        var moveBy = cc.moveBy(duration, cc.v2(0, -distance));
        var reMoveSelf = cc.removeSelf();
        var sequence = cc.sequence(moveBy, reMoveSelf);
        lifeItem.runAction(sequence);
    };
    __decorate([
        property()
    ], PowerItem.prototype, "speed", void 0);
    PowerItem = __decorate([
        ccclass
    ], PowerItem);
    return PowerItem;
}(cc.Component));
exports.default = PowerItem;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=PowerItem.js.map
        