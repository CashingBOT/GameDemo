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
export default class SettingLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.NO_FULL;

    /** 头像 */
    @property(cc.Sprite)
    public headSp: cc.Sprite = null;

    /** 昵称 */
    @property(cc.Label)
    public nickNameL: cc.Label = null;

    /** id */
    @property(cc.Label)
    public userIDL: cc.Label = null;

    /** 手机号 */
    @property(cc.Label)
    public phoneNumL: cc.Label = null;

    /** 等级 */
    @property(cc.Label)
    public lvL: cc.Label = null;

    /** 版本号 */
    @property(cc.Label)
    public versionL: cc.Label = null;

    /** 绑定手机按钮 */
    @property(cc.Node)
    public bindBtn: cc.Node = null;

    /** 音乐滑动条 */
    @property(cc.Slider)
    public musicSlider: cc.Slider = null;

    /** 音效滑动条 */
    @property(cc.Slider)
    public soundSlider: cc.Slider = null;

    /** 音乐进度条 */
    @property(cc.Sprite)
    public musicSp: cc.Sprite = null;

    /** 音效进度条 */
    @property(cc.Sprite)
    public soundSp: cc.Sprite = null;

    /** 音乐开关 */
    @property(cc.Node)
    public musicOn: cc.Node = null;

    /** 音乐开关 */
    @property(cc.Node)
    public musicOff: cc.Node = null;

    /** 音效开关 */
    @property(cc.Node)
    public soundOn: cc.Node = null;

    /** 音效开关 */
    @property(cc.Node)
    public soundOff: cc.Node = null;

    @Core.module(Core.Audio)
    public audio: Core.Audio = null;

    @Core.module(Core.Res)
    public res: Core.Res = null;

    protected async coreOnLoad() {
        this.nickNameL.string = `昵称：${Utils.omitStr(UserInfoService.nickname, 8)}`;
        this.userIDL.string = `ID：${UserInfoService.uid}`;
        this.phoneNumL.string = `手机号：${UserInfoService.tel}`;
        this.lvL.string = "" + UserInfoService.level;
        this.versionL.string = `版本号：${GameCore.config.version}`;

        this.bindBtn.active = UserInfoService.tel == "";
        this.initSettingView();
        if (UserInfoService.headPortrait && UserInfoService.headPortrait.indexOf("http") !== -1) {
            let texture: cc.Texture2D = await this.res.loadExternal(UserInfoService.headPortrait);
            this.headSp.spriteFrame = new cc.SpriteFrame(texture);
        }
    }

    /**
     * 初始化设置界面
     */
    public initSettingView() {
        this.musicSlider.progress = this.audio.getMusicNum();
        this.musicSp.fillRange = this.audio.getMusicNum();

        this.soundSlider.progress = this.audio.getSoundNum();
        this.soundSp.fillRange = this.audio.getSoundNum();

        this.musicOn.active = this.audio.getMusicNum() != 0;
        this.musicOff.active = this.audio.getMusicNum() == 0;

        this.soundOn.active = this.audio.getSoundNum() != 0;
        this.soundOff.active = this.audio.getSoundNum() == 0;
    }

    /**
     * 音乐按钮回调
     * @param event
     * @param customerData
     */
    public musicBtnCallback(event: cc.Event, customerData: string) {
        if (this.audio.getMusicNum() == 0) {
            this.musicSlider.progress = 1;
        } else {
            this.musicSlider.progress = 0;
        }
        this.musicSliderCallback(this.musicSlider);
    }

    /**
     * 音效按钮回调
     * @param event
     * @param customerData
     */
    public soundBtnCallback(event: cc.Event, customerData: string) {
        if (this.audio.getSoundNum() == 0) {
            this.soundSlider.progress = 1;
        } else {
            this.soundSlider.progress = 0;
        }
        this.soundSliderCallback(this.soundSlider);
    }

    /**
     * 音乐滑动条回调
     * @param slider
     * @param customerData
     */
    public musicSliderCallback(slider: cc.Slider, customerData?: string) {
        this.audio.setAllMusicVolume(slider.progress);
        this.musicSp.fillRange = this.audio.getMusicNum();
        this.musicOn.active = this.audio.getMusicNum() != 0;
        this.musicOff.active = this.audio.getMusicNum() == 0;
    }

    /**
     * 音效滑动条回调
     * @param slider
     * @param customerData
     */
    public soundSliderCallback(slider: cc.Slider, customerData?: string) {
        this.audio.setAllSoundVolume(slider.progress);
        this.soundSp.fillRange = this.audio.getSoundNum();
        this.soundOn.active = this.audio.getSoundNum() != 0;
        this.soundOff.active = this.audio.getSoundNum() == 0;
    }

    /**
     * 绑定按钮回调
     * @param event
     * @param customerData
     */
    public async bindBtnCallback(event: cc.Event, customerData: string) {
        await this.closeBtnCallback();
        Core.eventManager.event(MapGlobalEvent.mainMenuTrigger, MenuButtonId.BIND_REWARD);
    }

    /**
     * 复制按钮回调
     * @param event
     * @param customerData
     */
    public async copyBtnCallback(event: cc.Event, customerData: string) {
        await GameService.strToClipboard("" + UserInfoService.uid);
        PromptService.prompt("复制成功");
    }

    /**
     * 关闭按钮回调
     * @param event
     * @param customerData
     */
    public async closeBtnCallback(event?: cc.Event, customerData?: string) {
        this.audio.updateCacheData();
        await this.getComponent(ViewAnimation).closeViewAnimation();
        this.coreCloseView();
    }

    /**
     * 公告按钮回调
     * @param event
     * @param customerData
     */
    public noticeBtnCallback(event: cc.Event, customerData: string) {
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
     * 登出按钮回调
     * @param event
     * @param customerData
     */
    public async logoutBtnCallback(event: cc.Event, customerData: string) {
        await this.getComponent(ViewAnimation).closeViewAnimation();
        this.coreCloseView();
        GameService.logout();
    }

    /**
     * 用户协议按钮回调
     * @param event
     * @param customerData
     */
    public userProtocolBtnCallback(event: cc.Event, customerData: string) {
        Core.viewManager.openView(R.UserProtocolView);
    }

    /**
     * 隐私协议按钮回调
     * @param event
     * @param customerData
     */
    public privacyBtnCallback(event: cc.Event, customerData: string) {
        Core.viewManager.openView(R.PrivacyView);
    }
}
