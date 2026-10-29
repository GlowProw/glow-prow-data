import enemiesData from '../data/enemies.json';
import {Season, Seasons} from "./Seasons";
import {
    EnemyCategory,
    EnemyDifficulty,
    EnemyPossibleLoot,
    EnemySummonItem,
    EnemyRoute,
    EnemyType,
    WorldTiers
} from "../types/EnemyProperties";
import {BaseType} from "./BaseType";

/**
 * 敌人（精英战舰、领域首领、船队等）
 */
export class Enemy extends BaseType {
    constructor(
        // key
        public readonly key: string,
        // id
        public readonly id: string,
        // 类型
        public readonly type: EnemyType,
        // 出现方式
        public readonly category: EnemyCategory | undefined,
        // 来源赛季
        public readonly bySeason: Season | undefined,
        // 各世界等级
        public readonly worldTiers: WorldTiers | undefined,
        // 地图图标 key
        public readonly icon: string | undefined,
        // 坐标 key 列表
        public readonly location: string[],
        // 掉落
        public readonly possibleLoot: EnemyPossibleLoot | undefined,
        // 召唤消耗
        public readonly summonItem: EnemySummonItem | undefined,
        // 挑战难度
        public readonly difficulty: EnemyDifficulty | undefined,
        // 最大参与人数
        public readonly participants: number | undefined,
        // 添加时间
        public readonly dateAdded: Date | undefined,
        // 更新时间
        public readonly lastUpdated: Date | undefined,
        // 航线（船队专有，每条航线含两个航行状态）
        public readonly routes: EnemyRoute[] | undefined,
    ) {
        super()
        this._entityType = Enemy;
        return this
    }

    /**
     * 从原始 JSON 数据构建敌人实体
     */
    public static fromRawData(key: string, rawData: any): Enemy {
        const season = rawData.season as keyof typeof Seasons;

        return new Enemy(
            key,
            rawData.id,
            rawData.type,
            rawData.category,
            season ? Seasons[season] : undefined,
            rawData.worldTiers,
            rawData.icon,
            rawData.location ?? [],
            rawData.possibleLoot,
            rawData.summonItem,
            rawData.difficulty,
            rawData.participants,
            rawData.dateAdded ? new Date(rawData.dateAdded) : undefined,
            rawData.lastUpdated ? new Date(rawData.lastUpdated) : undefined,
            rawData.routes,
        );
    }

    /**
     * 加载全部敌人
     */
    public static loadEnemies(): Record<string, Enemy> {
        const enemies: Record<string, Enemy> = {};
        for (const [key, value] of Object.entries(enemiesData)) {
            enemies[key] = Enemy.fromRawData(key, value);
        }
        return enemies;
    }
}

type Enemies = {
    [K in keyof typeof enemiesData]: Enemy;
};

export const Enemies: Enemies = Enemy.loadEnemies() as Enemies;
