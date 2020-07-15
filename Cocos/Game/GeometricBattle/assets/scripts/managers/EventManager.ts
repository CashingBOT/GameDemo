export default class EventManager {
    public static TOUCH_ON: symbol = Symbol();

    public static TOUCH_OFF: symbol = Symbol();

    public static FIRE_ON: symbol = Symbol();

    public static FIRE_OFF: symbol = Symbol();

    public static eventsMap: Map<symbol, any> = new Map();

    public static emitSystemEvent(eventName: symbol, node: cc.Node): void {
        const { callback, target } = this.eventsMap.get(eventName);
        callback.call(target, node);
    }

    public static systemEventOn(eventName: symbol) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            if (EventManager.eventsMap.has(eventName)) {
                console.warn(`${eventName.toString()} 事件已存在，覆盖`);
            }
            const callback = descriptor.value;
            EventManager.eventsMap.set(eventName, { callback, target });
        };
    }

    public static systemEventOff(eventName: symbol): void {
        if (!this.eventsMap.has(eventName)) {
            console.warn(`${eventName.toString()} 事件不存在`);
            return;
        }
        this.eventsMap.delete(eventName);
    }
}
