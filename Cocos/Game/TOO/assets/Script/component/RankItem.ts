import R from "../R";
import { INVITATION_EVENT, RewardType } from "../Game/service/EventMapService";
import { RewardObject, RewardViewType } from "../View/RewardLogic";
import { GameCore } from "../Game/GameCore";
import { UserInfoService } from "../Game/service/UserInfoService";
import { ShareType } from "../View/ShareLogic";
import { CodeMap } from "../Game/Map/CodeMap";
import { PromptService } from "../Game/service/PromptService";
import { Utils } from "../Game/game-lib/Utils";

const { ccclass, property } = cc._decorator;

const StallLevel = ["普通摊主", "明星摊主", "至尊摊主"];

/**
 * 摊位组件逻辑
 */
@ccclass
export default class RankItem extends Core.ComponentLogic {
    /** 任玩家据 */
    public rankData: xxgBuf.IUserRanking = null;

    /** 玩家头像 */
    @property(cc.Sprite)
    private headSp: cc.Sprite = null;

    /** 玩家名次 */
    @property(cc.Label)
    private rankingL: cc.Label = null;

    /** 玩家名字 */
    @property(cc.Label)
    private nameL: cc.Label = null;

    /** 玩家等级 */
    @property(cc.Label)
    private levelL: cc.Label = null;

    /** 至尊摊主数量 */
    @property(cc.Label)
    private stallNumL: cc.Label = null;

    @Core.module(Core.Res)
    private res: Core.Res = null;

    /**
     * 设置数据
     */
    public async setData(data: xxgBuf.IUserRanking) {
        this.rankData = data;
        this.levelL.string = "" + this.rankData.level;
        this.nameL.string = Utils.omitStr(this.rankData.nickname, 8);
        this.stallNumL.string = `${StallLevel[this.rankData.stallOwner - 1]}`;
        if (this.rankingL) {
            this.rankingL.string = this.rankData.ranking > 100 ? "100+" : `${this.rankData.ranking}`;
        }

        if (this.rankData.headPortrait && this.rankData.headPortrait.indexOf("http") !== -1) {
            if (this.rankData.headPortrait.indexOf("jpg") === -1) {
                this.rankData.headPortrait += "?.jpg";
            }
            this.res.loadExternal(this.rankData.headPortrait).then((texture: cc.Texture2D) => {
                if (this.rankData.headPortrait == texture.nativeUrl) {
                    this.headSp.spriteFrame = new cc.SpriteFrame(texture);
                }
            });
        } else {
            this.res.getRes<cc.SpriteAtlas>(R.Atlas_mainUIAtlas).then((plist) => {
                if (!this.rankData.headPortrait || this.rankData.headPortrait.indexOf("http") == -1) {
                    this.headSp.spriteFrame = plist.obj.getSpriteFrame("zjm28");
                }
            });
        }
    }
}
