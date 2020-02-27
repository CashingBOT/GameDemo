(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/BombItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b93ffHPL0ZE1oA+CiO1hjr/', 'BombItem', __filename);
// scripts/BombItem.ts

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
var BombItem = /** @class */ (function (_super) {
    __extends(BombItem, _super);
    function BombItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.speed = 100;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    BombItem.prototype.start = function () {
        this.emitter();
    };
    // update (dt) {},
    BombItem.prototype.emitter = function () {
        var bombItem = this.node;
        bombItem.position = this.node.position;
        bombItem.y = this.node.y;
        bombItem.parent = this.node.parent;
        var distance = (cc.winSize.height + this.node.y);
        var duration = distance / this.speed;
        var moveBy = cc.moveBy(duration, cc.v2(0, -distance));
        var reMoveSelf = cc.removeSelf();
        var sequence = cc.sequence(moveBy, reMoveSelf);
        bombItem.runAction(sequence);
    };
    __decorate([
        property()
    ], BombItem.prototype, "speed", void 0);
    BombItem = __decorate([
        ccclass
    ], BombItem);
    return BombItem;
}(cc.Component));
exports.default = BombItem;

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
        //# sourceMappingURL=BombItem.js.map
        