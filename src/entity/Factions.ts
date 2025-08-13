import factionsData from "../data/factions.json";
import {Event, Events} from "./Events";
import {Season, Seasons} from "./Seasons";

/**
 * 派系 阵营
 */
export class Faction {
    constructor(
        // 派系id
        public readonly id: string,
        // 首次出现赛季
        public readonly firstAppearingSeason: Season,
        // 事件
        public readonly event: Event | undefined,
        // 开始于赛季
        public readonly dateAdded: Date,
        // 最后更新
        public readonly lastUpdated: Date
    ) {
        return this
    }

    public static fromRawData(rawData: any): Faction {
        const season = rawData.firstAppearingSeason as keyof typeof Seasons;
        const event = rawData.event as keyof typeof Events;
        return new Faction(
            rawData.id,
            Seasons[season],
            event ? Events[event] : undefined,
            new Date(rawData.dateAdded),
            new Date(rawData.lastUpdated)
        );
    }

    public static loadFactions(): Record<string, Faction> {
        const factions: Record<string, Faction> = {};
        for (const [key, value] of Object.entries(factionsData)) {
            factions[key] = Faction.fromRawData(value);
        }
        return factions;
    }
}

type Factions = {
    [K in keyof typeof factionsData]: Faction;
};

export const Factions: Factions = Faction.loadFactions() as Factions;
