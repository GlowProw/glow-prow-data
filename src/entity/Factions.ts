import factionsData from "../data/factions.json";
import {Event} from "./Events";
import {Season} from "./Seasons";

/**
 * 派系 阵营
 */
export declare class Faction {
    // 派系id
    readonly id: string;
    // 开始于赛季
    readonly firstAppearingSeason: Season;
    // 事件
    readonly event: Event | undefined;
    // 添加时间
    readonly dateAdded: Date;
    // 最后更新
    readonly lastUpdated: Date;

    constructor(id: string, firstAppearingSeason: Season, event: Event | undefined, dateAdded: Date, lastUpdated: Date);

    static fromRawData(rawData: any): Faction;

    static loadFactions(): Record<string, Faction>;
}

type Factions = {
    [p: string]: Faction | unknown;
};
export const Factions: Factions = {
    ...Object.fromEntries(
        Object.entries(factionsData).map(([key, value]) => [key, value])
    )
};
export {};
