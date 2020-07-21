const { ccclass } = cc._decorator;

@ccclass
export default class DataManager extends cc.Component {
    public static touchLayer: cc.Node = null;

    public static player: cc.Node = null;
}
