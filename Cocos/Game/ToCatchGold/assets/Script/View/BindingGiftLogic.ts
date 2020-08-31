import R from "../R";
import ViewAnimation from "../component/ViewAnimation";
import { PromptService } from "../Game/service/PromptService";
import { GameCore } from "../Game/GameCore";
import { MenuButtonId } from "../Game/service/EventMapService";
import { UserInfoService, UserType } from "../Game/service/UserInfoService";
import { CodeMap } from "../Game/Map/CodeMap";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BindingGiftLogic extends Core.ViewLogic {
    /** 绑定数据 */
    private bindData: xxgBuf.IRedBagConfigRet = null;

    /** 绑定数据 */
    private canSend: boolean = true;

    /** 视图类型 */
    public style: number = Core.EViewStyle.NO_FULL;

    /** 手机号输入框 */
    @property(cc.EditBox)
    public phoneNumEditBox: cc.EditBox = null;

    /** 红包文字Box */
    @property(cc.Layout)
    public redLBox: cc.Layout = null;

    /** 红包文字 */
    @property(cc.Label)
    public redL: cc.Label = null;

    /** 验证码输入框 */
    @property(cc.EditBox)
    public VCEditBox: cc.EditBox = null;

    /** 发送按钮文字 */
    @property(cc.RichText)
    public getVCBtnL: cc.RichText = null;

    /** 发送按钮Sprite */
    @property(cc.Sprite)
    public getVCBtnSp: cc.Sprite = null;

    /** 材质 */
    @property([cc.Material])
    public materialList: cc.Material[] = [];

    /** 计时器 */
    @Core.module(Core.Timer)
    public timer: Core.Timer = null;

    public init(data: xxgBuf.IRedBagConfigRet) {
        this.bindData = data;
    }

    protected coreOnLoad() {
        this.redL.string = `${this.bindData.balance / 100}`;
        this.redLBox.updateLayout();
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
     * 绑定按钮回调
     * @param event
     * @param customerData
     */
    private async bindBtnCallback(event: cc.Event, customerData: string) {
        if (this.phoneNumEditBox.string.length < 11) {
            PromptService.prompt("请输入正确的手机号码");
            return;
        }

        if (this.VCEditBox.string.length < 6) {
            PromptService.prompt("请输入正确的验证码");
            return;
        }

        let rewardData = await Core.webSockets.send<xxgBuf.IBindingTelRet>(
            "BindingTelReq",
            new xxgBuf.BindingTelReq({
                tel: this.phoneNumEditBox.string,
                code: this.VCEditBox.string,
            })
        );
        if (rewardData) {
            await this.closeBtnCallback();
            UserInfoService.tel = this.phoneNumEditBox.string;
            UserInfoService.tel = rewardData.showMobile;
            // UserInfoService.tel.slice(0, 2) + "******" + UserInfoService.tel.slice(UserInfoService.tel.length - 3);
            UserInfoService.nickname = rewardData.nickName;
            UserInfoService.redBag = rewardData.totalBalance / 100;
            GameCore.setMenuButtonShow(MenuButtonId.BIND_REWARD, false);
            Core.viewManager.openView(R.BindSuccessView, rewardData.balance);
        }
    }

    /**
     * 获取验证码按钮回调
     * @param event
     * @param customerData
     */
    private async getVCBtnCallback(event: cc.Event, customerData: string) {
        if (this.phoneNumEditBox.string.length < 11) {
            PromptService.prompt("请输入正确的手机号码");
            return;
        }

        if (this.canSend) {
            let successData = await Core.webSockets.send<xxgBuf.ISendCodeRet>(
                "SendCodeReq",
                new xxgBuf.SendCodeReq({
                    tel: this.phoneNumEditBox.string,
                })
            );
            if (successData) {
                PromptService.prompt("已发送验证码，请注意查收获取");
                let time = 60;
                this.getVCBtnL.string = `<outline size=2 color=#C4C3BD><color=#EFE6E6>${time}s<color></outline>`;
                this.canSend = false;
                this.getVCBtnSp.setMaterial(0, this.materialList[1]);
                let timeId = this.timer.setInterval(() => {
                    time = time - 1;
                    this.getVCBtnL.string = `<outline size=2 color=#C4C3BD><color=#EFE6E6>${time}s<color></outline>`;
                    if (time <= 0) {
                        this.timer.clearInterval(timeId);
                        this.canSend = true;
                        this.getVCBtnL.string = "<outline size=2 color=#FF7F3B>获取验证码</outline>";
                        this.getVCBtnSp.setMaterial(0, this.materialList[0]);
                    }
                }, 1000);
            }
        } else {
            PromptService.prompt("请稍后重新获取");
        }
    }

    /**
     * 错误处理
     */
    @Core.code(
        CodeMap.BINDING_TEL_IS_NULL,
        CodeMap.BINDING_TEL_IS_ERROR,
        CodeMap.BINDING_TEL_IS_BINGING,
        CodeMap.BINDING_TEL_OVER_MAX,
        CodeMap.BINDING_TEL_CODE_EXPIRED,
        CodeMap.BINDING_TEL_CODE_ERROR,
        CodeMap.BINDING_TEL_SEND_FAIL,
        CodeMap.BINDING_TEL_PHONE_ERROR
    )
    private errorHandle(code: CodeMap) {
        let str = "";
        switch (code) {
            case CodeMap.BINDING_TEL_IS_NULL:
                str = "请输入手机号!";
                break;
            case CodeMap.BINDING_TEL_IS_ERROR:
                str = "手机号码有误，请确认后重试!";
                break;
            case CodeMap.BINDING_TEL_IS_BINGING:
                str = "手机号已被他人绑定，请确认后重试";
                break;
            case CodeMap.BINDING_TEL_OVER_MAX:
                str = "今日验证码发送次数已达上限，请明日再试";
                break;
            case CodeMap.BINDING_TEL_CODE_EXPIRED:
                str = "验证码已过期，请重新接收验证码";
                break;
            case CodeMap.BINDING_TEL_CODE_ERROR:
                str = "验证码有误，请确认后重试";
                break;
            case CodeMap.BINDING_TEL_SEND_FAIL:
                str = "未成功发送验证码，请稍后重试";
                break;
            case CodeMap.BINDING_TEL_PHONE_ERROR:
                str = "手机号码有误，请确认后重试";
                break;
            default:
                break;
        }
        PromptService.prompt(str + `(${code})`);
    }
}
