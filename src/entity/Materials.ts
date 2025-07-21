import materialsData from "../data/materials.json";
import { MaterialCategory } from "../types/Category";
import { Rarity } from "../types/Rarity";
import { Faction } from "./Factions";

/**
 *
 */
export declare class Material {
    id: string;
    rarity: Rarity;
    category: MaterialCategory;
    required?: Map<Material, number>;
    requiredRank?: string;
    faction?: Faction;
    constructor(id: string, rarity: Rarity, category: MaterialCategory, requiredRank?: string, faction?: Faction);
    static fromRawData(key: string, rawData: any): Material;
    static updateMaterialWithRequired(key: string, rawData: any, materials: Record<string, Material>): void;
    static loadMaterials(): Record<string, Material>;
}
type Materials = {
    [K in keyof typeof materialsData]: Material;
};
export declare const Materials: Materials;
export {};
