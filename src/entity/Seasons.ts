import seasonsData from "../data/seasons.json";

/**
 * 赛季
 */
export declare class Season {
    // 赛季id
    readonly id: string;
    // 赛季别名，简称
    readonly alternativeName: string
    // 开始时间
    readonly startDate: Date;
    // 结束时间
    readonly endDate: Date;

    constructor(index: number, id: string, alternativeName: string, startDate: Date, endDate: Date);
}

type Seasons = {
    [p: string]: Season | unknown;
};

export const Seasons: Seasons = {
    ...Object.fromEntries(
        Object.entries(seasonsData).map(([key, value]) => [key, value])
    )
};

export {};
