import treasureMapsData from '../data/treasureMaps.json';
import {TreasureMapType} from "../types/TreasureMapProperties";
import {Rarity} from "../types/Rarity";

/**
 * 藏宝图
 */
export class TreasureMap {
    constructor(
        public readonly id: string,
        public readonly type: TreasureMapType,
        public readonly rarity: Rarity,
        public readonly dateAdded: Date,
        public readonly lastUpdated: Date,
    ) {
        return this
    }

    public static loadTreasureMaps(): Record<string, TreasureMap> {
        const treasureMaps: Record<string, TreasureMap> = {};
        for (const [key, value] of Object.entries(treasureMapsData)) {
            treasureMaps[key] = new TreasureMap(
                value.id,
                value.type as TreasureMapType,
                value.rarity as Rarity,
                new Date(value.dateAdded),
                new Date(value.lastUpdated),
            );
        }
        return treasureMaps;
    }
}

type TreasureMaps = {
    [K in keyof typeof treasureMapsData]: TreasureMap;
};

export const TreasureMaps = TreasureMap.loadTreasureMaps() as TreasureMaps;
