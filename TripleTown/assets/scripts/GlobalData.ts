/******************
 * Global Data Storage
 * Creator: Resol
 * ************** */
const BOARD_COL = 10;
const BOARD_ROW = 8;
const BOARD_SPACING = 10;
const JELLY_ITEM_SIZE = 70;
const JELLY_ITEM_PREFAB_URL = 'prefabs/JellyItem';
const JELLY_ITEM_PNG_URL = {
    ITEM01: 'atlas/items/item01/item_01',
    ITEM02: 'atlas/items/item02/item_02',
    ITEM03: 'atlas/items/item03/item_03',
    ITEM04: 'atlas/items/item04/item_04',
    ITEM05: 'atlas/items/item05/item_05',
    ITEM06: 'atlas/items/item06/item_06'
}
const GAME_SCENE_PREFAB_URL = 'prefabs/GameScene';
const GAME_BG_PNG_URL = {
    BG01: 'bg/game/background_01',
    BG02: 'bg/game/background_02',
    BG03: 'bg/game/background_03',
    BG04: 'bg/game/background_04',
    BG05: 'bg/game/background_05'
}
let JELLY_ITEM_SPRITE_LIST = [];
let JELLY_ITEM_SPRITE_FILTERED_LIST = [];

class GlobalData {
    public getBoardCol() {
        return BOARD_COL;
    }

    public getBoardRow() {
        return BOARD_ROW;
    }

    public getBoardSpacing() {
        return BOARD_SPACING;
    }

    public getJellyItemSize() {
        return JELLY_ITEM_SIZE;
    }

    public getJellyItemPrefabUrl() {
        return JELLY_ITEM_PREFAB_URL;
    }

    public getJellyItemPngUrl() {
        return JELLY_ITEM_PNG_URL; // Verify here to change jelly item
    }

    public getGameScenePrefabUrl() {
        return GAME_SCENE_PREFAB_URL;
    }

    public getGameBgPngUrl() {
        return GAME_BG_PNG_URL.BG01; // Verify here to change game background
    }

    public getJellyItemSprite() {
        return JELLY_ITEM_SPRITE_LIST[this._getRandomInt(0, 6)]; // Those numers are index not url
    }

    public regainJellyItemSprite(parm?) {
        if (parm) {
            return JELLY_ITEM_SPRITE_FILTERED_LIST[this._getRandomInt(0, 4)]; // Those numers are index not url
        } else {
            return JELLY_ITEM_SPRITE_FILTERED_LIST[this._getRandomInt(0, 5)];
        }
    }

    public getJellyItemSpriteList() {
        return JELLY_ITEM_SPRITE_LIST;
    }

    public addJellyItemSpriteList(assets) {
        JELLY_ITEM_SPRITE_LIST = assets;
    }

    public addJellyItemSpriteFilteredList(assets) {
        JELLY_ITEM_SPRITE_FILTERED_LIST = assets;
    }

    private _getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export default new GlobalData();