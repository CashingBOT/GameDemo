import GlobalData from "./GlobalData";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    private _continueBtn: cc.Node;
    private _backBtn: cc.Node;

    onLoad() {
        this._initNode();

        this._setPrev();

        this._setContBtnEvent();

        this._setBackBtnEvent();
    }

    private _initNode() {
        this._continueBtn = this.node.parent.getChildByName('bg').getChildByName('continueBtn');
        this._backBtn = this.node.parent.getChildByName('bg').getChildByName('backBtn');
    }

    private _setPrev() {
        this.node.parent.on('touchstart', (event) => {
            // Add event prevent event penetration
        }, this.node.parent);
    }

    private _setContBtnEvent() {
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'PauseControl';
        clickEventHandler.handler = '_contBtnCallback';
        this._continueBtn.addComponent(cc.Button).clickEvents.push(clickEventHandler);
    }

    private _setBackBtnEvent() {
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = 'PauseControl';
        clickEventHandler.handler = '_backBtnCallback';
        this._backBtn.addComponent(cc.Button).clickEvents.push(clickEventHandler);
    }

    private _contBtnCallback() {

        cc.tween(this.node.parent.getChildByName('bg'))
            .to(0.25, { scale: 0 })
            .call(() => {
                this.node.parent.active = false;
                GlobalData.isPause('false');
            })
            .start();
    }

    private _backBtnCallback() {
        this.node.parent.parent.active = false;
        cc.systemEvent.emit('end');
    }
}
