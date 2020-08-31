import ViewAnimation from "../component/ViewAnimation";
import R from "../R";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UserProtocolLogic extends Core.ViewLogic {
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
            let sf = (await this.res.getRes<cc.SpriteFrame>(R["Texture_sz19_0" + (index + 1)])).obj;
            sprite.spriteFrame = sf;
        }
    }

    public async closeBtnCallback() {
        await this.getComponent(ViewAnimation).closeViewAnimation();
        this.coreCloseView();
    }
}
