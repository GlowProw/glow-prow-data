import treasureMapsData from '../data/treasureMaps.json';
import {TreasureMapCategory, TreasureMapType} from "../types/TreasureMapProperties";
import {Rarity} from "../types/Rarity";
import {Territory} from "./Territories";
import {BaseType} from "./BaseType";
import {MapLocation, MapLocations} from "./MapLocations";

/**
 * 藏宝图
 */
export class TreasureMap extends BaseType {
    constructor(
        public readonly id: string,
        public readonly type: TreasureMapType,
        public readonly category: TreasureMapCategory,
        public readonly rarity: Rarity,
        public readonly dateAdded: Date,
        public readonly lastUpdated: Date,
        public readonly territory?: Territory | Territory[] | string,
        public obtainable?: string | MapLocation | Array<string | MapLocation> | Array<Array<string | MapLocation> | MapLocation | string>,
    ) {
        super()
        this._entityType = TreasureMap;
        return this
    }

    public static updateObtainableWithItems(key: string, rawData: any, treasureMaps: Record<string, TreasureMap>, mapLocations: Record<string, MapLocation>) {
        if (!rawData.obtainable) return;
        if (Array.isArray(rawData.obtainable)) {
            const obtainable = new Array<Array<string | MapLocation> | string | MapLocation>();
            for (const obtainableKey of rawData.obtainable) {
                if (Array.isArray(obtainableKey)) {
                    const obtainableGroup = new Array<string | MapLocation>();
                    for (const subKey of obtainableKey) {
                        const obtainableItem = mapLocations[subKey];
                        if (obtainableItem) {
                            obtainableGroup.push(obtainableItem);
                        } else {
                            obtainableGroup.push(subKey);
                        }
                    }
                    obtainable.push(obtainableGroup);
                } else {
                    const obtainableItem = mapLocations[obtainableKey];
                    if (obtainableItem) {
                        obtainable.push(obtainableItem);
                    } else {
                        obtainable.push(obtainableKey);
                    }
                }
            }
            treasureMaps[key].obtainable = obtainable;
        } else {
            const obtainableItem = mapLocations[rawData.obtainable];
            if (obtainableItem) {
                treasureMaps[key].obtainable = obtainableItem;
            }
        }
    }

    public static loadTreasureMaps(): Record<string, TreasureMap> {
        const treasureMaps: Record<string, TreasureMap> = {};

        for (const [key, value] of Object.entries(treasureMapsData)) {
            const territorys = Territory.loadTerritories();

            treasureMaps[key] = new TreasureMap(
                value.id,
                value.type as TreasureMapType,
                value.category as TreasureMapCategory,
                value.rarity as Rarity,
                new Date(value.dateAdded),
                new Date(value.lastUpdated),
                territorys[value.territory] ?? undefined,
                value.obtainable ?? undefined,
            );
        }

        for (const [key, value] of Object.entries(treasureMapsData)) {
            TreasureMap.updateObtainableWithItems(key, value, treasureMaps, MapLocations);
        }
        return treasureMaps;
    }
}

type TreasureMaps = {
    [K in keyof typeof treasureMapsData]: TreasureMap;
};

export const TreasureMaps = TreasureMap.loadTreasureMaps() as TreasureMaps;
