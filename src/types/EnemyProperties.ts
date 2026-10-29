export const EnemyTypes = [
    "eliteWarship", "domains", "convoy", "warfleet", "seaMonster", "tower",
    "warEvent", "requiemOfTheLost", "helmActivity"
] as const;

export type EnemyType = (typeof EnemyTypes)[number];

export const EnemyCategories = [
    "PermanentEvent", "LimitedEvent"
] as const;

export type EnemyCategory = (typeof EnemyCategories)[number];

/**
 * 敌人在各个世界的等级，key 为世界编号
 */
export interface WorldTiers {
    [world: string]: number;
}

/**
 * 挑战难度，minimumPeople 表示最低参与人数
 */
export interface EnemyDifficulty {
    /**
     * 组队类型
     */
    type: 'coop' | 'pvp';
    /**
     * 最低参与人数
     */
    minimumPeople: number;
}

/**
 * 一条航线，每条航线固定有「已启程 / 即将启程」两个航行状态
 * 等级与掉落属于航线，状态只影响描述文案
 */
export interface EnemyRoute {
    /**
     * 航线 id，形如 dominionOfRempahConvoy-route-1
     */
    id: string;
    /**
     * 该航线出现的世界等级
     */
    worldTiers?: WorldTiers;
    /**
     * 该航线的掉落
     */
    possibleLoot?: EnemyPossibleLoot;
    /**
     * 该航线上的航行状态
     */
    variants: EnemyVariant[];
}

/**
 * 航行状态，underway 已启程，departing 即将启程
 */
export type EnemyVariantState = 'underway' | 'departing';

/**
 * 航线上的航行状态
 * 名称与描述放在语言包 snb.enemies.<敌人id>.variants.<状态id>
 */
export interface EnemyVariant {
    /**
     * 状态 id，形如 dominionOfRempahConvoy-route-1-variant-1
     */
    id: string;
    /**
     * 状态语义，避免只能靠 id 顺序猜测是已启程还是即将启程
     */
    state?: EnemyVariantState;
    /**
     * 该状态出现的世界等级（一般沿用所属航线）
     */
    worldTiers?: WorldTiers;
    /**
     * 该状态的掉落（一般沿用所属航线）
     */
    possibleLoot?: EnemyPossibleLoot;
}

/**
 * 召唤敌人在此数量下的物品消耗
 */
export interface EnemySummonItem {
    [itemId: string]: number;
}

/**
 * 掉落物与数量
 */
export interface EnemyPossibleLoot {
    [itemId: string]: number;
}
