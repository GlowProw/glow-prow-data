export declare const Tiers: readonly [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export type Tier = (typeof Tiers)[number];
export type GeneralType = "consumable" | "ammunition" | "armor" | "tool" | "chest";
export declare const WeaponTypes: readonly ["culverin", "longGun", "demicannon", "bombard", "torpedo", "ballista", "seaFire", "mortar", "rocket", "springloader"];
export type WeaponType = (typeof WeaponTypes)[number];
export declare const FurnitureTypes: readonly ["offensiveFurniture", "utilityFurniture", "majorFurniture"];
export type FurnitureType = (typeof FurnitureTypes)[number];
