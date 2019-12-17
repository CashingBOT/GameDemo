/******************
 * Home Page Controller
 * Creator: Resol
 * ************** */
import GlobalData from "./GlobalData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HomeControl extends cc.Component {

    private _logo: cc.Node;
    private _startBtn: cc.Node;

    onLoad() {
        this._initNode();

        this._loadJellyItemSprite();

        this._setLogoEffects();

        this._setStartBtnEvent();
    }

    onDisable() {
        this._startBtn.off('mouseenter', () => {
            this._startBtn.runAction(cc.scaleTo(0.2, 1.2));
        })

        this._startBtn.off('mouseleave', () => {
            this._startBtn.runAction(cc.scaleTo(0.2, 1));
        })
    }

    private _initNode() {
        this._logo = this.node.parent.getChildByName('logo');
        this._startBtn = this.node.parent.getChildByName('startBtn');
    }

    private _loadJellyItemSprite() {
        cc.loader.loadResArray([
            GlobalData.getJellyItemPngUrl().ITEM01,
            GlobalData.getJellyItemPngUrl().ITEM02,
            GlobalData.getJellyItemPngUrl().ITEM03,
            GlobalData.getJellyItemPngUrl().ITEM04,
            GlobalData.getJellyItemPngUrl().ITEM05,
            GlobalData.getJellyItemPngUrl().ITEM06,
        ], cc.SpriteFrame, (err, assets) => {
            if (err) {
                cc.error(err);
                return;
            }

            GlobalData.addJellyItemSpriteList(assets);
        })
    }

    private _loadGameScene() {
        cc.loader.loadRes(GlobalData.getGameScenePrefabUrl(), cc.Prefab, (err, prefab) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            let newScene = cc.instantiate(prefab);
            this.node.parent.addChild(newScene, 1, 'gameScene');

            // Load game background
            cc.loader.loadRes(GlobalData.getGameBgPngUrl(), cc.SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    cc.error(err.message || err);
                    return;
                }
                newScene.addComponent(cc.Sprite).spriteFrame = spriteFrame;
            })

            this._setEffects(newScene);
        })
    }

    private _setLogoEffects() {
        cc.tween(this._logo)
            .repeatForever(cc.tween(this._logo)
                .delay(5)
                .to(1, { scale: 1.2 }, { easing: 'elasticOut' })
                .to(1, { scale: 1 }, { easing: 'bounceOut' }))
            .start();
    }

    private _setEffects(scene: cc.Node) {
        // Temporary effects
        // Home page logo fly out
        this._logo.runAction(cc.sequence(cc.moveTo(1, cc.v2(0, 1280)), cc.callFunc(() => {
            this._logo.active = false;
        })))

        // Home page start button fly out
        let seqAction1 = cc.spawn(cc.moveTo(1, cc.v2(0, -1280)), cc.scaleTo(0.2, 1));
        let seqAction2 = cc.callFunc(() => {
            this._startBtn.active = false;
        })
        this._startBtn.runAction(cc.sequence(seqAction1, seqAction2));

        // Game scene fly in
        // newScene.y = 1280;
        // newScene.runAction(cc.moveTo(1, cc.v2(0, 0)));

        // Gamme scene fade in
        scene.opacity = 0;
        cc.tween(scene)
            .to(1, { opacity: 255 })
            .start();
    }

    private _setStartBtnEvent() {
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'HomeControl';
        clickEventHandler.handler = '_startBtnCallback';
        this._startBtn.addComponent(cc.Button).clickEvents.push(clickEventHandler);

        // Set start button effects
        this._startBtn.on('mouseenter', () => {
            this._startBtn.runAction(cc.scaleTo(0.2, 1.2));
        })

        this._startBtn.on('mouseleave', () => {
            this._startBtn.runAction(cc.scaleTo(0.2, 1));
        })
    }

    private _startBtnCallback(event) {
        event.target.getComponent(cc.Button).interactable = false;

        this._loadGameScene();
    }
}