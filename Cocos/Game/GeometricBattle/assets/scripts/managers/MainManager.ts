import DataManager from "./DataManager";
import EventManager from "./EventManager";
import TouchSystem from "../systems/TouchSystem";
import FireSystem from "../systems/FireSystem";

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
        DataManager.moveLock = false;
        DataManager.fireLock = true;
    }

    private addComp(): void {
        DataManager.touchLayer.addComponent(TouchSystem).enabled = true;
        DataManager.player.addComponent(FireSystem).enabled = false;
    }

    /******************** Events ********************/

    @EventManager.systemEventOn(EventManager.MOVE_ON)
    public touchOn(): void {
        DataManager.player.getComponent(FireSystem).enabled = false;
        DataManager.moveLock = false;
        DataManager.fireLock = true;
    }

    @EventManager.systemEventOn(EventManager.MOVE_OFF)
    public fireOn(): void {
        DataManager.player.getComponent(FireSystem).enabled = true;
        DataManager.moveLock = true;
        DataManager.fireLock = false;
    }
}
