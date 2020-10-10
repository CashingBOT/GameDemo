import { PopupType } from "../../View/SysPopupLogic";
import { GameCore } from "../GameCore";
import { RedPointService } from "../service/RedPointService";
import { UserInfoService } from "../service/UserInfoService";

/**
 * 协议服务处理器
 */
export class ProtocolControl extends Core.BaseLogic {
    /**
     * 红点消息接收
     */
    @Core.netPush("UnReadPush")
    private point(d: xxgBuf.UnReadPush) {
        RedPointService.setData(d);
    }

    /**
     * 至尊体验
     */
    @Core.netPush("ExperienceDividendsPush")
    private experienceDividends(d: xxgBuf.ExperienceDividendsPush) {
        if (d.type === 1) {
            //分红
            UserInfoService.dividendsHeart = d.value;
        } else {
            //体验时间
            UserInfoService.experienceTime = Date.now() + d.value * 1000;
            UserInfoService.supremeHeartDividends = d.dividends * 100;
        }
    }
}
