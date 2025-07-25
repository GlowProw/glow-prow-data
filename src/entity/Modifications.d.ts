import modificationsData from '../data/modifications.json';
import {WeaponType} from '../types/ItemProperties';
import {DamageType, EffectType, Grade, RepairAccess} from '../types/ModificationProperties';

export type ModificationVariant = {
    itemType: WeaponType[];
    range: number[];
};

/**
 * 模组
 */
export declare class Modification {
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

    constructor(id: string, effectType: EffectType | undefined, damageType: DamageType | undefined, requiredDamageType: DamageType | undefined, variants: ModificationVariant[], dropOnly: boolean, repairAccess: RepairAccess, grade: Grade, dateAdded: Date, lastUpdated: Date);

    static fromRawData(rawData: any): Modification;

    static loadModifications(): Record<string, Modification>;
}

type Modifications = {
    [K in keyof typeof modificationsData]: Modification;
};
export declare const Modifications: Modifications;
export {};
