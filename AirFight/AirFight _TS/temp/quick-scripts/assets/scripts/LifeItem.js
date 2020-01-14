(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/LifeItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '23d85TvSAZMPZtIF6rU5n/0', 'LifeItem', __filename);
// scripts/LifeItem.ts

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
var LifeItem = /** @class */ (function (_super) {
    __extends(LifeItem, _super);
    function LifeItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 100;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    LifeItem.prototype.start = function () {
        this.emitter();
    };
    // update (dt) {}
    LifeItem.prototype.emitter = function () {
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
    ], LifeItem.prototype, "speed", void 0);
    LifeItem = __decorate([
        ccclass
    ], LifeItem);
    return LifeItem;
}(cc.Component));
exports.default = LifeItem;

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
        //# sourceMappingURL=LifeItem.js.map
        