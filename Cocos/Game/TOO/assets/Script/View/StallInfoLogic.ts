import R from "../R";
import { ShareType } from "./ShareLogic";

const { ccclass, property } = cc._decorator;

/**
 * 摊主信息
 */
@ccclass
export class StallInfoLogic extends Core.ViewLogic {
    /** 摊主头像 */
    @property(cc.Sprite)
    private ownerHead: cc.Sprite = null;
    /** 摊主名称 */
    @property(cc.Label)
    private ownerName: cc.Label = null;
    /** 福气值 */
    @property(cc.Sprite)
    private value: cc.Sprite = null;
    /** 福气值label节点 */
    @property(cc.Label)
    private valueLabel: cc.Label = null;
    /** 主图集 */
    @property(cc.SpriteAtlas)
    private atlas: cc.SpriteAtlas = null;
    /** 描述 */
    @property(cc.Label)
    private ownerMsg: cc.Label = null;

    /** 数据 */
    private data: {
        /** 摊主id */
        id: string;
        /** 福气值 */
        value: number;
    };

    init(d) {
        this.data = d;
    }

    coreOnLoad() {
        this.value.fillRange = this.data.value / 100;
        this.valueLabel.string = this.data.value + "%";

        let res, name, description;
        switch (this.data.id) {
            case "sk001":
                res = "baiditan_09";
                name = "咏昊";
                description = "网络老鸟，彪悍独立，幽默风趣，麾下粉丝无数";
                break;
            case "sk002":
                res = "baiditan_08";
                name = "有智";
                description = "电商达人，真性情，接地气，观众缘无敌。";
                break;
            case "sk003":
                res = "baiditan_05";
                name = "嘉齐";
                description = "美妆一哥，外形俊朗，特有的招牌式推销口头禅誉满全球。";
                break;
            case "sk004":
                res = "baiditan_05";
                name = "威雅";
                description = "带货女神，上至豪宅火箭，下至水果零食，没有她卖不出去的货";
                break;
            default:
                res = "baiditan_10";
                name = "至尊摊主";
                description = "摆摊之神、财运之神。只要有了他，财源滚滚来，生意年年旺！";
                break;
        }
        this.ownerName.string = name;
        this.ownerHead.spriteFrame = this.atlas.getSpriteFrame(res);
        this.ownerMsg.string = description;
    }

    /**
     * 分享事件
     */
    private shareEvent() {
        Core.viewManager.openView(R.ShareView, ShareType.INVITE);
    }
}
