import R from "../R";
import { CodeMap } from "../Game/Map/CodeMap";
import { PromptService } from "../Game/service/PromptService";
import { GameService } from "../Game/service/GameService";
import { UserInfoService } from "../Game/service/UserInfoService";
import { GameCore } from "../Game/GameCore";
import { PopupType } from "./SysPopupLogic";
import { MapLocalStorage } from "../Game/service/EventMapService";

/**
 * 提现数据
 */
class WithdrawInfo extends Core.BaseModel {
    /** 红包余额 */
    public redBagBalance: number = null;

    /** 小额提现 */
    public smallWithdraw: xxgBuf.ISmallWithdraw[] = null;

    /** 提现金额 */
    public applyList: number[] = [];

    /** 提现规则 */
    public description: string = null;

    /** 初始化数据 */
    public init(data: xxgBuf.WithdrawalRet): void {
        this.redBagBalance = data.redBagBalance;
        UserInfoService.redBag = this.redBagBalance * 100;
        this.smallWithdraw = data.smallwithdraw;
        this.applyList = data.applyList;
        this.description = data.description;
    }

    /**
     * 网络请求
     */
    public async requestNet(): Promise<void> {
        let data = await Core.webSockets.send<xxgBuf.WithdrawalRet>("WithdrawalReq", new xxgBuf.WithdrawalReq());
        this.init(data);
    }
}

export const WithdrawData = new WithdrawInfo();

/********************  ********************/

const { ccclass, property } = cc._decorator;

const enum BTN_SPRITE {
    /** 选中 */
    SELECTED,
    /** 未选中 */
    UNSELECTED,
}

/**
 * 提现功能
 */
@ccclass
export default class WithdrawLogic extends Core.ViewLogic {
    /******************** Scope values ********************/

    /** 如果金额满足且没提现测提示 */
    @property(cc.Node)
    private hintHand: cc.Node = null;
    /** 专享 */
    @property(cc.Node)
    private boxVip: cc.Node = null;
    /** 余额 */
    @property(cc.Label)
    private lbBalance: cc.Label = null;
    /** 专享 */
    @property(cc.Label)
    private lbVip: cc.Label = null;
    /** 提现按钮提示 */
    @property(cc.Label)
    private lbWithdrawTip: cc.Label = null;
    /** 提现 */
    @property([cc.Label])
    private lbWithdrawList: cc.Label[] = [];
    /** 专享选择 */
    @property(cc.Node)
    private btnVip: cc.Node = null;
    /** 提现金额选择 */
    @property([cc.Node])
    private btnWithdrawList: cc.Node[] = [];
    /** 专享图标 */
    @property(cc.Label)
    private lbVipLogo: cc.Label = null;
    /** 按钮精灵 */
    @property([cc.SpriteFrame])
    private spriteBtnList: cc.SpriteFrame[] = [];
    /** 提现规则 */
    @property(cc.Label)
    private lbTips: cc.Label = null;
    /** 要提现的金额 */
    private withdrawAmount: number = null;
    /** 绑定按钮 */
    @property(cc.Node)
    private bindBt: cc.Node = null;

    /******************** Lifecycle callbacks ********************/

    protected async coreOnLoad(): Promise<void> {
        this.updateModel();
        this.setEventClick();
        if (WithdrawData.smallWithdraw.length) {
            this.withdrawAmount = WithdrawData.smallWithdraw[0].amount;
            this.lbWithdrawTip.string = `${this.withdrawAmount / 100}元=${this.withdrawAmount * 100}爱心`;
        }
        if (UserInfoService.bindWx) {
            this.bindBt.active = false;
        }
    }

    protected coreStart(): void {
        this.hintHand.active = false;
        this.coreOnModel(UserInfoService, "enteredWithdraw", (e) => {
            this.hintHand.active = !e && UserInfoService.redBag >= 0.5;
        });
    }

    protected coreOnDestroy(): void {
        //记录缓存第一次点击过提现按钮
        GameCore.localStorage.setItem(MapLocalStorage.enteredWithdraw, "1", UserInfoService.uid);
        UserInfoService.enteredWithdraw = true;
    }

    /******************** Logics ********************/

    /**
     * 数据更新
     */
    private updateModel(): void {
        this.btnWithdrawList.forEach((node) => (node.active = false));
        WithdrawData.applyList.forEach((num, idx) => {
            this.btnWithdrawList[idx].active = true;
            this.lbWithdrawList[idx].string = num / 100 + "元";
        });

        this.lbBalance.string = "" + WithdrawData.redBagBalance * 100;

        this.lbTips.string = WithdrawData.description;

        if (WithdrawData.smallWithdraw.length) {
            let smallWithdrawData = WithdrawData.smallWithdraw[0];
            if (smallWithdrawData.level === 1) {
                this.lbVipLogo.string = "新人\n专享";
                this.lbVip.string = smallWithdrawData.amount / 100 + "元";
                this.withdrawAmount = smallWithdrawData.amount;
                this.lbWithdrawTip.string = `${this.withdrawAmount / 100}元=${this.withdrawAmount * 100}爱心`;
            } else {
                this.lbVipLogo.string = `${smallWithdrawData.level}级\n专享`;
                this.lbVip.string = smallWithdrawData.amount / 100 + "元";
                this.withdrawAmount = smallWithdrawData.amount;
                this.lbWithdrawTip.string = `${this.withdrawAmount / 100}元=${this.withdrawAmount * 100}爱心`;
            }
        } else {
            this.boxVip.active = false;
            this.resetWithdraw();
        }
    }

    @Core.code(
        CodeMap.WITHDRAW_FAIL,
        CodeMap.WITHDRAW_ERROR_CASH,
        CodeMap.HAS_APPLY,
        CodeMap.TODAY_CASH,
        CodeMap.INSUFFICIENT,
        CodeMap.BALANCE_ERROR,
        CodeMap.USER_INACTIVE,
        CodeMap.OVER_APPLY,
        CodeMap.NOT_BIND_WX,
        CodeMap.NOT_BIND_PHONE,
        CodeMap.OVER_SMALL_AMOUNT,
        CodeMap.WITHDRAW_USER_NOT_EXIST,
        CodeMap.WX_VERIFY_ERROR,
        CodeMap.SMALL_AMOUNT_APPLIED,
        CodeMap.INSUFFICIENT_BALANCE,
        CodeMap.SMALL_AMOUNT_LEVEL_LOW
    )
    /**
     * 错误码处理
     */
    public errorHandle(code: CodeMap): void {
        let str = "";
        switch (code) {
            case CodeMap.WITHDRAW_FAIL:
                str = "提现申请失败，请稍后重试";
                break;
            case CodeMap.WITHDRAW_ERROR_CASH:
                str = "提现申请失败，请稍后重试";
                break;
            case CodeMap.HAS_APPLY:
                str = "您有一笔提现申请正在处理";
                break;
            case CodeMap.TODAY_CASH:
                str = "您今日已成功提现，请明日再申请";
                break;
            case CodeMap.INSUFFICIENT:
                str = "您的账户余额不足";
                break;
            case CodeMap.BALANCE_ERROR:
                str = "提现申请失败，请稍后重试";
                break;
            case CodeMap.USER_INACTIVE:
                str = "提现申请失败，请稍后重试";
                break;
            case CodeMap.OVER_APPLY:
                str = "您今日申请次数已达上限，请明日再申请";
                break;
            case CodeMap.NOT_BIND_WX:
                str = "您尚未绑定微信，请绑定后再申请";
                break;
            case CodeMap.NOT_BIND_PHONE:
                str = "您尚未认证手机，请认证后再申请";
                break;
            case CodeMap.OVER_SMALL_AMOUNT:
                str = "提现申请失败，请稍后重试";
                break;
            case CodeMap.WITHDRAW_USER_NOT_EXIST:
                str = "提现申请失败，请稍后重试";
                break;
            case CodeMap.WX_VERIFY_ERROR:
                str = "微信认证失败，请稍后重试";
                break;
            case CodeMap.SMALL_AMOUNT_APPLIED:
                str = "小额提现已经申请";
                break;
            case CodeMap.INSUFFICIENT_BALANCE:
                str = "账户余额不足无法提现";
                break;
            case CodeMap.SMALL_AMOUNT_LEVEL_LOW:
                str = "小额提现等级不够";
                break;
        }
        PromptService.prompt(str + `(${code})`);
    }

    /**
     * 重置提现金额
     */
    private resetWithdraw(): void {
        this.withdrawAmount = WithdrawData.applyList[0];
        this.lbWithdrawTip.string = `${this.withdrawAmount / 100}元=${this.withdrawAmount * 100}爱心`;
        this.btnVip.getComponent(cc.Sprite).spriteFrame = this.spriteBtnList[BTN_SPRITE.UNSELECTED];
        this.lbVip.node.getComponent(cc.LabelOutline).enabled = false;
        this.btnWithdrawList.forEach((v, idx) => {
            v.getComponent(cc.Sprite).spriteFrame = this.spriteBtnList[BTN_SPRITE.UNSELECTED];
            this.lbWithdrawList[idx].getComponent(cc.LabelOutline).enabled = false;
        });
        this.btnWithdrawList[0].getComponent(cc.Sprite).spriteFrame = this.spriteBtnList[BTN_SPRITE.SELECTED];
        this.lbWithdrawList[0].getComponent(cc.LabelOutline).enabled = true;
    }

    /******************** Ui events ********************/

    /**
     * 设置提现金额按钮点击事件
     */
    private setEventClick(): void {
        this.btnVip.on("click", () => {
            this.withdrawAmount = WithdrawData.smallWithdraw[0].amount;
            this.lbWithdrawTip.string = `${this.withdrawAmount / 100}元=${this.withdrawAmount * 100}爱心`;

            // 变换精灵
            this.btnVip.getComponent(cc.Sprite).spriteFrame = this.spriteBtnList[BTN_SPRITE.SELECTED];
            let btnArr = [...this.btnWithdrawList]; // 深拷贝
            btnArr.forEach((v) => (v.getComponent(cc.Sprite).spriteFrame = this.spriteBtnList[BTN_SPRITE.UNSELECTED]));

            // 开关lb描边
            this.lbVip.node.getComponent(cc.LabelOutline).enabled = true;
            let lbArr = [...this.lbWithdrawList]; // 深拷贝
            lbArr.forEach((v) => (v.node.getComponent(cc.LabelOutline).enabled = false));
        });
        this.btnWithdrawList.forEach((v, idx) => {
            v.on("click", () => {
                this.withdrawAmount = WithdrawData.applyList[idx];
                this.lbWithdrawTip.string = `${this.withdrawAmount / 100}元=${this.withdrawAmount * 100}爱心`;

                // 变换精灵
                this.btnWithdrawList[idx].getComponent(cc.Sprite).spriteFrame = this.spriteBtnList[BTN_SPRITE.SELECTED];
                let btnArr = [...this.btnWithdrawList]; // 深拷贝
                btnArr.splice(idx, 1);
                btnArr.forEach(
                    (v) => (v.getComponent(cc.Sprite).spriteFrame = this.spriteBtnList[BTN_SPRITE.UNSELECTED])
                );
                this.btnVip.getComponent(cc.Sprite).spriteFrame = this.spriteBtnList[BTN_SPRITE.UNSELECTED];

                // 开关lb描边
                this.lbWithdrawList[idx].node.getComponent(cc.LabelOutline).enabled = true;
                let lbArr = [...this.lbWithdrawList]; // 深拷贝
                lbArr.splice(idx, 1);
                lbArr.forEach((v) => (v.node.getComponent(cc.LabelOutline).enabled = false));
                this.lbVip.node.getComponent(cc.LabelOutline).enabled = false;
            });
        });
    }

    /**
     * 打开提现记录按钮点击事件
     */
    private onClickRecord(): void {
        Core.webSockets
            .send("WithdrawalRecordReq", new xxgBuf.WithdrawalRecordReq())
            .then((v) => Core.viewManager.openView(R.WithdrawRecordView, v));
    }

    /**
     * 打开提现明细按钮点击事件
     */
    private onClickDetail(): void {
        Core.webSockets
            .send<xxgBuf.RedBagDetailsRet>("RedBagDetailsReq", new xxgBuf.RedBagDetailsReq())
            .then((v) => Core.viewManager.openView(R.WithdrawDetailView, v));
    }

    /**
     * 打开微信绑定按钮点击事件
     */
    private async onClickBindWeChat() {
        if (cc.sys.isNative) {
            GameService.wxLogin().then(async (code) => {
                if (code) {
                    let netData = await Core.webSockets.send<xxgBuf.BindingWxRet>(
                        "BindingWxReq",
                        new xxgBuf.BindingWxReq({ wxCode: code })
                    );

                    if (netData) {
                        UserInfoService.nickname = netData.user.nickname;
                        UserInfoService.setHeadPortrait(netData.user.headPortrait);
                        PromptService.prompt("微信绑定成功");
                        UserInfoService.bindWx = true;
                        this.bindBt.active = false;
                    }
                } else {
                    PromptService.prompt("微信验证失败");
                }
            });
        }
    }

    /**
     * 提现按钮点击事件
     */
    private async onClickWithdraw(): Promise<void> {
        if (!this.withdrawAmount) {
            PromptService.prompt("请选择要提现的金额");
            return;
        }

        if (this.withdrawAmount > WithdrawData.redBagBalance) {
            PromptService.prompt("爱心余额不足");
            return;
        }

        //记录缓存第一次点击过提现按钮
        GameCore.localStorage.setItem(MapLocalStorage.enteredWithdraw, "1", UserInfoService.uid);
        UserInfoService.enteredWithdraw = true;

        // 是否绑定微信
        if (!UserInfoService.bindWx) {
            GameCore.openPopup({
                type: PopupType.HINT,
                msg: "请先绑定微信，否则无法提现",
                confirm: () => {
                    this.onClickBindWeChat();
                },
            });
            return;
        }

        // 是否绑定手机
        if (!UserInfoService.tel || UserInfoService.tel === "") {
            let bindData = await Core.webSockets.send<xxgBuf.IRedBagConfigRet>(
                "RedBagConfigReq",
                new xxgBuf.RedBagConfigReq({})
            );
            if (bindData) Core.viewManager.openView(R.BindingGiftView, bindData);
            return;
        }

        if (
            !UserInfoService.isWithdraw &&
            !GameCore.localStorage.getItem(MapLocalStorage.isWithdraw, UserInfoService.uid)
        ) {
            await new Promise((resolve) => {
                GameCore.openPopup({
                    type: PopupType.HINT,
                    msg: "提现微信号需完成实名认证，否则无法成功。",
                    confirm: () => {
                        GameCore.localStorage.setItem(MapLocalStorage.isWithdraw, "1", UserInfoService.uid);
                        resolve();
                    },
                    closeButtonShow: false,
                });
            });
        }

        // 行为验证
        await GameService.verifyBehavior();

        // 调用接口
        let amount = this.withdrawAmount;
        let ret = await Core.webSockets.send<xxgBuf.ImmediateWithdrawalRet>(
            "ImmediateWithdrawalReq",
            new xxgBuf.ImmediateWithdrawalReq({ withdrawalAmount: amount })
        );

        if (ret) {
            await WithdrawData.requestNet();
            this.updateModel();
            PromptService.prompt("已提交申请，请等待审核处理");
            UserInfoService.isWithdraw = true;
        }
    }
}
