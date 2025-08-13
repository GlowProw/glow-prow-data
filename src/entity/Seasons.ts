import seasonsData from "../data/seasons.json";

/**
 * 赛季
 */
export class Season {
    constructor(
        // 赛季id
        public readonly id: string,
        // 赛季别名
        public readonly alternativeName: string | unknown,
        // 赛季开始
        public readonly startDate: Date,
        // 赛季结束
        public readonly endDate: Date,
    ) {
        return this
    }

    public static loadSeasons(): Record<string, Season> {
        const seasons: Record<string, Season> = {};
        for (const [key, value] of Object.entries(seasonsData)) {
            seasons[key] = new Season(
                value.id,
                value.alternativeName,
                new Date(value.startDate),
                new Date(value.endDate),
            );
        }
        return seasons;
    }
}

type Seasons = {
    [K in keyof typeof seasonsData]: Season;
};

export const Seasons: Seasons = Season.loadSeasons() as Seasons;
