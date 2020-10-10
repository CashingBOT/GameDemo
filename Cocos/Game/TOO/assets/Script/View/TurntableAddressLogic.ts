import R from "../R";
import ViewAnimation from "../component/ViewAnimation";
import { PromptService } from "../Game/service/PromptService";
import { GameCore } from "../Game/GameCore";
import { MenuButtonId } from "../Game/service/EventMapService";
import { UserInfoService, UserType } from "../Game/service/UserInfoService";
import { CodeMap } from "../Game/Map/CodeMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TurntableAddressLogic extends Core.ViewLogic {
    /** 绑定数据 */
    private addressData: xxgBuf.IReceiveRet = null;

    /** 视图类型 */
    public style: number = Core.EViewStyle.NO_FULL;

    /** 手机号输入框 */
    @property(cc.EditBox)
    public phoneNumEditBox: cc.EditBox = null;

    /** 姓名输入框 */
    @property(cc.EditBox)
    public nameEditBox: cc.EditBox = null;

    /** 地址输入框 */
    @property(cc.EditBox)
    public addressEditBox: cc.EditBox = null;

    /** 手机号 */
    @property(cc.Label)
    public phoneNumL: cc.Label = null;

    /** 姓名 */
    @property(cc.Label)
    public nameL: cc.Label = null;

    /** 地址 */
    @property(cc.Label)
    public addressL: cc.Label = null;

    /** 编辑界面 */
    @property(cc.Node)
    public editNode: cc.Node = null;

    /** 展示界面 */
    @property(cc.Node)
    public showNode: cc.Node = null;

    public init(data: xxgBuf.IReceiveRet) {
        this.addressData = data;
    }

    protected coreOnLoad() {
        if (this.addressData.receiver) {
            this.editNode.active = false;
            this.showNode.active = true;
            this.nameL.string = this.addressData.receiver;
            this.phoneNumL.string = this.addressData.mobile;
            this.addressL.string = this.addressData.receiveAddress;
        } else {
            this.editNode.active = true;
            this.showNode.active = false;
        }
    }

    /**
     * 关闭按钮回调
     * @param event
     * @param customerData
     */
    private async closeBtnCallback(event?: cc.Event, customerData?: string) {
        await this.getComponent(ViewAnimation).closeViewAnimation();
        this.coreCloseView();
    }

    /**
     * 重置按钮回调
     * @param event
     * @param customerData
     */
    private async resetBtnCallBack(event: cc.Event, customerData: string) {
        this.showNode.active = false;
        this.editNode.active = true;

        this.nameEditBox.string = this.addressData.receiver;
        this.phoneNumEditBox.string = this.addressData.mobile;
        this.addressEditBox.string = this.addressData.receiveAddress;
        // if (this.phoneNumEditBox.string.length < 11) {
        //     PromptService.prompt("请输入正确的手机号码");
        //     return;
        // }

        // if (this.VCEditBox.string.length < 6) {
        //     PromptService.prompt("请输入正确的验证码");
        //     return;
        // }

        // let rewardData = await Core.webSockets.send<xxgBuf.IBindingTelRet>(
        //     "BindingTelReq",
        //     new xxgBuf.BindingTelReq({
        //         tel: this.phoneNumEditBox.string,
        //         code: this.VCEditBox.string,
        //     })
        // );
        // if (rewardData) {
        //     await this.closeBtnCallback();
        //     UserInfoService.tel = this.phoneNumEditBox.string;
        //     UserInfoService.tel = rewardData.showMobile;
        //     // UserInfoService.tel.slice(0, 2) + "******" + UserInfoService.tel.slice(UserInfoService.tel.length - 3);
        //     UserInfoService.nickname = rewardData.nickName;
        //     UserInfoService.redBag = rewardData.totalBalance * 100;
        //     GameCore.setMenuButtonShow(MenuButtonId.BIND_REWARD, false);
        //     Core.viewManager.openView(R.BindSuccessView, rewardData.balance);
        // }
    }

    /**
     * 确认按钮回调
     * @param event
     * @param customerData
     */
    private async confirmBtnCallback(event: cc.Event, customerData: string) {
        if (this.phoneNumEditBox.string.length < 11) {
            PromptService.prompt("请输入正确的手机号码");
            return;
        }

        if (this.nameEditBox.string.length == 0) {
            PromptService.prompt("请输入正确的姓名");
            return;
        }

        if (this.addressEditBox.string.length == 0) {
            PromptService.prompt("请输入正确的地址");
            return;
        }

        let confirmData = await Core.webSockets.send<xxgBuf.IAddAddressRet>(
            "AddAddressReq",
            new xxgBuf.AddAddressReq({
                receiver: this.nameEditBox.string,
                mobile: this.phoneNumEditBox.string,
                receiveAddress: this.addressEditBox.string,
            })
        );
        if (confirmData) {
            this.showNode.active = true;
            this.editNode.active = false;
            this.addressData.mobile = confirmData.mobile;
            this.addressData.receiver = confirmData.receiver;
            this.addressData.receiveAddress = confirmData.receiveAddress;
            this.nameL.string = this.addressData.receiver;
            this.phoneNumL.string = this.addressData.mobile;
            this.addressL.string = this.addressData.receiveAddress;
        }
    }

    /**
     * 错误处理
     */
    @Core.code(CodeMap.TURN_RECEIVE_ERROR)
    private errorHandle(code: CodeMap) {
        let str = "";
        switch (code) {
            case CodeMap.TURN_RECEIVE_ERROR:
                str = "收货地址有误，请重新输入";
                break;
            default:
                break;
        }
        PromptService.prompt(str + `(${code})`);
    }
}
