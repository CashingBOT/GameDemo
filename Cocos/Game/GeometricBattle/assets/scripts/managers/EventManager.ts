export default class EventManager {
    /******************** Scope values ********************/

    public static MOVE_ON: symbol = Symbol();

    public static MOVE_OFF: symbol = Symbol();

    public static FIRE_ON: symbol = Symbol();

    public static FIRE_OFF: symbol = Symbol();

    public static eventsMap: Map<symbol, any> = new Map();

    /******************** External call ********************/

    public static emitSystemEvent(eventName: symbol): void {
        const { callback, target } = this.eventsMap.get(eventName);
        callback.call(target);
    }

    public static systemEventOn(eventName: symbol): any {
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
