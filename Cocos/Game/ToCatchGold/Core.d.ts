declare namespace Core {
    /**
     * 静态配置只用来做判断使用禁止重新赋值
     */
    class StaticConfig {
        /**
         * 资源类型---视图
         */
        public static RES_TYPE_VIEW: number;
        /**
         * 资源类型---纹理帧
         */
        public static RES_TYPE_SPRITE_FRAME: number;
        /**
         * 资源类型---图集资源
         */
        public static RES_TYPE_ATLAS: number;
        /**
         * 资源类型---音频资源
         */
        public static RES_TYPE_MP3: number;
        /**
         * 资源类型---spine动画
         */
        public static RES_TYPE_SPINE: number;
        /**
         * 资源类型---json格式数据表
         */
        public static RES_TYPE_JSON: number;
        /**
         * 资源类型---自定义动画
         */
        public static RES_TYPE_ANIMATION: number;
        /**
         * 资源类型---预制件
         */
        public static RES_TYPE_PREFAB: number;
    }
    /**
     * 项目基础配置
     */
    class BaseConfig {
        /**
         * 组成主页面的视图数量
         */
        public static mainViewNum: number;
        /**
         * 日志缓存数量  达到这个数值后上传
         */
        public static logNum: number;
        /**
         * 协议延迟多久后发出警告
         */
        public static netWarnTime: number;
        /**
         * 日志类型  0：关闭日志  1：本地浏览器  2：app壳子调试环境   3：线上环境
         */
        public static debugType: number;
        /**
         * 日志等级  0：输出报错日志   1：输出报错和核心库日志   2：输出报错、核心库、游戏逻辑日志
         */
        public static debugLv: number;
        /**
         * 是否开启多点触控默认关闭
         */
        public static isOpenManyTouch: boolean;
        /**
         * 屏幕方向  0：竖屏   1：横屏
         */
        public static screenStyle: number;
    }
    /**
     * 正常日志
     * @param str - 内容
     */
    function log(str: any): void;
    /**
     * 错误日志
     * @param str - 内容
     */
    function error(str: any): void;
    /**
     * 视图样式
     */
    const enum EViewStyle {
        /**
         * 非全屏视图
         */
        NO_FULL = 0,
        /**
         * 全屏视图
         */
        FULL = 1
    }
    /**
     * 热更新状态码
     */
    const enum EUpdateState {
        /**
         * 找不到本地更新配置
         */
        ERROR_NO_LOCAL_MANIFEST = 0,
        /**
         * 下载更新配置出错
         */
        ERROR_DOWNLOAD_MANIFEST = 1,
        /**
         * 检测到新的版本
         */
        NEW_VERSION_FOUND = 2,
        /**
         * 已经是最新版本
         */
        ALREADY_UP_TO_DATE = 3,
        /**
         * 更新文件
         */
        UPDATE_PROGRESSION = 4,
        /**
         * 更新出错
         */
        ERROR_UPDATING = 5,
        /**
         * 更新完成
         */
        UPDATE_FINISHED = 6,
        /**
         * 更新失败
         */
        UPDATE_FAILED = 7,
        /**
         * 解压缩出错
         */
        ERROR_DECOMPRESS = 8
    }
    /**
     * 热更新组件
     */
    class HotUpdate extends cc.Component {
        /**
         * 设置远程地址，如果不设置则使用本地配置文件内地址
         * @param url - 远程地址
         */
        public setUrl(url: string): void;
        /**
         * 获取本地构建版本
         */
        public getBuildVersion(): string;
        /**
         * 检查更新
         */
        public checkUpdate(): Promise<IUpdateCheck>;
        /**
         * 开始更新
         */
        public hotUpdate(): void;
    }
    /**
     * 系统配置<静态配置>
     */
    class SystemConfig {
        /**
         * 是否苹果系统，不是则是安卓系统
         */
        public static isIos: boolean;
        /**
         * 是否app平台
         */
        public static isAppPlatform: boolean;
        /**
         * 是否PC网页平台
         */
        public static isPcWebPlatform: boolean;
        /**
         * 是否移动浏览器
         */
        public static isMobile: boolean;
        /**
         * 是否原生开发
         */
        public static isNative: boolean;
        /**
         * 是否有网络
         */
        public static isNet: boolean;
    }
    /**
     * Model基类
    用法:继承BaseModel
    在需要监听的字段上加上modelMember装饰器
     */
    class BaseModel {
    }
    /**
     * 处理策划表父类<静态对象>
     */
    class BaseTableData {
        /**
         * 获取表字段映射
         * @param table - 表对象
         */
        protected static shineUpon(table: any): any;
        /**
         * 获取文本
         * @param str - 字段名
         */
        public static getText(str: string): string;
        /**
         * 静态表数据
         */
        protected static table: any;
    }
    /**
     * 创建精灵，文本，等系列静态方法<静态方法>
     */
    class CreateFun {
        /**
         * 创建node并且绑定精灵
         * @param spriteFrame - 精灵帧
         * @param type - 类型
         * @param parent - 父节点
         * @param name? - node名称
         */
        public static createNodeSprite(spriteFrame: cc.SpriteFrame, type: number, parent: cc.Node, name?: string): cc.Node;
        /**
         * 创建node并且绑定文本
         * @param str - 文本字符串
         * @param color - 字体颜色
         * @param fontSize - 字体大小
         * @param line - 文本行高
         * @param parent - 父节点
         * @param name - node名称
         */
        public static createNodeLabel(str: string, color: cc.Color, fontSize: number, line: number, parent: cc.Node, name: string): cc.Node;
        /**
         * 给已经创建好的node绑定按钮
         * @param node - node对象
         * @param fun - 回调
         * @param that - 绑定节点
         * @param tag? - 是否关闭反馈状态
         */
        public static bindButton(node: cc.Node, fun: (...params: any[]) => any, that: any, tag?: boolean): cc.Button;
    }
    /**
     * 通用方法合集<静态方法>
     */
    class CommonFun {
        /**
         * 获取当前时间戳
         */
        public static getCurrentTimeStamp(): number;
        /**
         * 金币格式化
         * @param num - 金币数量
         */
        public static goldFormatting(num: number): string;
        /**
         * 通过时间戳获取当前年月日  2018-04-19
         * @param time - 时间戳
         */
        public static getYearMonthDay(time: number): string;
        /**
         * 通过时间戳获取几点几分  11:30:21
         * @param time - 时间戳
         */
        public static getWhenMinuteSecond(time: number): void;
        /**
         * 把秒数转换成时间格式 00:00
         * @param num - 秒数
         */
        public static secondToTime(num: number): string;
        /**
         * 字符填充
         * @param text - 原始字符串
         * @param valueList - 替换列表
         */
        public static attributeCharacterFill(text: string, valueList: string[]): string;
        /**
         * 拆分字符串
         * @param str - 1:1:1
         * @returns [1,1,1]
         */
        public static splitStringSemicolon(str: string): string[];
        /**
         * 拆分字符串
         * @param str - 1,1,1
         * @returns [1,1,1]
         */
        public static splitStringComma(str: string): string[];
        /**
         * 拆分字符串组
         * @param str - 1:2,1:3,1:4,1:5
         * @returns [[1,2],[1,3],[1,4],[1,5]]
         */
        public static splitStringSet(str: string): string[][];
        /**
         * 本地缓存数据
         * @param key - 缓存数据key
         * @param value - 缓存数据值
         */
        public static setCacheData(key: string, value: string): void;
        /**
         * 获取本地缓存数据
         * @param key - 缓存数据key
         */
        public static getCacheData(key: string): string;
        /**
         * 清理本地缓存数据
         * @param key - 缓存数据key
         */
        public static removeCacheData(key: string): void;
        /**
         * 清理本地连接数据
         */
        public static cleanConnectionData(): void;
        /**
         * 获取本地缓存json数据对象
         */
        public static getCacheJsonData(): ICommonCacheObj;
        /**
         * 保存本地缓存json数据对象
         * @param obj - 数据对象
         */
        public static setCacheJsonData(obj: ICommonCacheObj): void;
        /**
         * 获取Url中带的参数
         * @param key - 参数的key
         */
        public static getUrlJumpData(key: string): string;
        /**
         * 二等分位图数字转换
         * @param number - 转换的数字
         */
        public static binaryBitmapNum(number: number): string;
        /**
         * 打开视图动作
         * @param node - 节点
         * @param callback? - 动画结束回调
         */
        public static openViewAction(node: cc.Node, callback?: (...params: any[]) => any): void;
        /**
         * 把节点上的某个坐标转换成世界坐标
         * @param node - 节点
         * @param vec2? - 坐标如果不传默认为节点的锚点坐标
         */
        public static vec2ToWordVec2(node: cc.Node, vec2?: cc.Vec2): cc.Vec2;
        /**
         * 把世界坐标转换成节点坐标
         * @param node - 节点
         * @param vec2 - 世界坐标
         */
        public static wordVec2ToVec2(node: cc.Node, vec2: cc.Vec2): cc.Vec2;
        /**
         * 生成一个随机数
         * @param minNum - 最小值
         * @param maxNum? - 最大值
         */
        public static getRandom(minNum: number, maxNum?: number): number;
        /**
         * 把字符串放入粘贴板
         * @param str - 字符串
         */
        static strToClipboard(str: string): void;
        /**
         * 项目重启
         */
        public static reboot(): void;
    }
    /**
     * 修饰器--推送数据
     * @param uri - 协议uri
     */
    function netPush(uri: string): (...params: any[]) => any;
    /**
     * 修饰器--事件
     * @param eventName - 事件名
     */
    function event(eventName: string): (...params: any[]) => any;
    /**
     * 修饰器--Code码
     * @param code - code码
     */
    function code(...code: number[]): (...params: any[]) => any;
    /**
     * 修饰器--属性
     */
    function field(target: any, key: string): void;
    /**
     * 修饰器--管理器
     */
    function module(obj: any): (...params: any[]) => any;
    /**
     * 修饰器--装载实例
     * @param Class - 继承于BaseLogic的类
     */
    function instance<T extends BaseLogic>(Class: { prototype: T; }): (...params: any[]) => any;
    /**
     * Base64编码和解码<单例>
     */
    class Base64 {
        /**
         * 获取单例对象
         */
        public static instance: Base64;
        /**
         * 编码字符串
         * @param input - 要编码的字符串
         */
        public encode(input: string): string;
        /**
         * 解码字符串
         * @param input - 要解码的字符串
         */
        public decode(input: string): string;
    }
    /**
     * 资源管理器<单例>
     */
    class ResManager {
        /**
         * 输出内存资源占用情况
         */
        public logCacheRes(): void;
        /**
         * 输出资源缓存数量
         */
        public logCacheNum(): void;
        /**
         * 输出系统资源缓存
         */
        public logCache(): void;
    }
    /**
     * 事件管理器<单例>
     */
    class EventManager {
        /**
         * 注册事件
         * @param eventName - 事件名
         * @param fun - 方法
         * @param that - 作用域
         */
        public on(eventName: string, fun: (...params: any[]) => any, that: any): void;
        /**
         * 注销事件
         * @param eventName - 事件名
         * @param fun - 方法名
         */
        public off(eventName: string, fun: (...params: any[]) => any): void;
        /**
         * 抛出事件
         * @param eventName - 事件名
         * @param data? - 数据
         */
        public event(eventName: string, data?: any): void;
    }
    /**
     * 核心事件集合
     */
    class CoreEventMap {
        /**
         * 程序进入后台
         */
        public static CORE_ON_HIDE: string;
        /**
         * 程序进入前台
         */
        public static CORE_ON_SHOW: string;
        /**
         * 程序断开网络
         */
        public static CORE_NET_DISCONNECT: string;
        /**
         * 程序连上网络
         */
        public static CORE_NET_CONNECTION: string;
        /**
         * 和WS发生异常断线
         */
        public static CORE_WS_DISCONNECT: string;
        /**
         * ws重连失败
         */
        public static CORE_WS_RECONNECTION_FAILUE: string;
        /**
         * 重新连接到WS
         */
        public static CORE_WS_RECONNECTION_SUCCES: string;
        /**
         * ws消息发生延迟警告
         */
        public static CORE_ON_DELAY_WARN: string;
        /**
         * 发现未捕捉错误码
         */
        public static CORE_ON_CAPTURE_CODE: string;
    }
    /**
     * code集合
     */
    class CoreCodeMap {
        /**
         * 请求的地址不存在（http）
         */
        public static CORE_NO_URL: number;
        /**
         * 服务器内部错误（http）
         */
        public static CORE_SERVER_ERROR: number;
        /**
         * 没有网络（http）
         */
        public static CORE_NOT_NET: number;
        /**
         * 没有网络（ws）
         */
        public static CORE_WS_NOT_NET: number;
    }
    /**
     * 视图管理器<单例>
     */
    class ViewManager {
        /**
         * 获取根节点对象
         */
        public getCanvasObj(): cc.Node;
        /**
         * 打开屏蔽层
         * @param tag - 是否开启等待动画
         */
        public openShieldView(tag: boolean): void;
        /**
         * 关闭屏蔽层
         */
        public closeShieldView(): void;
        /**
         * 输出视图加载情况
         */
        public logViewLoadHistory(): void;
        /**
         * 打开视图
         * @param viewName - 视图名
         * @param data? - 数据
         * @param location? - 要插入的堆栈位置
         */
        public openView(viewName: string, data?: any, location?: number): Promise<boolean>;
        /**
         * 关闭视图
         * @param viewName? - 视图名称如果不传则关闭栈顶视图
         */
        public closeView(viewName?: string): void;
        /**
         * 获取视图对象
         * @param str - 视图名
         */
        public getChildViewObj(str: string): cc.Node;
        /**
         * 获取视图绑定的脚本对象
         * @param viewName - 视图名
         * @param scriptName - 脚本名
         */
        public getScriptObj(viewName: string, scriptName: string): T;
        /**
         * 关闭所有二级界面回到主场景
         */
        public goToMainView(): void;
    }
    /**
     * 音乐管理器<单例>
     */
    class AudioManager {
        /**
         * 设置全局音乐音量
         * @param num - 音量大小  取值(0~1)
         */
        public setAllMusicVolume(num: number): void;
        /**
         * 设置全局音效音量
         * @param num - 音量大小  取值(0~1)
         */
        public setAllSoundVolume(num: number): void;
        /**
         * 全部静音
         */
        public setAllMute(): void;
        /**
         * 全部不静音
         */
        public setAllNoMute(): void;
        /**
         * 获取音乐音量大小
         */
        public getMusicNum(): number;
        /**
         * 获取音效音量大小
         */
        public getSoundNum(): number;
        /**
         * 修改本地缓存的音乐音效大小
         */
        public updateCacheData(): void;
    }
    /**
     * 程序脚本父类
     */
    class ApplicationLogic extends cc.Component {
        /**
         * http通讯根地址---开发使用接入大厅后失效
         */
        protected httpUrl: string;
        /**
         * 链接标识---开发使用接入大厅后失效
         */
        protected token: string;
        /**
         * 注册资源列表
         * @param cl - 资源类
         */
        protected coreRegisterRes(cl: any): void;
        /**
         * 注册项目配置
         * @param obj - 项目配置对象
         */
        protected coreRegisterConfig(obj: BaseConfig): void;
        /**
         * 工程初始化之前回调
         */
        protected loadApplication(): Promise<boolean>;
        /**
         * 工程初始化完成后回调
         */
        protected startApplication(): Promise<boolean>;
        /**
         * 工程初始化进度
         * @param num - 进度（0-100）
         */
        protected initLoadProgress(num: number): void;
    }
    /**
     * 定时器模块
     */
    class Timer {
        /**
         * 创建Timeout
         * @param time - 时间（毫秒）
         */
        public setTimeout(time: number): Core.ITimeOutObj;
        /**
         * 清理Timeout
         * @param timeoutId - 计时器ID
         */
        public clearTimeout(timeoutId: any): void;
        /**
         * 创建Interval
         * @param callback - 回调
         * @param time - 时间（毫秒）
         */
        public setInterval(callback: (...params: any[]) => any, time: number): number;
        /**
         * 清理Interval
         * @param intervalId - 计时器ID
         */
        public clearInterval(intervalId: number): void;
    }
    /**
     * 游戏逻辑父类
     */
    class BaseLogic {
        /**
         * 析构函数<注意：不容许重写此方法>
         */
        public destructor(): void;
        /**
         * 子类重写的析构函数
         */
        protected coreDestructor(): void;
    }
    /**
     * 音乐模块
     */
    class Audio {
        /**
         * 设置全局音乐音量
         * @param num - 音量大小  取值(0~1)
         */
        public setAllMusicVolume(num: number): void;
        /**
         * 设置全局音效音量
         * @param num - 音量大小  取值(0~1)
         */
        public setAllSoundVolume(num: number): void;
        /**
         * 播放音乐
         * @param res - 资源名称或者音频对象
         */
        public playMusic(res: string | cc.AudioClip): void;
        /**
         * 播放音效
         * @param res - 资源名称或者音频对象
         */
        public playSound(res: string | cc.AudioClip): void;
        /**
         * 获取音乐音量大小
         */
        public getMusicNum(): number;
        /**
         * 获取音效音量大小
         */
        public getSoundNum(): number;
        /**
         * 修改本地缓存的音乐音效大小
         */
        public updateCacheData(): void;
    }
    /**
     * 资源模块
     */
    class Res {
        /**
         * 获取资源
         * @param resName - 资源名称
         */
        public getRes<T extends cc.Asset>(resName: string): Promise<IResObj<T>>;
        /**
         * 获取预制件
         * @param resName - 资源名称
         */
        public getPrefab(resName: string): Promise<cc.Node>;
        /**
         * 加载外部资源
         * @param url - 资源地址
         */
        public loadExternal(url: string): Promise<any>;
    }
    /**
     * 骨骼动画播放模块
     */
    class Skeleton {
        /**
         * 播放动画
         * @param resName - 资源名称
         * @param parentNode - 动画的父节点
         * @param obj - 动画播放参数
         */
        public play(resName: string, parentNode: cc.Node, obj: ISpinePlayObj): Promise<cc.Node>;
        /**
         * 播放已经绑定在Node上的Skeleton组件
         * @param skeleton - 动画组件
         * @param obj - 动画播放参数
         */
        public playBinNode(skeleton: sp.Skeleton, obj: ISpinePlayObj): void;
    }
    /**
     * 节点脚本父类
     */
    class ComponentLogic extends cc.Component {
        /**
         * 注册数据绑定
         * @param model - 继承于BaseModel的数据对象
         * @param fieldName - 属性名
         * @param callBack - 回调方法
         */
        protected coreOnModel(model: BaseModel, fieldName: string, callBack: (...params: any[]) => any): void;
        /**
         * 组件脚本初始化触发
         */
        protected coreOnLoad(): void;
        /**
         * 组件第一次激活，第一次执行update之前触发
         */
        protected coreStart(): void;
        /**
         * 每一帧渲染前触发
         * @param num - 时间
         */
        protected coreUpdate(num: number): void;
        /**
         * 每一帧执行完成后触发
         */
        protected coreLateUpdate(): void;
        /**
         * 组件active=true的时候触发
         */
        protected coreOnEnable(): void;
        /**
         * 组件active=false的时候触发
         */
        protected coreOnDisable(): void;
        /**
         * 组件被调用了destroy()销毁方法后触发
         */
        protected coreOnDestroy(): void;
        /**
         * 获取视图ID
         */
        public coreGetNodeId(): string;
    }
    /**
     * 视图脚本父类
     */
    class ViewLogic extends ComponentLogic {
        /**
         * 视图类型  0：非全屏视图   1：全屏视图
         */
        public style: EViewStyle;
        /**
         * 打开屏蔽界面事件向下穿透屏蔽
         */
        protected coreOpenViewShield(): void;
        /**
         * 关闭屏蔽界面事件向下穿透屏蔽
         */
        protected coreCloseViewShield(): void;
        /**
         * 触摸回调子类重写此方法
         * @param event - 触摸事件
         */
        protected coreShieldTouchCallBack(event: cc.Event): void;
        /**
         * 接收打开视图传入的参数，如果需要则重写此方法
        执行生命周期在coreOnLoad之前
         * @param data - 数据
         */
        public init(data: any): void;
        /**
         * 关闭视图
         */
        public coreCloseView(): void;
    }
    /**
     * http通讯模块<单例>
     */
    class HttpRequest {
        /**
         * 设置HTTP根地址
         * @param url - 地址
         */
        public setUrl(url: string): void;
        /**
         * 发送请求
         * @param str - 发送的数据内容
         * @param behaviorStr - 行为字符串
         * @param type - 请求类型   只接受两种参数  'GET'  'POST'
         */
        public send(str: string, behaviorStr: string, type: 'GET' | 'POST'): Promise<any>;
        /**
         * 加载js文件
         * @param url - 地址
         */
        public loadJS(url: string): Promise<any>;
    }
    /**
     * 壳子交互模块<单例>
     */
    class ShellRequest {
        /**
         * 发送消息
         * @param json - 消息
         * @param outTime? - 超时时间
         */
        public send(json: Core.IShellRequest, outTime?: number): Promise<any>;
    }
    /**
     * webSocket通讯模块<单例>
     */
    class WebSockets {
        /**
         * 打开webSocket链接
         * @param wsUrl - ws地址
         */
        public open(wsUrl: string): Promise<boolean>;
        /**
         * 发送Protobuf消息
         * @param protoName - 消息名称
         * @param msg - 消息体
         * @param tag? - 如果传入true则不开启屏蔽层
         */
        public send<T>(protoName: string, msg: any, tag?: boolean): Promise<T>;
        /**
         * 发送udp消息
         * @param protoName - 消息名称
         * @param msg - 消息体
         */
        public sendUDP(protoName: string, msg: any): void;
        /**
         * 关闭websocket
         */
        public close(): void;
    }
    /**
     * 视图管理器实例
     */
    const viewManager: ViewManager;
    /**
     * 事件管理器实例
     */
    const eventManager: EventManager;
    /**
     * 短连接通讯实例
     */
    const httpRequest: HttpRequest;
    /**
     * 资源管理器实例
     */
    const resManager: ResManager;
    /**
     * 全局音频管理器
     */
    const audioManager: AudioManager;
    /**
     * 长连接通讯实例
     */
    const webSockets: WebSockets;
    /**
     * 外壳交互模块
     */
    const shellRequest: ShellRequest;

    /**
     * 资源对象接口
     */
    interface IResObj<T extends any | cc.Asset> {
        /** 资源名称 */
        name: string;
        /** 资源类型 */
        type: number;
        /** 资源路径 */
        path: string;
        /** 加载结束后生成的cocos对象 */
        obj: T;
    }
    
    /**
     * 通用缓存数据对象接口
     */
    interface ICommonCacheObj {
        /** 连接标识 */
        token: string;
        /** 音乐音量 */
        music: number;
        /** 音效音量 */
        sound: number;
        /** 用户名 */
        userName: string;
    }
    
    /**
     * timeOut返回数据
     */
    interface ITimeOutObj {
        /** 定时器ID */
        id: number;
        /** 定时器的Promise */
        promise: Promise<any>;
    }
    
    /**
     * 资源类实现接口
     */
    interface ICoreResList {
        /**
         * 界面控制
         */
        preloadControl: { [key: string]: ICoreViewControl };
        /**
         * 初始化资源列表名
         */
        initList: string[];
        /**
         * 视图和资源依赖关系
         */
        viewMap: { [key: string]: Array<string> };
        /**
         * 资源集合
         */
        resMap: { [key: string]: ICoreResConfig };
    }
    
    /**
     * 视图控制
     */
    interface ICoreViewControl {
        /**
         * 是否预加载
         */
        isLoad: boolean;
        /**
         * 视图路径
         */
        path: string;
    }
    
    /**
     * 资源配置
     */
    interface ICoreResConfig {
        /**
         * 资源类型
         * Core.StaticConfig.RES_TYPE_VIEW             视图
         * Core.StaticConfig.RES_TYPE_SPRITE_FRAME     单张纹理
         * Core.StaticConfig.RES_TYPE_ATLAS            图集
         * Core.StaticConfig.RES_TYPE_MP3              MP3
         * Core.StaticConfig.RES_TYPE_SPINE            spine动画
         * Core.StaticConfig.RES_TYPE_JSON             json数据表
         * Core.StaticConfig.RES_TYPE_ANIMATION        自定义动画
         */
        type: number;
        /**
         * 资源路径
         */
        path: string;
    }
    
    /**
     * spine动画事件绑定接口
     */
    interface ISpinePlayObj {
        /** 动画名称 */
        name: string;
        /** 坐标 */
        vec2?: cc.Vec2;
        /** 是否持续播放 */
        isLoop?: boolean;
        /** 播放列表 */
        playList?: { name: string; isLoop: boolean }[];
        /** 播放期间是否屏蔽所有事件 */
        loadOver?: Function;
        /** 动画开始播放回调 */
        startCallback?: Function;
        /** 动画被打断 */
        interruptCallback?: Function;
        /** 动画播放完成 */
        endCallback?: Function;
        /** 动画被销毁 */
        disposeCallback?: Function;
        /** 动画播放一次循环结束后 */
        completeCallback?: Function;
        /** 帧事件 */
        eventCallback?: Function;
    }
    
    /**
     * 热更新回调事件
     */
    interface IUpdateEvent {
        /** 状态 */
        state: number;
        /** 进度 */
        percent: number;
        /** 文件进度 */
        percentByFile: number;
        /** 已经下载的文件数 */
        downloadedFiles: number;
        /** 总文件数 */
        totalFiles: number;
        /** 已经下载的字节数 */
        downloadedBytes: number;
        /** 总字节数 */
        totalBytes: number;
        /** 消息 */
        msg: string;
        /** 文件ID */
        assetId: string;
    }
    
    /**
     * 热更新检查结果
     */
    interface IUpdateCheck {
        /** 状态 */
        state: number;
        /** 大小 */
        size: number;
        /** 消息 */
        msg: string;
        /** 当前版本 */
        currentV: string;
        /** 最新版本 */
        latestV: string;
    }
    
    /**
     * 热更新检查结果
     */
    interface IShellRequest {
        /** 消息名 */
        uri: string;
        /** 消息 */
        data: any;
    }
    

}