/** 缓存所有依赖的数据 */
const instanceList: Map<number, new () => any> = new Map();
const metadataList: Set<{ cls: new () => any; key: string }> = new Set();
/** 注册的类列表 */
const registerClassList: Map<number, new () => any> = new Map();
/** 类的唯一id */
let registerClassId: number = 0;

Object.assign(Reflect, {
    /**
     * @param metadataKey 目前这个key暂时为design:type 其它的需要暂时看用途
     * metadataValue 返回的是一个方法，如果是string number等系统类型话就会有名称分别对String Number等，
     * 如果是自定义的泛型类型，在开发模式下会以类为名称，如果混淆以后，类的name字段就没了，需要用装饰方法给类单独绑定唯一ID，
     */
    metadata: function (metadataKey: string, metadataValue: new () => any) {
        return (target, propertyKey) => {
            if (
                typeof metadataValue === "function" &&
                !metadataList.has({ cls: metadataValue, key: propertyKey }) &&
                propertyKey
            ) {
                metadataList.add({ cls: metadataValue, key: propertyKey });
            }
        };
    },
});

/**
 * 注册可注入的类
 * @param option 预留参数
 */
function injectable(option?: any): any {
    return (target: new () => any) => {
        registerClassId++;
        Object.assign(target.prototype, { RegID: registerClassId });
        registerClassList.set(registerClassId, target);
    };
}

/**
 * 注入依赖 实例化单例
 */
function inject(): any {
    return function (target: new () => any, methodName: string, descriptor: PropertyDescriptor) {
        metadataList.forEach((e) => {
            let id = reifyClassEvent(e.cls);
            if (!id) return;
            Object.defineProperty(target, e.key, {
                value: instanceList.get(id),
                enumerable: true,
            });
        });
    };
}

function reifyClassEvent(cls: { new (): any }): number {
    let id = cls?.prototype?.RegID;
    if (!id) {
        // console.warn("miss RegID");  TODO这里应该还是可以再优化一下地
        return;
    }
    if (!instanceList.has(id)) {
        instanceList.set(id, new cls());
    }
    return id;
}

/**
 * 实例类
 */
function reifyClass(list: { new (): any }[] = []) {
    list.forEach((e) => {
        reifyClassEvent(e);
    });
}
// class ReflectManager {}

export { injectable, inject, reifyClass };
