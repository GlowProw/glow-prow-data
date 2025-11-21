import npcsData from '../data/npcs.json';
import {Season, Seasons} from "./Seasons";
import {NpcCategory, NpcType, SlotGrillPorts} from "../types/NpcProperties";

/**
 * Npc
 */
export class Npc {
    constructor(
        // key
        public readonly key: string,
        // id
        public readonly id: string,
        // 类型
        public readonly type: NpcType,
        // 类别
        public readonly category: NpcCategory[],
        // 来源赛季
        public readonly bySeason: Season | undefined,
        // 位置
        public readonly location: [],
        // 添加
        public readonly dateAdded: Date,
        // 最后更新时间
        public readonly lastUpdated: Date,
        // 插槽
        public readonly slots?: {
            grill?: SlotGrillPorts | unknown,
        } | {
            upgradeShips?: boolean,
            craftNewShips?: boolean,
            manageShips?: boolean,
            upgradeShipCosmetic?: boolean
        },
    ) {
        return this
    }

    // Static method to create a Npc instance from raw data
    public static fromRawData(key: string, rawData: any): Npc {
        const season = rawData.season as keyof typeof Seasons;

        return new Npc(
            key,
            rawData.id,
            rawData.type,
            rawData.category,
            season ? Seasons[season] : undefined,
            rawData.location,
            new Date(rawData.dateAdded),
            new Date(rawData.lastUpdated),
            {
                grill: rawData?.slots?.grill ?? undefined,
                upgradeShips: rawData?.slots?.upgradeShips ?? false,
                craftNewShips: rawData?.slots?.craftNewShips ?? false,
                manageShips: rawData?.slots?.manageShips ?? false,
                upgradeShipCosmetic: rawData?.slots?.upgradeShipCosmetic ?? false,
            },
        );
    }

    // Static method to load all npcs from the JSON data
    public static loadNpcs(): Record<string, Npc> {
        const npcs: Record<string, Npc> = {};
        for (const [key, value] of Object.entries(npcsData)) {
            npcs[key] = Npc.fromRawData(key, value);
        }
        return npcs;
    }
}

type Npcs = {
    [K in keyof typeof npcsData]: Npc;
};

export const Npcs: Npcs = Npc.loadNpcs() as Npcs;
