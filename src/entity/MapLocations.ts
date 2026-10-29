import mapLocationsData from '../data/mapLocations.json'
import mapLocationsResourcesData from '../data/mapLocations.resources.json'
import mapLocationsEnemiesData from '../data/mapLocations.enemies.json'
import {MapLocationCategory} from "../types/Category";
import {Season, Seasons} from "./Seasons";
import {Faction, Factions} from "./Factions";
import {LootItem, MapDifficulty} from "../types/MapLocationProperties";
import {WorldTiers} from "../types/EnemyProperties";
import {BaseType} from "./BaseType";
import {Items} from "./Items";
import {Materials} from "./Materials";
import {Commodities} from "./Commodities";

/**
 * 地图坐标点
 */
export class MapLocation extends BaseType {
    constructor(
        // 坐标id
        public readonly id: string,
        // y
        public readonly latitude: string | number,
        // x
        public readonly longitude: string | number,
        // 坐标类型
        public readonly category: MapLocationCategory,
        // 添加时间
        public readonly dateAdded: Date,
        // 最后更新时间
        public readonly lastUpdated: Date,
        // 挑战难度
        public readonly difficulty?: MapDifficulty,
        // 掉落
        public readonly possibleLoot?: any,
        // 赛季
        public readonly bySeason?: Season,
        // 阵营
        public readonly faction?: Faction,
        // 基础等级
        public readonly baseRank?: number,
        // 对应的敌人 id
        public readonly enemyId?: string,
        // 地图图标 key
        public readonly icon?: string,
        // 各世界等级
        public readonly worldTiers?: WorldTiers,
    ) {
        super();
        this._entityType = MapLocation;
        return this
    }

    /**
     * 掉落物 id 对应的实体
     */
    private static resolveLootData(key: string): any {
        if (key in Items) return Items[key as keyof typeof Items];
        if (key in Materials) return Materials[key as keyof typeof Materials];
        if (key in Commodities) return Commodities[key as keyof typeof Commodities];
        return null;
    }

    // Static method to create a Map Location instance from raw data
    public static fromRawData(rawData: any): MapLocation {
        const season = rawData.season as keyof typeof Seasons;
        const faction = rawData.faction as keyof typeof Factions;
        const possibleLoot = rawData.possibleLoot
            ? Object.fromEntries(
                Object.entries(rawData.possibleLoot || {}).map(([key, data]: [string, any]) => {
                    // 敌人掉落只记录数量，普通坐标还带等级与类别
                    if (typeof data === 'number') {
                        return [key, new LootItem(MapLocation.resolveLootData(key), {quantity: data})];
                    }
                    const {lv, ...rest} = data;
                    return [key, new LootItem(MapLocation.resolveLootData(key), {lv, ...rest})];
                })
            )
            : undefined;

        return new MapLocation(
            rawData.id,
            rawData.latitude,
            rawData.longitude,
            rawData.category,
            new Date(rawData.dateAdded),
            new Date(rawData.lastUpdated),
            rawData.difficulty,
            possibleLoot,
            Seasons[season],
            rawData.faction ? Factions[faction] : undefined,
            rawData.baseRank,
            rawData.enemyId,
            rawData.icon,
            rawData.worldTiers,
        );
    }

    // Static method to load all map location from the JSON data
    public static loadMapLocations(): Record<string, MapLocation> {
        const mapLocations: Record<string, MapLocation> = {};
        for (const [key, value] of Object.entries(mapLocationsData)) {
            mapLocations[key] = MapLocation.fromRawData(value);
        }
        for (const [key, value] of Object.entries(mapLocationsResourcesData)) {
            mapLocations[key] = MapLocation.fromRawData(value);
        }
        for (const [key, value] of Object.entries(mapLocationsEnemiesData)) {
            mapLocations[key] = MapLocation.fromRawData(value);
        }
        return mapLocations;
    }
}

type MapLocations = {
    [K in keyof typeof mapLocationsData | keyof typeof mapLocationsResourcesData | keyof typeof mapLocationsEnemiesData]: MapLocation;
};

export const MapLocations: MapLocations = MapLocation.loadMapLocations() as MapLocations;
