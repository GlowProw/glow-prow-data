import {MaterialCategory} from "../types/Category";
import {Rarity} from "../types/Rarity";
import {Faction} from "./Factions";

import materialData from "../data/materials.json";

/**
 * 材料
 */
export declare class Material {
    // 材料id
    id: string;
    // 稀有性
    rarity: Rarity;
    // 类别
    category: MaterialCategory;
    // 所需
    required?: Map<Material, number>;
    // 基本分数
    requiredRank?: string;
    // 派系
    faction?: Faction;

    constructor(id: string, rarity: Rarity, category: MaterialCategory, requiredRank?: string, faction?: Faction);

    static fromRawData(key: string, rawData: any): Material;

    static updateMaterialWithRequired(key: string, rawData: any, materials: Record<string, Material>): void;

    static loadMaterials(): Record<string, Material>;
}

type Materials = {
    [p: string]: Material | unknown;
};
export const Materials: Materials = {
    ...Object.fromEntries(
        Object.entries(materialData).map(([key, value]) => [key, value])
    )
};
export {};
