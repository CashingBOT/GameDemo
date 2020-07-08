"use strict";
cc._RF.push(module, '7a193HEW7BJoL2IHstdV04g', 'Spawn');
// scripts/Spawn.js

'use strict';

// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
cc.Class({
    extends: cc.Component,

    properties: {
        enemy1: {
            default: null,
            type: cc.Prefab
        },

        enemy2: {
            default: null,
            type: cc.Prefab
        },

        enemy3: {
            default: null,
            type: cc.Prefab
        },

        lifeItem: {
            default: null,
            type: cc.Prefab
        },

        powerItem: {
            default: null,
            type: cc.Prefab
        },

        bombItem: {
            default: null,
            type: cc.Prefab
        },

        player: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:
    ctor: function ctor() {
        this.enemyList = [];
    },
    onLoad: function onLoad() {
        var initCount = 10;
        this.enemy1Pool = new cc.NodePool('Enemy1');
        for (var i = 0; i < initCount; ++i) {
            var enemy1 = cc.instantiate(this.enemy1);
            this.enemy1Pool.put(enemy1);
        }
        this.enemy2Pool = new cc.NodePool('Enemy2');
        for (var _i = 0; _i < initCount; ++_i) {
            var enemy2 = cc.instantiate(this.enemy2);
            this.enemy2Pool.put(enemy2);
        }
        this.enemy3Pool = new cc.NodePool('Enemy3');
        for (var _i2 = 0; _i2 < initCount; ++_i2) {
            var enemy3 = cc.instantiate(this.enemy3);
            this.enemy3Pool.put(enemy3);
        }
        this.node.on('enemyDestory', this.deletEnemyFromArr, this);
    },
    onDestroy: function onDestroy() {
        this.node.off('enemyDestory', this.deletEnemyFromArr, this);
    },
    deletEnemyFromArr: function deletEnemyFromArr(event) {

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
        // }
    },
    boom: function boom() {

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
    },
    gameInit: function gameInit() {
        var _this = this;

        if (!this.isStart) {
            return;
        };
        this.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
            _this.spawnNewEnemy1();
        }), cc.delayTime(3.5))));

        this.node.runAction(cc.repeatForever(cc.sequence(cc.callFunc(function () {
            _this.spawnNewEnemy1();
        }), cc.delayTime(4))));

        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(20), cc.callFunc(function () {
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

        this.node.runAction(cc.repeatForever(cc.sequence(cc.delayTime(40), cc.callFunc(function () {
            _this.spawnNewBombItem();
        }))));
    },


    // start () {},

    update: function update(dt) {},
    gameStart: function gameStart() {
        this.isStart = true;
        this.gameInit();
    },
    addEnemyToArr: function addEnemyToArr(enemyScript, str, node) {

        this.enemyList.push(enemyScript);
    },
    spawnNewEnemy1: function spawnNewEnemy1() {
        var newEnemy1 = null;
        if (this.enemy1Pool.size() > 0) {
            newEnemy1 = this.enemy1Pool.get();
        } else {
            newEnemy1 = cc.instantiate(this.enemy1);
        }
        this.node.addChild(newEnemy1);
        newEnemy1.setPosition(this.getNewEnemy1Position());
        newEnemy1.getComponent('Enemy1').emitter();
        this.addEnemyToArr(newEnemy1.getComponent('Enemy1'));
    },
    getNewEnemy2Position: function getNewEnemy2Position() {
        var randX = 0;
        var maxX = this.node.width / 2.5;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, cc.winSize.height);
    },
    spawnNewEnemy2: function spawnNewEnemy2() {
        var newEnemy2 = null;
        if (this.enemy2Pool.size() > 0) {
            newEnemy2 = this.enemy2Pool.get();
        } else {
            newEnemy2 = cc.instantiate(this.enemy2);
        }
        this.node.addChild(newEnemy2);
        newEnemy2.setPosition(this.getNewEnemy2Position());
        newEnemy2.getComponent('Enemy2').emitter();
        this.addEnemyToArr(newEnemy2.getComponent('Enemy2'));
    },
    getNewEnemy1Position: function getNewEnemy1Position() {
        var randX = 0;
        var maxX = this.node.width / 2.5;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, cc.winSize.height);
    },
    spawnNewEnemy3: function spawnNewEnemy3() {
        var newEnemy3 = null;
        if (this.enemy3Pool.size() > 0) {
            newEnemy3 = this.enemy3Pool.get();
        } else {
            newEnemy3 = cc.instantiate(this.enemy3);
        }
        this.node.addChild(newEnemy3);
        newEnemy3.setPosition(this.getNewEnemy3Position());
        newEnemy3.getComponent('Enemy3').emitter();
        this.addEnemyToArr(newEnemy3.getComponent('Enemy3'));
    },
    getNewEnemy3Position: function getNewEnemy3Position() {
        var randX = 0;
        var maxX = this.node.width / 2.5;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, cc.winSize.height);
    },
    spawnNewLifeItem: function spawnNewLifeItem() {
        var newLifeItem = cc.instantiate(this.lifeItem);
        this.node.addChild(newLifeItem);
        newLifeItem.setPosition(this.getNewLifeItemPosition());
    },
    getNewPowerItemPosition: function getNewPowerItemPosition() {
        var randX = 0;
        var maxX = this.node.width / 2.5;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, cc.winSize.height);
    },
    spawnNewPowerItem: function spawnNewPowerItem() {
        var newPowerItem = cc.instantiate(this.powerItem);
        this.node.addChild(newPowerItem);
        newPowerItem.setPosition(this.getNewPowerItemPosition());
    },
    getNewLifeItemPosition: function getNewLifeItemPosition() {
        var randX = 0;
        var maxX = this.node.width / 2.5;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, cc.winSize.height);
    },
    spawnNewBombItem: function spawnNewBombItem() {
        var newBombItem = cc.instantiate(this.bombItem);
        this.node.addChild(newBombItem);
        newBombItem.setPosition(this.getNewBombItemPosition());
    },
    getNewBombItemPosition: function getNewBombItemPosition() {
        var randX = 0;
        var maxX = this.node.width / 2.5;
        randX = (Math.random() - 0.5) * 2 * maxX;
        return cc.v2(randX, cc.winSize.height);
    },


    onCollisionStay: function onCollisionStay(other, self) {
        this.life--;
        if (other.node.name == "PlayerBullets") {
            other.node.Destroy();
        }
    }
});

cc._RF.pop();