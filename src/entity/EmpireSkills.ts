import empireSkillData from "../data/empireSkills.json";
import {Faction} from "./Factions";

export class EmpireSkill {
    constructor(
        // 技能key
        public readonly key: string,
        // 技能id
        public readonly id: string,
        // 前置条件
        public readonly requisite: string[],
        // 分类
        public readonly type: string,
        // 阶段
        public readonly stage: number,
        // 阵营
        public readonly faction: Faction | unknown,
        // 需要成本
        public readonly requiredCost: []
    ) {
        return this
    }

    public static fromRawData(key: string, rawData: any): EmpireSkill {
        return new EmpireSkill(
            key,
            rawData.id,
            rawData.requisite,
            rawData.type,
            rawData.stage,
            rawData.faction,
            rawData.requiredCost
        );
    }

    public static loadFactions(): Record<string, EmpireSkill> {
        const empireSkills: Record<string, EmpireSkill> = {};
        for (const [key, value] of Object.entries(empireSkillData)) {
            empireSkills[key] = EmpireSkill.fromRawData(key, value);
        }
        return empireSkills;
    }
}

type EmpireSkills = {
    [K in keyof typeof empireSkillData]: EmpireSkill;
};

export const EmpireSkills: EmpireSkills = EmpireSkill.loadFactions() as EmpireSkills;
