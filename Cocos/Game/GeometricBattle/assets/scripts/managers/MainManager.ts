import EventManager from "./EventManager";
import TouchSystem from "../systems/TouchSystem";
import RotateSystem from "../systems/RotateSystem";
import FireSystem from "../systems/FireSystem";
import DataManager from "./DataManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainController extends cc.Component {
    /******************** Scope values ********************/

    @property(cc.Node)
    private touchLayer: cc.Node = null;

    @property(cc.Node)
    private player: cc.Node = null;

    /******************** Live callbacks ********************/

    protected start(): void {
        this.initData();

        this.addComp();
    }

    /******************** Logics ********************/

    private initData(): void {
        DataManager.touchLayer = this.touchLayer;
        DataManager.player = this.player;
    }

    private addComp(): void {
        DataManager.touchLayer.addComponent(TouchSystem).enabled = true;

        // DataManager.player.addComponent(RotateSystem).enabled = true;

        DataManager.player.addComponent(FireSystem).enabled = false;
    }

    @EventManager.systemEventOn(EventManager.MOVE_ON)
    public touchOn(): void {
        DataManager.touchLayer.getComponent(TouchSystem).enabled = true;
        DataManager.player.getComponent(FireSystem).enabled = false;
    }

    @EventManager.systemEventOn(EventManager.MOVE_OFF)
    public fireOn(): void {
        DataManager.touchLayer.getComponent(TouchSystem).enabled = false;
        DataManager.player.getComponent(FireSystem).enabled = true;
    }
}
