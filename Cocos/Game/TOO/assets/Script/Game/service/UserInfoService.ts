/**
 * 用户类型
 */
export const enum UserType {
    /** 游客 */
    VISITOR = 1,
    /** 手机 */
    TEL = 2,
    /** 微信 */
    WE_CHAT = 3,
}

/**
 * 玩家数据
 */
class UserInfo extends Core.BaseModel {
    /** 玩家id */
    @Core.field
    userId: number | null = null;

    /** 用户uid */
    @Core.field
    uid: string | null = null;

    /** 用户昵称 */
    @Core.field
    nickname: string = "Hello";

    /** 玩家手机 */
    @Core.field
    tel: string | null = null;

    /** 玩家头像 请通过setHeadPortrait方法赋值*/
    @Core.field
    headPortrait: string = "";

    /** 玩家等级 */
    @Core.field
    level: number = 0;

    /** 用户类型 */
    @Core.field
    userType: UserType = UserType.VISITOR;

    /** 今日分红 */
    @Core.field
    todayProfit: number = 0;

    /** 我的红包 */
    @Core.field
    redBag: number = 0;

    /** 摊位列表 => 暂时没有 */
    @Core.field
    stallList: any[] = [];

    /** 当前收入 */
    @Core.field
    currentRevenue: number = 0;

    /** 收入上限 */
    @Core.field
    upperLimit: number = 0;

    /** 下一级需要金币 */
    @Core.field
    nextGoldCoin: number = 0;

    /** 吆喝总次数 */
    @Core.field
    yellCount: number = 0;

    /** 当前金币 */
    @Core.field
    currentGoldCoin: number = 0;

    /** 加速到期时间 0 为没有加速 */
    @Core.field
    advUpTime: number = 0;

    /** 加速倍数 */
    @Core.field
    advMultiple: number = 1;

    /** 等级产出/秒 */
    @Core.field
    outputs: number = 0;

    /** 离线收入 */
    @Core.field
    offlineIncome: number = 0;

    /** 邀请码 */
    @Core.field
    invitationCode: string = "";

    /** 是否绑定微信  */
    @Core.field
    bindWx: boolean = false;

    /** 是否提现过 */
    @Core.field
    isWithdraw: boolean = false;

    /** 福气值 */
    @Core.field
    blessing: number = 0;

    /** 是否体验过至尊摊主 */
    @Core.field
    isExperience: boolean = false;

    /** 至尊摊主体验等级 */
    experience: number = 0;

    /** 转盘总次数 */
    @Core.field
    turntable: number = 0;

    //============>> 自定义属性(游戏中自定)
    /** 是否进入过提现界面 */
    @Core.field
    enteredWithdraw: boolean = false;

    /** 摊主体验剩余时间 */
    @Core.field
    experienceTime: number = 0;
    /** 玩家如果未领取分红 分红的值 */
    dividendsHeart: number = 0;
    /** 至尊体验当前 */
    supremeHeartDividends: number = 0;

    /**
     * 初始化
     */
    init(d: xxgBuf.InitRet) {
        this.userId = d.user.id;
        this.nickname = d.user.nickname;
        this.level = d.user.level;
        this.tel = d.user.tel;
        this.userType = d.user.userType;
        this.headPortrait = d.user.headPortrait;
        if (this.headPortrait.indexOf("jpg") === -1) {
            this.headPortrait += "?.jpg";
        }
        this.todayProfit = d.todayProfit * 100;
        this.redBag = d.redBag * 100;
        this.currentRevenue = d.currentRevenue;
        this.currentGoldCoin = d.currentGoldCoin - d.offlineIncome;
        this.upperLimit = d.upperLimit;
        this.nextGoldCoin = d.nextGoldCoin;
        this.yellCount = d.yellCount;
        this.advUpTime = d.advUpTime;
        this.outputs = d.outputs;
        this.offlineIncome = d.offlineIncome;
        this.advMultiple = d.advMultiple ? d.advMultiple : 1;
        this.bindWx = d.bindWx;
        this.uid = d.user.uid;
        this.isWithdraw = d.isWithdraw;
        this.isExperience = d.isExperience;
        this.experience = d.experience;
        this.blessing = d.blessing / 100;
        this.turntable = d.turntable;
    }

    /** 清理数据 */
    public clear() {
        this.turntable = 0;
        this.supremeHeartDividends = 0;
        this.dividendsHeart = 0;
        this.isExperience = false;
        this.experience = 0;
        this.blessing = 0;
        this.experienceTime = 0;
        this.uid = "";
        this.userId = 0;
        this.nickname = "";
        this.level = 0;
        this.tel = "";
        this.userType = 0;
        this.headPortrait = "";
        this.todayProfit = 0;
        this.redBag = 0;
        this.currentRevenue = 0;
        this.currentGoldCoin = 0;
        this.upperLimit = 0;
        this.nextGoldCoin = 0;
        this.yellCount = 0;
        this.advUpTime = 0;
        this.outputs = 0;
        this.offlineIncome = 0;
        this.invitationCode = "";
    }

    /**
     * 赋值头像url请用我
     */
    public setHeadPortrait(headPortrait: string) {
        if (headPortrait.indexOf("jpg") === -1) {
            headPortrait += "?.jpg";
        }
        this.headPortrait = headPortrait;
    }
}

/**
 * 玩家数据
 */
export const UserInfoService = new UserInfo();
