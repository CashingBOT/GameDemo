import ViewAnimation from "../component/ViewAnimation";
import R from "../R";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PrivacyLogic extends Core.ViewLogic {
    public style: number = Core.EViewStyle.NO_FULL;

    @property([cc.Sprite])
    private spList: cc.Sprite[] = [];

    @Core.module(Core.Res)
    res: Core.Res = null;

    /**
     * core
     */
    public async coreOnLoad() {
        for (let index = 0; index < this.spList.length; index++) {
            const sprite = this.spList[index];
            let indexStr = (Array(2).join("0") + (index + 1)).slice(-2);
            let sf = (await this.res.getRes<cc.SpriteFrame>(R["Texture_sz20_" + indexStr])).obj;
            sprite.spriteFrame = sf;
        }
    }

    public async closeBtnCallback() {
        await this.getComponent(ViewAnimation).closeViewAnimation();
        this.coreCloseView();
    }
}
