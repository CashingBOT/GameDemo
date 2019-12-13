(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/EnemyBulletsEmitter.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '26542WYnCtK7KOhfFlCVIJH', 'EnemyBulletsEmitter', __filename);
// scripts/EnemyBulletsEmitter.ts

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
var EnemyBulletsEmitter = /** @class */ (function (_super) {
    __extends(EnemyBulletsEmitter, _super);
    function EnemyBulletsEmitter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefab = null;
        _this.speed = 1000;
        _this.rate = 1;
        _this.offset = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    EnemyBulletsEmitter.prototype.onLoad = function () {
        this.schedule(this.emitter, this.rate);
    };
    //start() {}
    // update(dt){}
    EnemyBulletsEmitter.prototype.emitter = function () {
        var bullet = cc.instantiate(this.prefab);
        bullet.position = this.node.position;
        bullet.y = this.node.y - 20;
        bullet.x = this.node.x + 1;
        bullet.x += this.offset;
        bullet.parent = this.node.parent;
        var distance = (cc.winSize.height + this.node.y);
        var duration = distance / this.speed;
        var moveBy = cc.moveBy(duration, cc.v2(0, -distance));
        var reMoveSelf = cc.removeSelf();
        var sequence = cc.sequence(moveBy, reMoveSelf);
        bullet.runAction(sequence);
    };
    __decorate([
        property(cc.Prefab)
    ], EnemyBulletsEmitter.prototype, "prefab", void 0);
    __decorate([
        property()
    ], EnemyBulletsEmitter.prototype, "speed", void 0);
    __decorate([
        property()
    ], EnemyBulletsEmitter.prototype, "rate", void 0);
    __decorate([
        property()
    ], EnemyBulletsEmitter.prototype, "offset", void 0);
    EnemyBulletsEmitter = __decorate([
        ccclass
    ], EnemyBulletsEmitter);
    return EnemyBulletsEmitter;
}(cc.Component));
exports.default = EnemyBulletsEmitter;

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
        //# sourceMappingURL=EnemyBulletsEmitter.js.map
        