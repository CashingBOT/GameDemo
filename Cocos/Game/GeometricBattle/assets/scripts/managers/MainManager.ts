import EventManager from "./EventManager";
import TouchSystem from "../systems/TouchSystem";
import FireSystem from "../systems/FireSystem";

const { ccclass } = cc._decorator;

@ccclass
export default class MainController extends cc.Component {
    @EventManager.systemEventOn(EventManager.TOUCH_ON)
    public touchOn(node: cc.Node): void {
        node.getComponent(TouchSystem).enabled = true;
        node.getComponent(FireSystem).enabled = false;
    }

    @EventManager.systemEventOn(EventManager.TOUCH_OFF)
    public fireOn(node: cc.Node): void {
        node.getComponent(TouchSystem).enabled = false;
        node.getComponent(FireSystem).enabled = true;
    }
}
