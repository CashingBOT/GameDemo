// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Background extends cc.Component {

    @property([cc.Node])
    far_bg: cc.Node[] = []; //用于管理背景图片结点的数组,记得回cocos面板中添加数组的结点数量

    @property
    bg_speed = 1; //移动时控制速度的变量

    update(dt) {
        this.bgMove(this.far_bg, this.bg_speed);
    }

    onLoad() {
        //碰撞开启
        var manager = cc.director.getCollisionManager();
        manager.enabled = true
        manager.enabledDebugDraw = false;
    }

    public bgMove(bgList, speed) {
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
}
