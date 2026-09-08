import masterysData from "../data/masterys.json";
import { Season, Seasons } from "./Seasons";
import { BaseType } from "./BaseType";
import {
    MasteryCategory,
    MasteryRole,
    MasteryNodePosition,
    MasteryEdge
} from "../types/MasteryProperties";

export {
    type MasteryCategory,
    MasteryCategories,
    type MasteryRole,
    MasteryRoles,
    type MasteryNodePosition,
    type MasteryEdge,
} from "../types/MasteryProperties";

/**
 * 专精技能节点实体
 */
export class Mastery extends BaseType {
    constructor(
        // 节点key
        public readonly key: string,
        // 技能标识/id
        public readonly id: string,
        // 前置条件节点列表
        public readonly requisite: string[],
        // 对应赛季
        public readonly bySeason: Season,
        // 添加时间
        public readonly dateAdded: Date,
        // 更新时间
        public readonly lastUpdated: Date,
        // 类别
        public readonly category: MasteryCategory,
        // 节点角色
        public readonly role: MasteryRole,
        // 消耗点数
        public readonly cost: number,
        // 分组
        public readonly group: string,
        // 环层级
        public readonly ring: number,
        // 方向
        public readonly direction: string,
        // 节点在画布上的坐标
        public readonly position: MasteryNodePosition,
        // 效果列表
        public readonly effects: any[] = []
    ) {
        super();
        this._entityType = Mastery;
        return this;
    }

    // 兼容访问技能标识
    public get skill(): string {
        return this.id;
    }

    // 兼容访问赛季
    public get season(): Season {
        return this.bySeason;
    }

    public static fromRawData(key: string, rawData: any): Mastery {
        const season = rawData.season as keyof typeof Seasons;

        return new Mastery(
            key,
            rawData.id || rawData.skill,
            rawData.requisite || [],
            Seasons[season],
            new Date(rawData.dateAdded),
            new Date(rawData.lastUpdated),
            (rawData.category as MasteryCategory) || 'support',
            (rawData.role as MasteryRole) || 'buff',
            rawData.cost || 1,
            String(rawData.group || 'radial'),
            rawData.ring || 0,
            rawData.direction || '',
            rawData.position || { x: 0, y: 0 },
            rawData.effects || []
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
    edges?: MasteryEdge[];
    skills: Record<string, any>;
    effects?: Record<string, any>;
}

export class MasterysContainer {
    public static loadMasterys(): Record<string, SeasonMasteryTree> {
        const result: Record<string, SeasonMasteryTree> = {};
        const rawData = masterysData as unknown as Record<string, any>;
        for (const [seasonKey, rawSeason] of Object.entries(rawData)) {
            const seasonData: any = rawSeason;
            const season = seasonData.season as keyof typeof Seasons;
            const nodes: Record<string, Mastery> = {};
            for (const [nodeKey, nodeData] of Object.entries((seasonData.nodes || {}) as Record<string, any>)) {
                nodes[nodeKey] = Mastery.fromRawData(nodeKey, nodeData);
            }

            // 生成关系线
            // 从 requisite 关系自动生成
            let edges: MasteryEdge[] = seasonData.edges || [];
            if (edges.length === 0) {
                const edgeSet = new Set<string>();
                for (const [nodeKey, node] of Object.entries(nodes)) {
                    const nodeObj = node as Mastery;
                    if (nodeObj.requisite && nodeObj.requisite.length > 0) {
                        for (const reqKey of nodeObj.requisite) {
                            // 先在 nodes 中查找 requisite：可能是 key，也可能是 id
                            const resolvedSource = nodes[reqKey]
                                ? reqKey
                                : Object.keys(nodes).find(k => (nodes[k] as Mastery).id === reqKey) || reqKey;
                            const edgeId = `${resolvedSource}->${nodeKey}`;
                            if (!edgeSet.has(edgeId) && nodes[resolvedSource]) {
                                edgeSet.add(edgeId);
                                edges.push({
                                    id: edgeId,
                                    source: resolvedSource,
                                    target: nodeKey,
                                });
                            }
                        }
                    }
                }
            }

            result[seasonKey] = {
                id: seasonData.id,
                season: Seasons[season],
                maxPoints: seasonData.maxPoints,
                firstRingRadius: seasonData.firstRingRadius,
                seasonalPerkGridSpacing: seasonData.seasonalPerkGridSpacing,
                seasonalPerkPlacement: seasonData.seasonalPerkPlacement,
                nodes,
                edges,
                skills: seasonData.skills || {},
                effects: seasonData.effects || {}
            };
        }
        return result;
    }
}

export const Masterys: Record<string, SeasonMasteryTree> = MasterysContainer.loadMasterys();
