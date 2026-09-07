import masterysData from "../data/masterys.json";
import {Season, Seasons} from "./Seasons";
import {BaseType} from "./BaseType";

export interface MasteryNodePosition {
    x: number;
    y: number;
}

export interface MasteryEdge {
    id: string;
    source: string;
    target: string;
    type?: string;
    data?: any;
    style?: any;
}

/**
 * 专精技能节点实体
 */
export class Mastery extends BaseType {
    constructor(
        // 节点key (唯一标识，如 B-3-2-DE2)
        public readonly key: string,
        // 技能标识/id (如 deadeye)
        public readonly id: string,
        // 标签显示名称
        public readonly label: string,
        // 前置条件节点列表
        public readonly requisite: string[],
        // 对应赛季
        public readonly bySeason: Season,
        // 添加时间
        public readonly dateAdded: Date,
        // 更新时间
        public readonly lastUpdated: Date,
        // 类别 (offensive, defensive, support, unique, impetus)
        public readonly category: string,
        // 节点角色 (keyBuff, buff, seasonalPerk)
        public readonly role: string,
        // 消耗点数
        public readonly cost: number,
        // 分组
        public readonly group: string,
        // 环层级
        public readonly ring: number,
        // 方向
        public readonly direction: string,
        // 是否核心关键增益
        public readonly isKey: boolean,
        // 节点在画布上的坐标
        public readonly position: MasteryNodePosition
    ) {
        super();
        this._entityType = Mastery;
        return this;
    }

    // 兼容访问技能标识
    public get skill(): string {
        return this.id;
    }

    public static fromRawData(key: string, rawData: any): Mastery {
        const season = rawData.season as keyof typeof Seasons;

        return new Mastery(
            key,
            rawData.id || rawData.skill || key,
            rawData.label || key,
            rawData.requisite || [],
            Seasons[season],
            new Date(rawData.dateAdded),
            new Date(rawData.lastUpdated),
            rawData.category || 'support',
            rawData.role || 'buff',
            rawData.cost || 1,
            String(rawData.group || 'radial'),
            rawData.ring || 0,
            rawData.direction || '',
            Boolean(rawData.isKey),
            rawData.position || {x: 0, y: 0}
        );
    }
}

export interface SeasonMasteryTree {
    id: string;
    season: Season;
    maxPoints: number;
    firstRingRadius: number;
    seasonalPerkGridSpacing: number;
    seasonalPerkPlacement: string;
    nodes: Record<string, Mastery>;
    edges: MasteryEdge[];
    skills: Record<string, any>;
    effects: Record<string, any>;
}

export class MasterysContainer {
    public static loadMasterys(): Record<string, SeasonMasteryTree> {
        const result: Record<string, SeasonMasteryTree> = {};
        for (const [seasonKey, seasonData] of Object.entries(masterysData as any)) {
            const season = seasonData.season as keyof typeof Seasons;
            const nodes: Record<string, Mastery> = {};
            for (const [nodeKey, nodeData] of Object.entries(seasonData.nodes as any)) {
                nodes[nodeKey] = Mastery.fromRawData(nodeKey, nodeData);
            }

            result[seasonKey] = {
                id: seasonData.id,
                season: Seasons[season],
                maxPoints: seasonData.maxPoints,
                firstRingRadius: seasonData.firstRingRadius,
                seasonalPerkGridSpacing: seasonData.seasonalPerkGridSpacing,
                seasonalPerkPlacement: seasonData.seasonalPerkPlacement,
                nodes,
                edges: seasonData.edges || [],
                skills: seasonData.skills || {},
                effects: seasonData.effects || {}
            };
        }
        return result;
    }
}

export const Masterys: Record<string, SeasonMasteryTree> = MasterysContainer.loadMasterys();
