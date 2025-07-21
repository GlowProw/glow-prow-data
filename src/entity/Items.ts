import itemsData from '../data/items.json';
import {FurnitureType, GeneralType, Tier, WeaponType} from '../types/ItemProperties';
import {Rarity} from '../types/Rarity';
import {Contract} from './Contracts';
import {Event} from './Events';
import {Material} from './Materials';
import {Season} from './Seasons';
import {WorldEvent} from './WorldEvents';

/**
 * 游戏内物品基类，包含物品的所有属性和元数据
 * 所有游戏物品类型的基类
 */
export declare class Item {
    // ========================
    // 核心标识属性
    // ========================

    /** 物品唯一ID */
    readonly id: string;

    /**
     * 物品类型分类
     * @see GeneralType - 非战斗物品
     * @see WeaponType - 武器类型
     * @see FurnitureType - 家具类型
     */
    readonly type: GeneralType | WeaponType | FurnitureType;

    // ========================
    // 时间相关属性
    // ========================

    /** 物品首次加入游戏数据库的时间(UTC) */
    readonly dateAdded: Date;

    /** 物品数据最后更新时间(UTC) */
    readonly lastUpdated: Date;

    // ========================
    // 物品等级和稀有度
    // ========================

    /** 物品等级/阶位(I-V) */
    readonly tier?: Tier | undefined;

    /**
     * 物品稀有度
     * @see Rarity - 普通、稀有、史诗等
     */
    readonly rarity?: Rarity | undefined;

    // ========================
    // 制作相关属性
    // ========================

    /**
     * 关联的蓝图ID(如果可制作)
     * @注意 有些物品可能有蓝图但玩家无法制作
     */
    readonly bluePrint?: string | undefined;

    /**
     * 制作所需材料
     * @key Material - 材料类型
     * @value number - 需要数量
     */
    readonly required?: Map<Material, number> | undefined;

    /** 使用/制作所需的最低等级 */
    readonly requiredRank?: string | undefined;

    // ========================
    // 经济属性
    // ========================

    /** 基础商店价格(游戏内货币) */
    readonly value?: number | undefined;

    /** 物品重量(库存管理) */
    readonly weight?: number | undefined;

    // ========================
    // 战斗属性(武器)
    // ========================

    /** 综合战力评分 */
    readonly gearScore?: number | undefined;

    /** 每次射击发射的弹丸数量 */
    readonly projectilesPerShot?: number | undefined;

    /** 每个弹丸的基础伤害 */
    readonly damagePerShot?: number | undefined;

    /** 射速(每分钟发射数) */
    readonly rateOfFire?: number | undefined;

    /** 装弹时间(秒) */
    readonly reloadSpeed?: number | undefined;

    /** 有效射程(超过后伤害衰减，单位：米) */
    readonly optimalRange?: number | undefined;

    /** 弹丸速度(米/秒) */
    readonly projectileSpeed?: number | undefined;

    /** 弹丸到达最优射程目标所需时间 */
    readonly timeToTarget?: number | undefined;

    /** 特殊能力或加成效果 */
    readonly perks?: string[] | undefined;

    /** 护甲值(防具物品) */
    readonly armor?: number | undefined;

    /**
     * 伤害类型抗性
     * @key string - 伤害类型(如"子弹"、"爆炸")
     * @value number - 百分比减免(0-100)
     */
    readonly damageMitigation?: Record<string, number> | undefined;

    // ========================
    // 赛季/活动属性
    // ========================

    /** 物品引入的游戏赛季 */
    readonly season?: Season | undefined;

    /**
     * 获取方式
     * @注意 可以是字符串或来源数组
     */
    readonly obtainable?: string | string[] | undefined;

    /** 关联的特殊活动 */
    readonly event?: Event | undefined;

    /** 物品出现的世界事件 */
    readonly worldEvent?: (WorldEvent | WorldEvent[]) | undefined;

    // ========================
    // 任务/合约属性
    // ========================

    /** 关联的任务/合约 */
    readonly contract?: Contract | undefined;

    // ========================
    // 构造函数
    // ========================

    /**
     * 创建新的物品实例
     * @param id - 物品唯一ID
     * @param type - 物品类型
     * @param dateAdded - 加入游戏数据的时间
     * @param lastUpdated - 最后更新时间
     * @param tier - 物品等级
     * @param blueprint - 关联的蓝图ID
     * @param value - 基础价值
     * @param weight - 重量
     * @param gearScore - 战力评分
     * @param projectilesPerShot - 每次射击弹丸数
     * @param damagePerShot - 单发伤害
     * @param rateOfFire - 射速
     * @param reloadSpeed - 装弹时间
     * @param optimalRange - 最佳射程
     * @param projectileSpeed - 弹丸速度
     * @param timeToTarget - 到达目标时间
     * @param required - 制作材料
     * @param requiredRank - 最低等级要求
     * @param perks - 特殊能力
     * @param rarity - 稀有度
     * @param season - 引入赛季
     * @param obtainable - 获取方式
     * @param event - 关联活动
     * @param worldEvent - 世界事件
     * @param armor - 护甲值
     * @param damageMitigation - 伤害减免
     * @param contract - 关联任务
     */
    constructor(
        id: string,
        type: GeneralType | WeaponType | FurnitureType,
        dateAdded: Date,
        lastUpdated: Date,
        tier?: Tier | undefined,
        blueprint?: string | undefined,
        value?: number | undefined,
        weight?: number | undefined,
        gearScore?: number | undefined,
        projectilesPerShot?: number | undefined,
        damagePerShot?: number | undefined,
        rateOfFire?: number | undefined,
        reloadSpeed?: number | undefined,
        optimalRange?: number | undefined,
        projectileSpeed?: number | undefined,
        timeToTarget?: number | undefined,
        required?: Map<Material, number> | undefined,
        requiredRank?: string | undefined,
        perks?: string[] | undefined,
        rarity?: Rarity | undefined,
        season?: Season | undefined,
        obtainable?: string | string[] | undefined,
        event?: Event | undefined,
        worldEvent?: (WorldEvent | WorldEvent[]) | undefined,
        armor?: number | undefined,
        damageMitigation?: Record<string, number> | undefined,
        contract?: Contract | undefined
    );

    // ========================
    // 静态方法
    // ========================

    /**
     * 从原始JSON数据创建物品实例
     * @param rawData - 解析后的JSON对象
     * @returns 新的物品实例
     * @throws 当缺少必要字段时会抛出错误
     */
    static fromRawData(rawData: any): Item;

    /**
     * 从游戏数据文件加载所有物品
     * @returns 按ID索引的所有物品记录
     * @注意 通常在游戏初始化时使用
     */
    static loadItems(): Record<string, Item>;
}

type Items = {
    [p: string]: Items | unknown;
};
export const Items: Items = {
    ...Object.fromEntries(
        Object.entries(itemsData).map(([key, value]) => [key, value])
    )
};
export {};
