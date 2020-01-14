(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Spawn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cf5ecmLMNJGIJ4AEOy+0Anf', 'Spawn', __filename);
// scripts/Spawn.ts

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
var Spawn = /** @class */ (function (_super) {
    __extends(Spawn, _super);
    function Spawn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.enemy1 = null;
        _this.enemy2 = null;
        _this.enemy3 = null;
        _this.lifeItem = null;
        _this.powerItem = null;
        _this.bombItem = null;
        _this.player = null;
        // LIFE-CYCLE CALLBACKS:
        _this.enemyList = [];
        _this.isStart = false;
        _this.enemy1Pool = new cc.NodePool('Enemy1');
        _this.enemy2Pool = new cc.NodePool('Enemy2');
        _this.enemy3Pool = new cc.NodePool('Enemy3');
        return _this;
    }
    Spawn.prototype.onLoad = function () {
        var initCount = 10;
        var enemy1Pool = new cc.NodePool('Enemy1');
        for (var i = 0; i < initCount; ++i) {
            var enemy1 = cc.instantiate(this.enemy1);
            enemy1Pool.put(enemy1);
        }
        var enemy2Pool = new cc.NodePool('Enemy2');
        for (var i = 0; i < initCount; ++i) {
            var enemy2 = cc.instantiate(this.enemy2);
            enemy2Pool.put(enemy2);
        }
        var enemy3Pool = new cc.NodePool('Enemy3');
        for (var i = 0; i < initCount; ++i) {
            var enemy3 = cc.instantiate(this.enemy3);
            enemy3Pool.put(enemy3);
        }
        this.node.on('enemyDestory', this.deletEnemyFromArr, this);
    };
    Spawn.prototype.onDestroy = function () {
        this.node.off('enemyDestory', this.deletEnemyFromArr, this);
    };
    Spawn.prototype.deletEnemyFromArr = function (event) {
        for (var index = this.enemyList.length - 1; index >= 0; index--) {
            var element = this.enemyList[index];
            if (element == event.getUserData()) {
                this.enemyList.splice(index, 1);
                break;
            }
        }
        var script = event.getUserData();
        if (script.type == 1) {
            this.enemy1Pool.put(script.node);
        }
        if (script.type == 2) {
            this.enemy2Pool.put(script.node);
        }
        if (script.type == 3) {
            this.enemy3Pool.put(script.node);
        }
    };
    Spawn.prototype.boom = function () {
        for (var index = 0; index < this.enemyList.length; index++) {
            var element = this.enemyList[index];
            if (element) {
                element.dead();
                // if (element.type == 1) {
                //     this.enemy1Pool.put(element.node);
                // }
                // if (element.type == 2) {
                //     this.enemy2Pool.put(element.node);
                // }
                // if (element.type == 3) {
                //     this.enemy2Pool.put(element.node);
                // }
            }
        }
        this.enemyList = [];
        this.node.getChildByName('Bomb').active = false;
    };
    Spawn.prototype.gameInit = function () {
        var _this = this;
        if (!this.isStart) {
            return;
        }
        ;
        this.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
            _this.spawnNewEnemy1();
        }), cc.delayTime(3.5))));
        this.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
            _this.spawnNewEnemy1();
        }), cc.delayTime(4.5))));
        this.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
            _this.spawnNewEnemy1();
        }), cc.delayTime(4.5))));
        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(45), cc.callFunc(function () {
            _this.spawnNewEnemy2();
        }))));
        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(10), cc.callFunc(function () {
            _this.spawnNewEnemy3();
        }))));
        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(30), cc.callFunc(function () {
            _this.spawnNewLifeItem();
        }))));
        this.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
            _this.spawnNewPowerItem();
        }), cc.delayTime(40))));
        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(60), cc.callFunc(function () {
            _this.spawnNewBombItem();
        }))));
    };
    // start () {}
    Spawn.prototype.update = function (dt) {
    };
    Spawn.prototype.gameStart = function () {
        this.isStart = true;
        this.gameInit();
    };
    Spawn.prototype.stopped = function () {
        this.isStart = false;
        this.gameInit();
    };
    Spawn.prototype.addEnemyToArr = function (enemyScript, str, node) {
        this.enemyList.push(enemyScript);
    };
    Spawn.prototype.spawnNewEnemy1 = function () {
        var newEnemy1 = null;
        if (this.enemy1Pool.size() > 0) {
            newEnemy1 = this.enemy1Pool.get();
        }
        else {
            newEnemy1 = cc.instantiate(this.enemy1);
        }
        this.node.addChild(newEnemy1);
        newEnemy1.setPosition(this.getNewEnemy1Position());
        newEnemy1.getComponent('Enemy1').emitter();
        this.addEnemyToArr(newEnemy1.getComponent('Enemy1'));
    };
    Spawn.prototype.getNewEnemy2Position = function () {
        var randX = 0;
        var maxX = this.node.width / 2.5;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(0, cc.winSize.height);
    };
    Spawn.prototype.spawnNewEnemy2 = function () {
        var newEnemy2 = null;
        if (this.enemy2Pool.size() > 0) {
            newEnemy2 = this.enemy2Pool.get();
        }
        else {
            newEnemy2 = cc.instantiate(this.enemy2);
        }
        this.node.addChild(newEnemy2);
        newEnemy2.setPosition(this.getNewEnemy2Position());
        newEnemy2.getComponent('Enemy2').emitter();
        this.addEnemyToArr(newEnemy2.getComponent('Enemy2'));
    };
    Spawn.prototype.getNewEnemy1Position = function () {
        var randX = 0;
        var maxX = this.node.width / 2.5;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, cc.winSize.height);
    };
    Spawn.prototype.spawnNewEnemy3 = function () {
        var newEnemy3 = null;
        if (this.enemy3Pool.size() > 0) {
            newEnemy3 = this.enemy3Pool.get();
        }
        else {
            newEnemy3 = cc.instantiate(this.enemy3);
        }
        this.node.addChild(newEnemy3);
        newEnemy3.setPosition(this.getNewEnemy3Position());
        newEnemy3.getComponent('Enemy3').emitter();
        this.addEnemyToArr(newEnemy3.getComponent('Enemy3'));
    };
    Spawn.prototype.getNewEnemy3Position = function () {
        var randX = 0;
        var maxX = this.node.width / 2.5;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, cc.winSize.height);
    };
    Spawn.prototype.spawnNewLifeItem = function () {
        var newLifeItem = cc.instantiate(this.lifeItem);
        this.node.addChild(newLifeItem);
        newLifeItem.setPosition(this.getNewLifeItemPosition());
    };
    Spawn.prototype.getNewPowerItemPosition = function () {
        var randX = 0;
        var maxX = this.node.width / 2.5;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, cc.winSize.height);
    };
    Spawn.prototype.spawnNewPowerItem = function () {
        var newPowerItem = cc.instantiate(this.powerItem);
        this.node.addChild(newPowerItem);
        newPowerItem.setPosition(this.getNewPowerItemPosition());
    };
    Spawn.prototype.getNewLifeItemPosition = function () {
        var randX = 0;
        var maxX = this.node.width / 2.5;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, cc.winSize.height);
    };
    Spawn.prototype.spawnNewBombItem = function () {
        var newBombItem = cc.instantiate(this.bombItem);
        this.node.addChild(newBombItem);
        newBombItem.setPosition(this.getNewBombItemPosition());
    };
    Spawn.prototype.getNewBombItemPosition = function () {
        var randX = 0;
        var maxX = this.node.width / 2.5;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, cc.winSize.height);
    };
    Spawn.prototype.onCollisionStay = function (other, self) {
        self.life--;
        if (other.node.name == "PlayerBullets") {
            other.node.Destroy();
        }
    };
    __decorate([
        property(cc.Prefab)
    ], Spawn.prototype, "enemy1", void 0);
    __decorate([
        property(cc.Prefab)
    ], Spawn.prototype, "enemy2", void 0);
    __decorate([
        property(cc.Prefab)
    ], Spawn.prototype, "enemy3", void 0);
    __decorate([
        property(cc.Prefab)
    ], Spawn.prototype, "lifeItem", void 0);
    __decorate([
        property(cc.Prefab)
    ], Spawn.prototype, "powerItem", void 0);
    __decorate([
        property(cc.Prefab)
    ], Spawn.prototype, "bombItem", void 0);
    __decorate([
        property(cc.Node)
    ], Spawn.prototype, "player", void 0);
    Spawn = __decorate([
        ccclass
    ], Spawn);
    return Spawn;
}(cc.Component));
exports.default = Spawn;

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
        //# sourceMappingURL=Spawn.js.map
        