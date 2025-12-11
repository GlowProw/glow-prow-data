import treasureMapsData from '../data/treasureMaps.json';
import {TreasureMapCategory, TreasureMapType} from "../types/TreasureMapProperties";
import {Rarity} from "../types/Rarity";
import {Territory} from "./Territories";
import {BaseType} from "./BaseType";

/**
 * 藏宝图
 */
export class TreasureMap extends BaseType {
    constructor(
        public readonly id: string,
        public readonly type: TreasureMapType,
        public readonly category: TreasureMapCategory,
        public readonly obtainable: any[],
        public readonly rarity: Rarity,
        public readonly dateAdded: Date,
        public readonly lastUpdated: Date,
        public readonly territory?: Territory | Territory[] | string
    ) {
        super()
        this._entityType = TreasureMap;
        return this
    }

    public static loadTreasureMaps(): Record<string, TreasureMap> {
        const treasureMaps: Record<string, TreasureMap> = {};

        for (const [key, value] of Object.entries(treasureMapsData)) {
            const territorys = Territory.loadTerritories();

            treasureMaps[key] = new TreasureMap(
                value.id,
                value.type as TreasureMapType,
                value.category as TreasureMapCategory,
                value.obtainable,
                value.rarity as Rarity,
                new Date(value.dateAdded),
                new Date(value.lastUpdated),
                territorys[value.territory] ?? undefined
            );
        }
        return treasureMaps;
    }
}

type TreasureMaps = {
    [K in keyof typeof treasureMapsData]: TreasureMap;
};

export const TreasureMaps = TreasureMap.loadTreasureMaps() as TreasureMaps;
