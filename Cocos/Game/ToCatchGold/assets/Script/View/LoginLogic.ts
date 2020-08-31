import { GameCore } from "../Game/GameCore";
import { MapHttpApi, MapLocalStorage } from "../Game/service/EventMapService";
import ViewAnimation from "../component/ViewAnimation";
import { PromptService } from "../Game/service/PromptService";
import { PopupType } from "./SysPopupLogic";
import R from "../R";
import { GameService } from "../Game/service/GameService";
import { CodeMap } from "../Game/Map/CodeMap";
import { GameConfig } from "../GameConfig";

const { ccclass, property } = cc._decorator;

const enum SPRITE {
    NORMAL,
    GRAY,
    AGAIN,
}

@ccclass
export default class LoginLogic extends Core.ViewLogic {
    /******************** Scope values ********************/

    /** 手机登陆输入库 */
    @property(cc.Node)
    private inputBox: cc.Node = null;
    /** 大的QQ和微信登陆容器 */
    @property(cc.Node)
    private bigBtnBox: cc.Node = null;
    /** 微信登陆按钮 */
    @property(cc.Node)
    private webChatBtn: cc.Node = null;
    /** 手机登陆按钮 */
    @property(cc.Node)
    private phoneBtn: cc.Node = null;
    /** 手机登陆提交按钮 */
    @property(cc.Node)
    private submitBtn: cc.Node = null;
    /** 获取验证码按钮 */
    @property(cc.Node)
    private verifyBtn: cc.Node = null;
    /** 手机输入editBox */
    @property(cc.EditBox)
    private phoneEditBox: cc.EditBox = null;
    /** 验证码输入editBox */
    @property(cc.EditBox)
    private verifyEditBox: cc.EditBox = null;
    /** 验证码倒计时 */
    @property(cc.Label)
    private lbCountDown: cc.Label = null;
    /** 验证码倒计时 */
    @property(cc.Node)
    private spCountDown: cc.Node = null;
    /** 验证码精灵 */
    @property([cc.SpriteFrame])
    private verifySpriteList: cc.SpriteFrame[] = [];
    /** 登录按钮材质 */
    @property([cc.Material])
    private loginMaterialList: cc.Material[] = [];
    /** 动画组件 */
    @property(ViewAnimation)
    private ani: ViewAnimation | null = null;
    /** 定时器 */
    @Core.module(Core.Timer)
    private timer: Core.Timer = null;
    /** 游客登陆按钮 */
    @property(cc.Node)
    private visitorNode: cc.Node = null;
    // /** 回调函数 */
    // private callBack: Function | null = null;
    /** 视图类型  0：非全屏视图   1：全屏视图 */
    public style: Core.EViewStyle = 0;
    /** 手机号码 */
    private phoneNum: string = "";
    /** 验证码 */
    private captcha: string = "";

    /******************** Live callbacks ********************/

    init(call: Function) {
        // this.callBack = call;
    }

    /******************** Logics ********************/

    coreStart() {
        this.phoneBtn.active = GameCore.config.isPhoneLogin;
        this.bigBtnBox.active = GameCore.config.isWXLogin;
        this.visitorNode.active = GameCore.config.isTouristLogin;
        //送审功能
        if (GameCore.config.isReview) {
            this.node.getChildByName("bottomBox").getChildByName("line").active = false;
            this.bigBtnBox.active = false;
            this.phoneBtn.active = false;
        }
    }

    /**
     * 设置倒计时
     */
    private setCountdown(): void {
        this.verifyBtn.active = false;
        this.spCountDown.active = true;
        let counter = 60;
        let intervalId = this.timer.setInterval(() => {
            this.lbCountDown.string = `${--counter}s`;
            if (counter === -1) {
                this.timer.clearInterval(intervalId);
                this.resetCountdown();
            }
        }, 1000);
    }

    /**
     * 重置倒计时
     */
    private resetCountdown(): void {
        this.verifyBtn.active = true;
        this.spCountDown.active = false;
        this.lbCountDown.string = `60s`;
        this.verifyBtn.getComponent(cc.Sprite).spriteFrame = this.verifySpriteList[SPRITE.AGAIN];
    }

    @Core.code(
        CodeMap.OVER_MAX,
        CodeMap.CODE_EXPIRED,
        CodeMap.CODE_ERROR,
        CodeMap.SEND_FAIL,
        CodeMap.PHONE_ERROR,
        CodeMap.CODE_LIMIT,
        Core.CoreCodeMap.CORE_NOT_NET
    )
    public errorHandle(code: CodeMap): void {
        let str = "";
        switch (code) {
            case CodeMap.OVER_MAX:
                str = "今日验证码发送次数已达上限，请明日再试";
                break;
            case CodeMap.CODE_EXPIRED:
                str = "验证码已过期，请重新接收验证码";
                break;
            case CodeMap.CODE_ERROR:
                str = "验证码有误，请确认后重试";
                this.verifyEditBox.string = "";
                break;
            case CodeMap.SEND_FAIL:
                str = "未成功发送验证码，请稍后重试";
                break;
            case CodeMap.PHONE_ERROR:
                str = "手机号码有误，请确认后重试";
                break;
            case CodeMap.CODE_LIMIT:
                str = "系统繁忙，请稍后再接收验证码";
                break;
            case Core.CoreCodeMap.CORE_NOT_NET:
                str = "当前网络环境异常";
                break;
        }
        PromptService.prompt(str + `(${code})`);
    }

    /******************** Ui events ********************/

    /**
     * 手机登陆
     */
    onClickPhoneSubmit(): void {
        GameCore.http
            .send<HttpLoginPhoneObjBack>(
                <HttpLoginPhoneObjSend>{
                    channel: GameConfig.channelId,
                    code: this.captcha,
                    deviceCode: GameConfig.device,
                    deviceType: Core.SystemConfig.isIos ? "IOS" : "ANDROID",
                    phone: this.phoneNum,
                    invitationCode: GameConfig.inviteCode,
                },
                MapHttpApi.bdt_login_phone
            )
            .then((e) => {
                if (!e) return;
                this.loginInEvent(e.token);
            });
    }

    /**
     * 微信登陆
     */
    private async onClickWeChat(): Promise<void> {
        if (cc.sys.isNative) {
            GameService.wxLogin()
                .then(async (code) => {
                    if (code) {
                        let json = {
                            channel: GameConfig.channelId,
                            code: code,
                            deviceCode: GameConfig.device,
                            deviceType: Core.SystemConfig.isIos ? "IOS" : "ANDROID",
                            invitationCode: GameConfig.inviteCode,
                            mobileMan: GameConfig.mobileMan,
                        };
                        let netData = await Core.httpRequest.send(JSON.stringify(json), "/bdt/login/wx", "POST");
                        if (netData) {
                            this.loginInEvent(netData.token);
                        }
                    } else {
                        PromptService.prompt("微信验证失败");
                    }
                })
                .catch(() => {
                    PromptService.prompt("微信验证超时");
                });
        } else {
            GameCore.openPopup({ type: PopupType.HINT, msg: "即将开放，敬请期待!" });
        }
    }

    /**
     * 游客登陆
     */
    private onClickVisitor(): void {
        GameCore.http
            .send<HttpLoginTouristObjBack>(
                <HttpLoginTouristObjSend>{
                    channel: GameCore.config.channelId,
                    deviceCode: GameCore.config.device || Core.CommonFun.getCurrentTimeStamp() + "",
                    deviceType: Core.SystemConfig.isIos ? "IOS" : "ANDROID",
                    invitationCode: GameCore.config.inviteCode,
                    mobileMan: GameCore.config.mobileMan,
                },
                MapHttpApi.bdt_login_tourist
            )
            .then((e) => {
                this.loginInEvent(e.token);
            });
    }

    /**
     * 登陆事件
     */
    private loginInEvent(token: string) {
        GameCore.connectSocket(token);
        GameCore.localStorage.setItem(MapLocalStorage.token, token);
        this.coreCloseView();
        this.ani.closeViewAnimation();
    }

    /**
     * 点击手机登陆事件
     */
    private onClickPhone(): void {
        this.webChatBtn.active = GameCore.config.isWXLogin;
        this.phoneBtn.active = false;
        this.inputBox.setScale(1.2);
        this.inputBox.opacity = 0;
        this.inputBox.active = true;
        cc.tween(this.inputBox)
            .to(0.2, { scale: 1, opacity: 255 })
            .call(() => {
                //this.phoneEditBox.focus();
            })
            .start();
        cc.tween(this.bigBtnBox)
            .to(0.2, { opacity: 0 })
            .call(() => {
                this.bigBtnBox.active = false;
            })
            .start();
    }

    /**
     * 获取验证码事件
     */
    private onClickVerify(): void {
        let reg = /\d{11}/;
        if (!reg.test(this.phoneNum)) {
            PromptService.prompt("验证码发送失败！请输入有效的手机号！");
            return;
        }
        GameCore.http
            .send<HttpCallBackBaseObj>(<HttpLoginMessageObjSend>{ phone: this.phoneNum }, MapHttpApi.bdt_sms_send)
            .then(() => {
                PromptService.prompt("验证码发送成功！");
                this.setCountdown();
            });
    }

    /**
     * 公告点击事件
     */
    private onClickBulletin(): void {
        GameCore.http.send<NoticeContent[]>(<HttpNoticeObjReq>{}, MapHttpApi.bdt_notice_query).then((data) => {
            let msg: string;
            if (!data || data.length == 0) {
                msg = "暂无公告";
            } else {
                msg = data[0].content;
            }
            GameCore.openPopup({
                type: PopupType.NOTICE,
                msg: msg,
            });
        });
    }

    /**
     * 用户协议点击事件
     */
    private onClickUserProtocol(): void {
        Core.viewManager.openView(R.UserProtocolView);
    }

    /**
     * 隐私政策点击事件
     */
    private onClickPolicyProtocol(): void {
        Core.viewManager.openView(R.PrivacyView);
    }

    /**
     * 手机输入框事件
     */
    private onTextChangedPhone(target: string): void {
        this.phoneNum = target;

        // 改变界面表现
        let btn = this.verifyBtn.getComponent(cc.Button);
        let sprite = this.verifyBtn.getComponent(cc.Sprite);
        if (target !== "") {
            btn.interactable = true;
            sprite.spriteFrame = this.verifySpriteList[SPRITE.NORMAL];
        } else {
            btn.interactable = false;
            sprite.spriteFrame = this.verifySpriteList[SPRITE.GRAY];
        }
    }

    /**
     * 验证码输入框事件
     */
    private onTextChangedCaptcha(target: string): void {
        this.captcha = target;

        // 改变界面表现
        let btn = this.submitBtn.getComponent(cc.Button);
        let sprite = this.submitBtn.getComponent(cc.Sprite);
        if (target.length === 6) {
            btn.interactable = true;
            sprite.setMaterial(0, this.loginMaterialList[SPRITE.NORMAL]);
        } else {
            btn.interactable = false;
            sprite.setMaterial(0, this.loginMaterialList[SPRITE.GRAY]);
        }
    }
}
