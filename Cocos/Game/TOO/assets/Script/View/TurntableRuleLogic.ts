import { UserInfoService, UserType } from "../Game/service/UserInfoService";
import { GameCore } from "../Game/GameCore";
import ViewAnimation from "../component/ViewAnimation";
import R from "../R";
import { MapLocalStorage, MapGlobalEvent, MenuButtonId, MapHttpApi } from "../Game/service/EventMapService";
import { GameService } from "../Game/service/GameService";
import { PromptService } from "../Game/service/PromptService";
import { PopupType } from "./SysPopupLogic";
import { Utils } from "../Game/game-lib/Utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TurntableRuleLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.NO_FULL;

    protected async coreOnLoad() {}

    /**
     * 收货地址按钮回调
     * @param event
     * @param customerData
     */
    public async addressBtnCallback(event: cc.Event, customerData: string) {
        let addressData = await Core.webSockets.send<xxgBuf.ReceiveRet>("ReceiveReq", new xxgBuf.ReceiveReq({}));
        if (addressData) {
            Core.viewManager.openView(R.TurntableAddressView, addressData);
        }
    }

    /**
     * 关闭按钮回调
     * @param event
     * @param customerData
     */
    public async closeBtnCallback(event?: cc.Event, customerData?: string) {
        await this.getComponent(ViewAnimation).closeViewAnimation();
        this.coreCloseView();
    }
}
