import { UserInfoService } from "../Game/service/UserInfoService";
import { GameConfig } from "../GameConfig";
import { GameService, SDKShareType } from "../Game/service/GameService";
import { PromptService } from "../Game/service/PromptService";
import { Utils } from "../Game/game-lib/Utils";
import { GameCore } from "../Game/GameCore";

const { ccclass, property } = cc._decorator;

export const enum ShareType {
    INVITE = 0,
    REMIND = 1,
    RANKING = 2,
}

@ccclass
export default class ShareLogic extends Core.ViewLogic {
    /** 视图类型 */
    public style: number = Core.EViewStyle.NO_FULL;

    /** 二维码 */
    @property(cc.Graphics)
    qrCodeTexture: cc.Graphics = null;

    /** 用户头像 */
    @property(cc.Sprite)
    headSp: cc.Sprite = null;

    /** 分享节点 */
    @property(cc.Node)
    shareNode: cc.Node = null;

    /** 描述文字节点 */
    @property(cc.Node)
    descL: cc.Node = null;

    /** 描述文字阴影节点 */
    @property(cc.Node)
    descSL: cc.Node = null;

    /** 送审分享方式节点 */
    @property(cc.Node)
    reviewMethodNode: cc.Node = null;

    /** 正常分享方式 */
    @property(cc.Node)
    methodNode: cc.Node = null;

    /** 用户名称 */
    @property(cc.Label)
    userNameL: cc.Label = null;

    /** 截图相机 */
    @property(cc.Camera)
    camera: cc.Camera = null;

    @property([cc.Node])
    adBgList: cc.Node[] = [];

    @Core.module(Core.Res)
    private res: Core.Res = null;

    private shareType: ShareType = ShareType.INVITE;

    init(type: ShareType) {
        this.shareType = type;
        if (GameCore.config.isReview) {
            this.shareType = ShareType.REMIND;
        }
    }

    protected async coreOnLoad() {
        // UserInfoService.headPortrait;
        this.userNameL.string = Utils.omitStr(UserInfoService.nickname, 8);
        this.adBgList[this.shareType].active = true;
        if (this.shareType == ShareType.INVITE) {
            this.descL.active = true;
            this.descSL.active = true;
        }
        this.qrCodeInit();
        this.reviewMethodNode.active = GameCore.config.isReview;
        this.methodNode.active = !GameCore.config.isReview;

        if (UserInfoService.headPortrait && UserInfoService.headPortrait.indexOf("http") !== -1) {
            let texture: cc.Texture2D = await this.res.loadExternal(UserInfoService.headPortrait);
            this.headSp.spriteFrame = new cc.SpriteFrame(texture);
        }
    }

    /**
     *二维码初始化
     */
    private qrCodeInit() {
        var qrCode = new QRCode(-1, QRErrorCorrectLevel.H);
        qrCode.addData(
            `https://btsh.17817.com?inviteCode=${UserInfoService.invitationCode}&channelCode=${GameConfig.channelId}`
        );
        qrCode.make();

        this.qrCodeTexture.fillColor = cc.Color.BLACK;
        // compute tileW/tileH based on node width and height
        var tileW = this.qrCodeTexture.node.width / qrCode.getModuleCount();
        var tileH = this.qrCodeTexture.node.height / qrCode.getModuleCount();

        // draw in the Graphics
        for (var row = 0; row < qrCode.getModuleCount(); row++) {
            for (var col = 0; col < qrCode.getModuleCount(); col++) {
                if (qrCode.isDark(row, col)) {
                    // qrCodeTexture.fillColor = cc.Color.BLACK;
                    var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
                    var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
                    this.qrCodeTexture.rect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                    this.qrCodeTexture.fill();
                } else {
                    // qrCodeTexture.fillColor = cc.Color.WHITE;
                }
                var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
            }
        }
    }

    //截图
    private screenshot() {
        let texture = new cc.RenderTexture();
        texture.initWithSize(580, 900, cc["gfx"].RB_FMT_S8);

        this.camera.targetTexture = texture;
        this.camera.enabled = true;
        return new Promise((resolve) => {
            this.scheduleOnce(async () => {
                let data = texture.readPixels();
                let tWidth = texture.width;
                let tHeight = texture.height;
                let picData = new Uint8Array(tWidth * tHeight * 4);
                let rowBytes = tWidth * 4;
                for (let row = 0; row < tHeight; row++) {
                    let srow = tHeight - 1 - row;
                    let start = srow * tWidth * 4;
                    let reStart = row * tWidth * 4;
                    // save the piexls data
                    for (let i = 0; i < rowBytes; i++) {
                        picData[reStart + i] = data[start + i];
                    }
                }
                // this.createCanvas(picData, tWidth, tHeight);
                this.saveFile(picData, tWidth, tHeight);
                this.camera.enabled = false;
                resolve();
            }, 0);
        });
    }

    private saveFile(picData, tWidth, tHeight) {
        return new Promise((resolve, reject) => {
            if (CC_JSB) {
                let filePath = jsb.fileUtils.getWritablePath() + "render_to_sprite_image.png";
                let success = jsb["saveImageData"](picData, tWidth, tHeight, filePath);
                if (success) {
                    cc.log("save image data success, file: " + filePath);
                } else {
                    cc.error("save image data failed!");
                }
            }
        });
    }

    // private createCanvas(picData, tWidth, tHeight) {
    //     let texture = new cc.Texture2D();
    //     texture.initWithData(picData, 32, tWidth, tHeight);

    //     let spriteFrame = new cc.SpriteFrame();
    //     spriteFrame.setTexture(texture);

    //     let node = new cc.Node();
    //     let sprite = node.addComponent(cc.Sprite);
    //     sprite.spriteFrame = spriteFrame;

    //     node.zIndex = cc.macro.MAX_ZINDEX;
    //     node.parent = cc.director.getScene();
    //     // set position
    //     let width = cc.winSize.width;
    //     let height = cc.winSize.height;
    //     node.x = width / 2;
    //     node.y = height / 2;

    //     // this.captureAction(node, width, height);
    // }

    // sprite action
    // captureAction (capture, width, height) {
    //     let scaleAction = cc.scaleTo(1,0.5);
    //     let targetPos = cc.v2(width - width / 3,  height / 2);
    //     let moveAction = cc.moveTo(1, targetPos);
    //     let spawn = cc.spawn(scaleAction, moveAction);
    //     capture.runAction(spawn);
    //     // let blinkAction = cc.blink(0.1, 1);
    //     // scene action
    //     // this.node.runAction(blinkAction);
    // }

    /**
     * 关闭按钮回调
     * @param event
     * @param customerData
     */
    private closeBtnCallback(event: cc.Event, customerData: string) {
        this.coreCloseView();
    }

    /**
     * 微信按钮回调
     * @param event
     * @param customerData
     */
    private async wechatBtnCallback(event: cc.Event, customerData: string) {
        await this.screenshot();
        this.noticeServer();
        let filePath = jsb.fileUtils.getWritablePath() + "render_to_sprite_image.png";
        GameService.share(SDKShareType.WX, filePath);
    }

    /**
     * 朋友圈按钮回调
     * @param event
     * @param customerData
     */
    private async friendBtnCallback(event: cc.Event, customerData: string) {
        await this.screenshot();
        this.noticeServer();
        let filePath = jsb.fileUtils.getWritablePath() + "render_to_sprite_image.png";
        GameService.share(SDKShareType.FRIEND_GROUP, filePath);
    }

    /**
     * 手机分享按钮回调
     * @param event
     * @param customerData
     */
    private async phoneBtnCallback(event: cc.Event, customerData: string) {
        await this.screenshot();
        let filePath = jsb.fileUtils.getWritablePath() + "render_to_sprite_image.png";
        GameService.share(SDKShareType.PHONE_PHOTO, filePath);
    }

    private noticeServer() {
        if (this.shareType == ShareType.INVITE) {
            Core.webSockets.sendUDP("InviteUdp", new xxgBuf.InviteUdp({}));
        }
    }
}
