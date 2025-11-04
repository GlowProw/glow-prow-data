import mapLocationsData from '../data/mapLocations.json'
import {MapLocationCategory} from "../types/Category";
import {Season, Seasons} from "./Seasons";
import {Faction, Factions} from "./Factions";

/**
 * 地图坐标点
 */
export class MapLocation {
    constructor(
        // 坐标id
        public readonly id: string,
        // y
        public readonly latitude: string,
        // x
        public readonly longitude: string,
        // 坐标类型
        public readonly category: MapLocationCategory,
        // 添加时间
        public readonly dateAdded: Date,
        // 最后更新时间
        public readonly lastUpdated: Date,
        // 掉落
        public readonly possibleLoot?: any,
        // 赛季
        public readonly bySeason?: Season,
        // 阵营
        public readonly faction?: Faction,
        // 基础等级
        public readonly baseRank?: number,
    ) {
        return this
    }

    // Static method to create a Map Location instance from raw data
    public static fromRawData(rawData: any): MapLocation {
        const season = rawData.season as keyof typeof Seasons;
        const faction = rawData.faction as keyof typeof Factions;

        return new MapLocation(
            rawData.id,
            rawData.latitude,
            rawData.longitude,
            rawData.category,
            new Date(rawData.dateAdded),
            new Date(rawData.lastUpdated),
            rawData.possibleLoot,
            Seasons[season],
            rawData.faction ? Factions[faction] : undefined,
            rawData.baseRank,
        );
    }

    // Static method to load all map location from the JSON data
    public static loadMapLocations(): Record<string, MapLocation> {
        const mapLocations: Record<string, MapLocation> = {};
        for (const [key, value] of Object.entries(mapLocationsData)) {
            mapLocations[key] = MapLocation.fromRawData(value);
        }
        return mapLocations;
    }
}

type MapLocations = {
    [K in keyof typeof mapLocationsData]: MapLocation;
};

export const MapLocations: MapLocations = MapLocation.loadMapLocations() as MapLocations;
