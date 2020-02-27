/******************
 * Draw controller
 * Creator: Resol
 * ************** */

const { ccclass, property } = cc._decorator;

@ccclass
export default class DrawController extends cc.Component {

    @property(cc.Graphics)
    draw: cc.Graphics = null;

    @property(cc.Node)
    menuBtn: cc.Node = null;

    @property(cc.Node)
    line3Btn: cc.Node = null;

    @property(cc.Node)
    line5Btn: cc.Node = null;

    @property(cc.Node)
    line7Btn: cc.Node = null;

    @property(cc.Node)
    clearBtn: cc.Node = null;

    @property(cc.Node)
    blackBtn: cc.Node = null;

    @property(cc.Node)
    redBtn: cc.Node = null;

    @property(cc.Node)
    blueBtn: cc.Node = null;

    @property(cc.Node)
    greenBtn: cc.Node = null;

    start() {
        this.node.on('touchstart', (t: cc.Touch) => {
            let worldPos = t.getLocation();
            let pos = this.node.convertToNodeSpaceAR(worldPos);
            this.draw.moveTo(pos.x, pos.y);
        });

        this.node.on('touchmove', (t: cc.Touch) => {
            let worldPos = t.getLocation();
            let pos = this.node.convertToNodeSpaceAR(worldPos);
            this.draw.lineTo(pos.x, pos.y);
            this.draw.stroke();
            this.draw.moveTo(pos.x, pos.y);
        });
    }

    public btnCallback(e: cc.Event.EventTouch, data) {

        if (cc.sys.platform === cc.sys.WECHAT_GAME) { // Judge wether WeChat environment or not
            wx.vibrateShort(); // Add vibration
        }

        switch (data) {
            case '0':
                this._setMenu();
                break;
            case '1':
                this.draw.clear();
                break;
            case '2':
                this.draw.lineWidth = 3;
                break;
            case '3':
                this.draw.lineWidth = 5;
                break;
            case '4':
                this.draw.lineWidth = 7;
                break;
            case '5':
                this.draw.strokeColor = this.blackBtn.color;
                break;
            case '6':
                this.draw.strokeColor = this.redBtn.color;
                break;
            case '7':
                this.draw.strokeColor = this.blueBtn.color;
                break;
            case '8':
                this.draw.strokeColor = this.greenBtn.color;
                break;
        }
    }

    private _setMenu() {
        this.line3Btn.active = !this.line3Btn.active;
        this.line5Btn.active = !this.line5Btn.active;
        this.line7Btn.active = !this.line7Btn.active;
        this.clearBtn.active = !this.clearBtn.active;
        this.blackBtn.active = !this.blackBtn.active;
        this.redBtn.active = !this.redBtn.active;
        this.blueBtn.active = !this.blueBtn.active;
        this.greenBtn.active = !this.greenBtn.active;
    }
}
