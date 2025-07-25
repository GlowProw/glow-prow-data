/**
 * Grade overview based on weapon rarity:
 * - Common: Basic, Basic, Advanced, Special
 * - Uncommon: Basic, Advanced, Special
 * - Rare: Basic, Advanced, Special
 * - Epic: Basic, Advanced, Advanced
 */
export declare const ModificationGrades: readonly ["basic", "advanced", "special"];
export type Grade = (typeof ModificationGrades)[number];
export type RepairAccess = "none" | "shared" | "exclusive";
export type EffectType = "ignoreResistance" | "bonusElementalDamage" | "addElementalDamage" | "increaseDamage" | "increaseReloadSpeed" | "extraElementalDamage" | "extraDamage" | "increaseProjectileSpeed" | "increaseProjectileRange" | "reduceTimeToTarget" | "increaseCritDamage" | "increaseSiegeDamage" | "increaseSailDamage" | "increaseBlastRadius" | "increaseBuoyOperationTime" | "increaseBuoyHealth";
export declare const DamageTypes: readonly ["piercing", "electric", "explosive", "flooding", "burning", "tearing", "toxic", "overall", "base"];
export type DamageType = (typeof DamageTypes)[number];
