import { RedPointService } from "../service/RedPointService";

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
}
