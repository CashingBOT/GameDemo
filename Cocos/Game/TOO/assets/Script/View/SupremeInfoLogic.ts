import ViewAnimation from "../component/ViewAnimation";
import { MapGlobalEvent } from "../Game/service/EventMapService";
import { UserInfoService } from "../Game/service/UserInfoService";

const { ccclass, property } = cc._decorator;

/**
 * 至尊摊主
 */
@ccclass
export default class SupremeInfoLogic extends Core.ViewLogic {
    /** 云朵 */
    @property(cc.Node)
    private cloud: cc.Node = null;
    /** 至尊容器 */
    @property(cc.Node)
    private ownerBox: cc.Node = null;
    /** 体验按钮 */
    @property(cc.Button)
    private confirmButton: cc.Button = null;
    /** 至尊摊主描述 */
    @property(cc.Label)
    private msg: cc.Label = null;

    private call: Function;

    coreStart() {
        this.msg.string = `${UserInfoService.experience}级开启体验，获得2~5分钟分红`;
    }

    init(call) {
        this.call = call;
    }

    /** 立即体验 */
    private async confirmEvent() {
        let d = await Core.webSockets.send<xxgBuf.SupremeVendorExperienceRet>(
            "SupremeVendorExperienceReq",
            xxgBuf.SupremeVendorExperienceReq
        );

        if (d) {
            UserInfoService.experienceTime = Date.now() + d.experienceTime * 1000;
            if (this.call) this.call();
            this.confirmButton.interactable = false;
            cc.tween(this.cloud)
                .to(0.4, { x: 0 })
                .call(() => {
                    this.ownerBox.active = false;
                    this.scheduleOnce(() => {
                        this.getComponent(ViewAnimation)
                            .closeViewAnimation()
                            .then(() => {
                                Core.eventManager.event(MapGlobalEvent.addSupreme, UserInfoService.level);
                            });
                    }, 0.15);
                    this.cloud.getChildByName("sp").active = true;
                    cc.tween(this.cloud).to(0.4, { x: -520 }).start();
                })
                .start();
        }
    }

    coreOnDestroy() {}
}
