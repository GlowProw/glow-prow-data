import modificationsData from '../data/modifications.json';
import {DamageType, EffectType, Grade, RepairAccess} from "../types/ModificationProperties";
import {WeaponType} from "../types/ItemProperties";

export type ModificationVariant = {
    itemType: WeaponType[];
    range: number[];
};

/**
 * 模组
 */
export class Modification {
    // 模组id
    readonly id: string;
    readonly effectType: EffectType | undefined;
    readonly damageType: DamageType | undefined;
    readonly requiredDamageType: DamageType | undefined;
    readonly variants: ModificationVariant[];
    readonly dropOnly: boolean;
    readonly repairAccess: RepairAccess;
    readonly grade: Grade;
    // 添加时间
    readonly dateAdded: Date;
    // 更新时间
    readonly lastUpdated: Date;

    constructor(id: any, effectType: any, damageType: any,
                requiredDamageType: any, variants: any, dropOnly: any, repairAccess: any, grade: any, dateAdded: Date, lastUpdated: Date) {
        this.id = id;
        this.effectType = effectType;
        this.damageType = damageType;
        this.requiredDamageType = requiredDamageType;
        this.variants = variants;
        this.dropOnly = dropOnly;
        this.repairAccess = repairAccess;
        this.grade = grade;
        this.dateAdded = dateAdded;
        this.lastUpdated = lastUpdated;
    }

    static fromRawData(rawData: any) {
        const variants = rawData.variants.map((variant: any) => ({
            itemType: variant.itemType,
            range: variant.range,
        }));
        return new Modification(rawData.id, rawData.effectType ?? undefined, rawData.damageType ?? undefined, rawData.requiredDamageType ?? undefined, variants, rawData.dropOnly, rawData.repairAccess, rawData.grade, new Date(rawData.dateAdded), new Date(rawData.lastUpdated));
    }

    static loadModifications() {
        const modifications: any = {};
        for (const [key, value] of Object.entries(modificationsData)) {
            modifications[key] = Modification.fromRawData(value);
        }
        return modifications;
    }
}

export const Modifications = Modification.loadModifications();
