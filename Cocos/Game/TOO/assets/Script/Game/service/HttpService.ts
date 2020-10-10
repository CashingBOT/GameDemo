import { MapHttpApi } from "./EventMapService";
import { GameCore } from "../GameCore";

export const enum HttpType {
    POST = "POST",
    GET = "GET",
}

/**
 * http模块控制器
 */
class HttpControl extends Core.BaseLogic {
    /**
     * @param param 请求的参数必须是对象
     * @param api 接口地址
     * @param type 请求的数据类型 默认POST
     * @returns 返回promise
     */
    send<T>(param: Object, api: MapHttpApi, type: HttpType = HttpType.POST): Promise<T> {
        return Core.httpRequest.send(JSON.stringify(param), api, type);
    }
}

/**
 * http模块
 */
export const HttpService = new HttpControl();
