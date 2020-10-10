import R from "../../R";
import PromptLogic from "../../View/PromptLogic";

const { ccclass, property } = cc._decorator;

/**
 * 提示模块控制器
 */
@ccclass
class PromptControl extends Core.ViewLogic {
    /** 提示队列 */
    private promptQueue: string[] = [];

    private promptNode: cc.Node = null;

    @Core.module(Core.Res)
    private res: Core.Res = null;

    /**
     * 提示
     * @param str 提示文字
     */
    public prompt(str: string) {
        this.promptQueue.push(str);
        if (this.promptQueue.length == 1) {
            this.startQueue();
        }
    }

    /**
     * 开始提示
     */
    private async startQueue() {
        let str = this.promptQueue[0];
        if (str) {
            if (!this.promptNode) {
                this.promptNode = cc.instantiate(
                    await new Promise((resolve, reject) => {
                        cc.loader.loadRes("Prefab/view/PromptView", (err, res) => {
                            if (!err) {
                                resolve(res);
                            } else {
                                reject();
                            }
                        });
                    })
                );
                this.promptNode.parent = Core.viewManager.getCanvasObj();
                this.promptNode.zIndex = cc.macro.MAX_ZINDEX;
            }
            this.promptNode.active = true;
            this.promptNode.getComponent(PromptLogic).init({
                promptStr: str,
                endCallback: () => {
                    this.promptNext();
                },
            });
            this.promptNode.getComponent(PromptLogic).showPrompt();
        }
    }

    private promptNext() {
        this.promptQueue.splice(0, 1);
        if (this.promptQueue[0]) {
            this.startQueue();
        } else {
            this.promptNode.active = false;
        }
    }
}

/**
 * 飘字模块
 */
export const PromptService = new PromptControl();
