// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Node)
    player: cc.Node = null;

    @property(cc.Node)
    background: cc.Node = null;

    @property(cc.Label)
    scoreDisplay: cc.Label = null;

    @property(cc.Node)
    life: cc.Node = null;

    private started = false;
    private isDead = false;
    private isPaused = false;
    private score = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.node.getChildByName('Pause').active = false;
        this.node.getChildByName('TopScores').active = false;
        this.node.getChildByName('Life').active = false;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    public onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.node.getChildByName('Start').color = cc.color().fromHEX('#D6D6D6')
                this.node.getChildByName('Pause').color = cc.color().fromHEX('#D6D6D6')
                if (!this.isDead) {
                    if (!this.started) {
                        this.gameStart();
                        this.started = true;
                    }
                    else {
                        if (this.isPaused) {
                            this.gameResume()
                            this.node.getChildByName('Instruction').active = false;
                            this.isPaused = false;
                        }
                        else {
                            this.gamePause()
                        }
                    }
                }
                else { this.gameRestart() }
                break;
        }
    }

    public onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.space:
                this.node.getChildByName('Start').color = cc.color().fromHEX('#FFFFFF')
                if (!this.isDead) {
                    if (this.started) {
                        this.node.getChildByName('Pause').color = cc.color().fromHEX('#FFFFFF')
                        if (this.isPaused) {
                            this.node.getChildByName('PauseFont').active = false;
                        }
                        else {
                            this.node.getChildByName('PauseFont').active = true;
                            this.node.getChildByName('Instruction').active = true;
                        }
                    }
                }
                this.node.getChildByName('Back').color = cc.color().fromHEX('#FFFFFF')
                break;
        }
    }

    // start() {}

    public gameStart() {
        this.started = false;
        this.isDead = false;
        this.isPaused = false;
        this.player.getComponent("Player").gameStart();
        this.player.getComponent("Player").touchEvent();
        this.node.getComponent("Spawn").gameStart();
        this.gameInit();
        this.resetScore()
    }

    public gameInit() {
        this.node.getChildByName('Start').active = false;
        this.node.getChildByName('Tittle').active = false;
        this.node.getChildByName('Instruction').active = false;
        this.node.getChildByName('Pause').active = true;
        this.node.getChildByName('TopScores').active = true;
        this.node.getChildByName('Life').active = true;
    }

    public gamePause() {
        cc.director.pause();
        this.isPaused = true;
    }

    public gameResume() {
        cc.director.resume();
    }

    public gamePauesResume() {
        if (!this.isPaused) {
            cc.director.pause();
            this.isPaused = true;
            this.node.getChildByName('PauseFont').active = true;
            this.node.getChildByName('Instruction').active = true;
            this.player.getComponent("Player").touchOff();
        }
        else {
            cc.director.resume();
            this.isPaused = false;
            this.node.getChildByName('PauseFont').active = false;
            this.node.getChildByName('Instruction').active = false;
            this.player.getComponent("Player").touchOn();
        }
    }

    public gameRestart() {
        cc.game.restart()
    }

    public gainScoreEnemy1() {
        this.score += 1;
        this.scoreDisplay.string = this.score.toString();
    }

    public gainScoreEnemy2() {
        this.score += 9;
        this.scoreDisplay.string = this.score.toString();
    }

    public gainScoreEnemy3() {
        this.score += 3;
        this.scoreDisplay.string = this.score.toString();
    }

    public resetScore() {
        this.score = 0;
        this.scoreDisplay.string = this.score.toString();
    }

    public gameOver() {
        this.isDead = true;
        this.node.stopAllActions();
        this.node.getChildByName('Pause').active = false;
        this.node.getChildByName('GameOver').active = true;
        this.node.getChildByName('Back').active = true;
    }

    update(dt) {
        if (this.player.getComponent("Player").life <= 0) {
            this.life.getChildByName('Life1').active = false;
            this.node.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(() => this.gameOver())))
        }
        if (this.player.getComponent("Player").life <= 2) {
            this.life.getChildByName('Life3').active = false;
        }
        if (this.player.getComponent("Player").life <= 1) {
            this.life.getChildByName('Life2').active = false;
        }
    }
}
