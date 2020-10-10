/**
 * 网易易盾行为验证---web端
 */
export default class YiDunBehaviorWeb {

    /**
     * 实例
     */
    private static _instance: YiDunBehaviorWeb = null;

    /**
     * 库地址
     */
    private libUrl: string = 'http://cstaticdun.126.net/load.min.js';

    /**
     * 唯一ID
     */
    private captchaId: string = '7fe3fc67e71a4876883c48f68e67c3ce';

    /**
     * 标签ID
     */
    private divId: string = 'captcha';

    /**
     * 是否初始化成功
     */
    private isInit: boolean = false;

    /**
     * 获取单例对象
     * @private
     * @type {AdapterManager}
     */
    public static get instance(): YiDunBehaviorWeb {
        if (this._instance == null) {
            this._instance = new YiDunBehaviorWeb();
        }
        return this._instance;
    }

    /**
     * 进行行为验证
     */
    public async verification() {
        let tag: boolean;
        if (!this.isInit) {
            tag = await this.init();
            if (!tag) {
                return false;
            }
        }
        tag = await this.startVerification();
        if (!tag) {
            return false;
        }
        return true;
    }

    /**
     * 初始化
     */
    private init(): Promise<boolean> {
        return new Promise(callback => {
            let url = this.libUrl + '?t=' + this.getTimestamp(1 * 60 * 1000);

            let script = document.createElement('script');
            script.setAttribute('type', 'text/javascript');
            script.src = url;
            document.body.appendChild(script);
            script.onload = () => {
                this.isInit = true;
                callback(true);
            }
            script.onerror = () => {
                Core.error('@YiDunBehaviorWeb：初始化网易易盾失败');
                callback(false);
            }
        })
    }

    /**
     * 开始验证
     */
    private startVerification(): Promise<boolean> {
        return new Promise(callback => {

            let div = document.createElement('div');
            div.id = this.divId;
            document.body.append(div);

            let captchaIns: any;
            window['initNECaptcha'](
                {
                    captchaId: this.captchaId,
                    element: '#' + this.divId,
                    mode: 'bind',
                    width: '320px',
                    protocol: 'http',
                    onReady: (instance: any) => {
                        captchaIns = instance;
                        captchaIns.verify(); //开始验证
                    },
                    onVerify: (err: any, data: any) => {
                        if (err) {
                            Core.log('@YiDunBehaviorWeb：验证失败，开始手动验证');
                            Core.log(err);
                        } else {
                            div.remove();
                            callback(true);
                        }
                    },
                },
                function onload(instance: any) {
                    captchaIns = instance;
                },
                function onerror(err: any) {
                    Core.error('@YiDunBehaviorWeb：连接验证出错');
                    Core.error(err);
                    callback(false);
                }
            );
        })
    }

    /**
     * 获取时间戳
     */
    private getTimestamp(msec: number) {
        msec = !msec && msec !== 0 ? msec : 1
        return parseInt(((new Date()).valueOf() / msec).toString(), 10)
    }
}