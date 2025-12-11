import ultimatesData from '../data/ultimates.json';
import {Rarity} from '../types/Rarity';
import {UltimateType} from '../types/UltimateProperties';
import {Season, Seasons} from './Seasons';
import {BaseType} from "./BaseType";

/**
 * 终结技能
 */
export class Ultimate extends BaseType {
    constructor(
        // 技能id
        public readonly id: string,
        // 技能类型
        public readonly type: UltimateType,
        // 稀有
        public readonly rarity: Rarity,
        // 赛季
        public readonly bySeason: Season,
        // 需求
        public readonly chargeRequired: number,
        // 添加时间
        public readonly dateAdded: Date,
        // 更新时间
        public readonly lastUpdated: Date
    ) {
        super()
        this._entityType = Ultimate;
        return this
    }

    public static loadUltimates(): Record<string, Ultimate> {
        const ultimates: Record<string, Ultimate> = {};
        for (const [key, value] of Object.entries(ultimatesData)) {
            const season = value.season as keyof typeof Seasons;
            ultimates[key] = new Ultimate(
                value.id,
                value.type as UltimateType,
                value.rarity as Rarity,
                Seasons[season],
                value.chargeRequired,
                new Date(value.dateAdded),
                new Date(value.lastUpdated)
            );
        }
        return ultimates;
    }
}

type Ultimates = {
    [K in keyof typeof ultimatesData]: Ultimate;
};

export const Ultimates = Ultimate.loadUltimates() as Ultimates;
