/******************
 * Interface
 * Creator: Resol
 * ************** */

export interface Bubble {
    node: cc.Node,
    color: number,
    isVisited: boolean,
    isLinked: boolean;
}

export enum EVENT {
    TOUCH_END_SHOOT = 'shoot'
}