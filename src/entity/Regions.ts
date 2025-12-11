import regionsData from "../data/regions.json";
import {Faction, Factions} from "./Factions";
import {BaseType, EntityType} from "./BaseType";

/**
 * 地图
 */
export class Region extends BaseType {
    constructor(
        // 地区id
        public readonly id: string,
        // 所属阵营
        public readonly factions: Faction[],
        // 添加时间
        public readonly dateAdded: Date,
        // 更新时间
        public readonly lastUpdated: Date
    ) {
        super()
        this.entityType = EntityType.Region;
        return this
    }

    public static fromRawData(rawData: any): Region {
        const factions: Faction[] = rawData.factions.map((_faction: string) => {
            const faction = _faction as keyof typeof Factions;
            return Factions[faction];
        });
        return new Region(
            rawData.id,
            factions,
            new Date(rawData.dateAdded),
            new Date(rawData.lastUpdated)
        );
    }

    public static loadRegions(): Record<string, Region> {
        const Regions: Record<string, Region> = {};
        for (const [key, value] of Object.entries(regionsData)) {
            Regions[key] = Region.fromRawData(value);
        }
        return Regions;
    }
}

type Regions = {
    [K in keyof typeof regionsData]: Region;
};

export const Regions: Regions = Region.loadRegions() as Regions;
