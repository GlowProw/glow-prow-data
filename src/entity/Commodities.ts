import commoditiesData from "../data/commodities.json";
import {CommodityCategory} from "../types/Category";
import {Rarity} from "../types/Rarity";
import {Contract, Contracts} from "./Contracts";
import {Event, Events} from "./Events";
import {Faction, Factions} from "./Factions";
import {BaseType} from "./BaseType";

/**
 * 商品
 */
export class Commodity extends BaseType {
    // @ts-ignore
    constructor(
        // 杂货id
        public readonly id: string,
        // 等级
        public readonly rarity: Rarity,
        // 大类
        public readonly category: CommodityCategory,
        public readonly dateAdded: Date | undefined,
        public readonly lastUpdated: Date | undefined,
        // 事件
        public readonly event?: Event,
        // 阵营
        public readonly faction?: Faction,
        // 合同
        public readonly contract?: Contract,
        // 是否弃用
        public readonly deprecated?: boolean
    ) {
        super();
        this._entityType = Commodity;
        return this
    }

    public static fromRawData(key: string, rawData: any): Commodity {
        const event = rawData.event as keyof typeof Events;
        const faction = rawData.faction as keyof typeof Factions;
        const contract = rawData.contract as keyof typeof Contracts;

        return new Commodity(
            rawData.id || key,
            rawData.rarity as Rarity,
            rawData.category as CommodityCategory,
            rawData.dateAdded ? new Date(rawData.dateAdded) : undefined,
            rawData.lastUpdated ? new Date(rawData.lastUpdated) : undefined,
            event ? Events[event] : undefined,
            faction ? Factions[faction] : undefined,
            contract ? Contracts[contract] : undefined,
            rawData.deprecated ?? false
        );
    }

    public static loadCommodities(): Record<string, Commodity> {
        const commodities: Record<string, Commodity> = {};
        for (const [key, value] of Object.entries(commoditiesData)) {
            commodities[key] = Commodity.fromRawData(key, value);
        }
        return commodities;
    }
}

type Commodities = {
    [K in keyof typeof commoditiesData]: Commodity;
};

export const Commodities: Commodities = Commodity.loadCommodities() as Commodities;
