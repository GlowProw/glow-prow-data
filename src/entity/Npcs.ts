import npcsData from '../data/npcs.json';
import {Season, Seasons} from "./Seasons";
import {NpcCategory, NpcSlots, NpcType} from "../types/NpcProperties";
import {Items} from "./Items";
import {Materials} from "./Materials";
import {BaseType, EntityType} from "./BaseType";

/**
 * Npc
 */
export class Npc extends BaseType {
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
        public readonly slots?: NpcSlots,
    ) {
        super()
        this.entityType = EntityType.Npc;
        return this
    }

    // Static method to create a Npc instance from raw data
    public static fromRawData(key: string, rawData: any): Npc {
        const season = rawData.season as keyof typeof Seasons;
        const slots: any = {};

        if (rawData?.slots?.container !== undefined) {
            const container = {
                ...rawData?.slots?.container,
                data: rawData.slots.container.data.map((_item: string) => Items[_item as keyof typeof Items])
            }
            slots.container = container;
        }
        if (rawData?.slots?.worker !== undefined) {
            const worker = {
                ...rawData?.slots?.worker,
                data: rawData.slots.worker.data.map((_item: string) => Materials[_item as keyof typeof Materials])
            }
            slots.worker = worker;
        }
        if (rawData?.slots?.grill !== undefined) {
            slots.grill = rawData.slots.grill;
        }
        if (rawData?.slots?.upgradeShips !== undefined) {
            slots.upgradeShips = rawData.slots.upgradeShips;
        }
        if (rawData?.slots?.craftNewShips !== undefined) {
            slots.craftNewShips = rawData.slots.craftNewShips;
        }
        if (rawData?.slots?.manageShips !== undefined) {
            slots.manageShips = rawData.slots.manageShips;
        }
        if (rawData?.slots?.upgradeShipCosmetic !== undefined) {
            slots.upgradeShipCosmetic = rawData.slots.upgradeShipCosmetic;
        }

        return new Npc(
            key,
            rawData.id,
            rawData.type,
            rawData.category,
            season ? Seasons[season] : undefined,
            rawData.location,
            new Date(rawData.dateAdded),
            new Date(rawData.lastUpdated),
            Object.keys(slots).length > 0 ? slots : undefined,
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
