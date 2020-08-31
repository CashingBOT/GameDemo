/**
 * 时间戳类型
 */
export const enum TimestampFormatType {
    /** 格式 => mm:ss */
    MM_SS = 1,
    /** 格式 => hh:mm:ss */
    HH_MM_SS = 2,
}

/**
 * 工具类
 */
class UtilsControl {
    /**
     * 时间戳转换格式
     * @param timestamp 时间戳(毫秒)
     * @param type 类型
     */
    timestampFormat(timestamp: number, type: TimestampFormatType): string {
        let t: number = Math.ceil(timestamp / 1000),
            m: number,
            h: number,
            s: number,
            timeString = "";

        switch (type) {
            case TimestampFormatType.HH_MM_SS:
                h = Math.floor(t / 60 / 60);
                m = Math.floor((t - h * 60 * 60) / 60);
                s = t - m * 60 - h * 60 * 60;
                timeString = `${this.zeroFormat(h)}:${this.zeroFormat(m)}:${this.zeroFormat(s)}`;
                break;
            case TimestampFormatType.MM_SS:
                m = Math.floor(t / 60);
                s = t - m * 60;
                timeString = `${this.zeroFormat(m)}:${this.zeroFormat(s)}`;
                break;
        }

        return timeString;
    }

    /**
     * 小于0的数值转换成00
     */
    zeroFormat(n: number) {
        return (n < 10 ? "0" : "") + n;
    }

    /**
     * 艺术字转换 => 传入字和对应的类似{"0": "01","1": "23",}这样结构的对象，返回拼接值
     * @param number 传入的数字
     * @param fontMap 对应的数字映射对象
     */
    artisticFontFormat(number: string, fontMap: Object): string {
        let numStr = number,
            newNum = "";
        for (let x = 0, l = numStr.length; x < l; x++) {
            newNum += fontMap[numStr[x]];
        }
        return newNum;
    }

    /**
     * 截取字符串长度
     * @param str 字符串
     * @param n 后面省略
     */
    public omitStr(str: string, n: number): string {
        let retStr = str;
        // console.log(str.length);

        if (str.length > n) {
            retStr = str.slice(0, n - 1) + "...";
        }
        return retStr;
    }
}

/**
 * 通用工具类
 */

export const Utils = new UtilsControl();
