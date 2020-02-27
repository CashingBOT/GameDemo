"use strict";
cc._RF.push(module, '1a42akYZ7VBNq+E+OHNpTHO', 'Game');
// scripts/Game.ts

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
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.player = null;
        _this.background = null;
        _this.scoreDisplay = null;
        _this.life = null;
        _this.started = false;
        _this.isDead = false;
        _this.isPaused = false;
        _this.score = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Game.prototype.onLoad = function () {
        this.node.getChildByName('Pause').active = false;
        this.node.getChildByName('TopScores').active = false;
        this.node.getChildByName('Life').active = false;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    };
    Game.prototype.onDestroy = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    };
    Game.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.node.getChildByName('Start').color = cc.color().fromHEX('#D6D6D6');
                this.node.getChildByName('Pause').color = cc.color().fromHEX('#D6D6D6');
                if (!this.isDead) {
                    if (!this.started) {
                        this.gameStart();
                        this.started = true;
                    }
                    else {
                        if (this.isPaused) {
                            this.gameResume();
                            this.node.getChildByName('Instruction').active = false;
                            this.isPaused = false;
                        }
                        else {
                            this.gamePause();
                        }
                    }
                }
                else {
                    this.gameRestart();
                }
                break;
        }
    };
    Game.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.node.getChildByName('Start').color = cc.color().fromHEX('#FFFFFF');
                if (!this.isDead) {
                    if (this.started) {
                        this.node.getChildByName('Pause').color = cc.color().fromHEX('#FFFFFF');
                        if (this.isPaused) {
                            this.node.getChildByName('PauseFont').active = false;
                        }
                        else {
                            this.node.getChildByName('PauseFont').active = true;
                            this.node.getChildByName('Instruction').active = true;
                        }
                    }
                }
                this.node.getChildByName('Back').color = cc.color().fromHEX('#FFFFFF');
                break;
        }
    };
    // start() {}
    Game.prototype.gameStart = function () {
        this.started = false;
        this.isDead = false;
        this.isPaused = false;
        this.player.getComponent("Player").gameStart();
        this.player.getComponent("Player").touchEvent();
        this.node.getComponent("Spawn").gameStart();
        this.gameInit();
        this.resetScore();
    };
    Game.prototype.gameInit = function () {
        this.node.getChildByName('Start').active = false;
        this.node.getChildByName('Tittle').active = false;
        this.node.getChildByName('Instruction').active = false;
        this.node.getChildByName('Pause').active = true;
        this.node.getChildByName('TopScores').active = true;
        this.node.getChildByName('Life').active = true;
    };
    Game.prototype.gamePause = function () {
        cc.director.pause();
        this.isPaused = true;
    };
    Game.prototype.gameResume = function () {
        cc.director.resume();
    };
    Game.prototype.gamePauesResume = function () {
        if (!this.isPaused) {
            cc.director.pause();
            this.isPaused = true;
            this.node.getChildByName('PauseFont').active = true;
            this.node.getChildByName('Instruction').active = true;
            this.player.getComponent("Player").touchOff();
        }
        else {
            cc.director.resume();
            this.isPaused = false;
            this.node.getChildByName('PauseFont').active = false;
            this.node.getChildByName('Instruction').active = false;
            this.player.getComponent("Player").touchOn();
        }
    };
    Game.prototype.gameRestart = function () {
        cc.game.restart();
    };
    Game.prototype.gainScoreEnemy1 = function () {
        this.score += 1;
        this.scoreDisplay.string = this.score.toString();
    };
    Game.prototype.gainScoreEnemy2 = function () {
        this.score += 9;
        this.scoreDisplay.string = this.score.toString();
    };
    Game.prototype.gainScoreEnemy3 = function () {
        this.score += 3;
        this.scoreDisplay.string = this.score.toString();
    };
    Game.prototype.resetScore = function () {
        this.score = 0;
        this.scoreDisplay.string = this.score.toString();
    };
    Game.prototype.gameOver = function () {
        this.isDead = true;
        this.node.stopAllActions();
        this.node.getChildByName('Pause').active = false;
        this.node.getChildByName('GameOver').active = true;
        this.node.getChildByName('Back').active = true;
    };
    Game.prototype.update = function (dt) {
        var _this = this;
        if (this.player.getComponent("Player").life <= 0) {
            this.life.getChildByName('Life1').active = false;
            this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function () { return _this.gameOver(); })));
        }
        if (this.player.getComponent("Player").life <= 2) {
            this.life.getChildByName('Life3').active = false;
        }
        if (this.player.getComponent("Player").life <= 1) {
            this.life.getChildByName('Life2').active = false;
        }
    };
    __decorate([
        property(cc.Node)
    ], Game.prototype, "player", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "background", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "scoreDisplay", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "life", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();