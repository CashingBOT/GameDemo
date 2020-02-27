"use strict";
cc._RF.push(module, '12b7eAhCVhFfoCzDvzWM79Z', 'BackGround');
// scripts/BackGround.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        far_bg: [cc.Node], //用于管理背景图片结点的数组,记得回cocos面板中添加数组的结点数量
        bg_speed: 1 //移动时控制速度的变量
    },

    update: function update(dt) {
        this.bgMove(this.far_bg, this.bg_speed);
    },
    onLoad: function onLoad() {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
    },


    bgMove: function bgMove(bgList, speed) {
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
    }
});

cc._RF.pop();