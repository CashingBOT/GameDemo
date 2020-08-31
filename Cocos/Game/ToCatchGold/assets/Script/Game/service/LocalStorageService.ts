import { MapLocalStorage } from "./EventMapService";

/**
 * 本地数据储存
 * => MapLocalStorage 属性key
 */
class LocalStorage {
    /** 本地储存的key */
    private key: string = "Game";
    /** 序列化的数据 */
    private date = {};

    /**
     * 初始化数据
     * @param gameId 游戏id
     */
    init(gameId: string) {
        this.key += "_" + gameId;
        if (!localStorage.getItem(this.key)) {
            this.setData();
        } else {
            this.date = JSON.parse(localStorage.getItem(this.key));
        }

        this.setData();
    }

    /**
     * 数据储存
     */
    private setData() {
        localStorage.setItem(this.key, JSON.stringify(this.date));
    }

    /**
     * 设置数据
     * @param key 要设置的key
     * @param value 对应要设置的值
     * @param mark 唯一标记=>和key拼接成唯一的值，最好是用户的Uid
     */
    setItem(key: MapLocalStorage, value: string, mark?: any) {
        this.date[key + (mark ? "_" + mark : "")] = value;
        this.setData();
    }

    /**
     * 获取一条数据
     * @param key 存的key值
     * @param mark 唯一标记=>和key拼接成唯一的值，最好是用户的Uid
     */
    getItem(key: MapLocalStorage, mark?: any) {
        return this.date[key + (mark ? "_" + mark : "")] || null;
    }

    /**
     * 删除一条数据
     * @param key 要删除的key
     * @param mark 唯一标记=>和key拼接成唯一的值，最好是用户的Uid
     */
    delItem(key: MapLocalStorage, mark?: any) {
        delete this.date[key + (mark ? "_" + mark : "")];
        this.setData();
    }

    /**
     * 清空本地储存
     */
    clear() {
        this.date = {};
        this.setData();
    }
}
/**
 * 本地数据储存
 */
export const LocalStorageService = new LocalStorage();
