interface Window {
    //更新发布时的进度 => 开发中这个方法是没有的
    setLoadProgress: (num: Number) => void;
}

declare const QRCode: any;

declare const QRErrorCorrectLevel: any;

/**
 * 请求游客登陆数据结构
 */
interface HttpLoginTouristObjSend {
    /** 渠道 */
    channel: string;
    /** 设备号 */
    deviceCode: string;
    /** 设备类型 */
    deviceType: string;
    /** 邀请码 */
    invitationCode?: string;
    /** ip */
    ip: string;
    /** 手机型号 */
    mobileMan: string;
}

/**
 * 请求手机登陆数据结构
 */
interface HttpLoginPhoneObjSend {
    /** 渠道 */
    channel: string;
    /** 验证码 */
    code: string;
    /** 设备号 */
    deviceCode: string;
    /** 设别类型 */
    deviceType: string;
    /** 手机号 */
    phone: string;
    /** 邀请码 */
    invitationCode?: string;
}

/**
 * 请求微信登陆数据结构
 */
interface HttpLoginWeChatObjSend {
    /** 微信临时票据凭证 */
    code: string;
}

/**
 * 发送短信数据结构
 */
interface HttpLoginMessageObjSend {
    /** 手机号码 */
    phone: string;
}

/**
 * http请求返回数据基础数据结构
 */
interface HttpCallBackBaseObj {
    /** 状态码 */
    code: number;
    /** 数据 */
    data: any;
    /** 消息 */
    message: string;
}

/**
 * 手机登陆返回数据结构
 */
interface HttpLoginPhoneObjBack extends HttpCallBackBaseObj {
    token: string;
    user: { userId: number };
}

/**
 * 初始化请求返回数据结构
 */
interface HttpInitCallBack {
    /** 更新数据 */
    appVersion: {
        /** 更新地址 */
        url: string;
        /** 更新类型（1：资源更新、2：客户端更新） */
        upgradeType: 1 | 2;
        /** 是否送审 */
        audit: boolean;
        /** 构建版本号 */
        innerVersion: number;
        /** 备注 */
        notice: string;
        /** 版本号 */
        version: string;
    };
    /** 登录方式 */
    loginButtons: {
        /** 手机登录 */
        phone: boolean;
        /** 游客登录 */
        tourist: boolean;
        /** 微信登录 */
        wx: boolean;
    };
}

/**
 * 获取公告请求
 */
interface HttpNoticeObjReq {}

/**
 * 获取公告请求返回数据结果
 */
interface NoticeContent {
    /** 公告内容 */
    content: string;
    /** 创建时间 */
    createTime: string;
    /** 有效期开始时间 */
    fromTime: string;
    /** 编号 */
    id: number;
    /** 公告状态,WAIT:等待开启,OPEN:开启,CLOSE:关闭,可用值:WAIT,OPEN,CLOSE */
    status: string;
    /** 有效期结束时间 */
    toTime: string;
    /** 修改时间 */
    updateTime: string;
}

/**
 * 游客登陆返回数据结构
 */
type HttpLoginTouristObjBack = HttpLoginPhoneObjBack;
