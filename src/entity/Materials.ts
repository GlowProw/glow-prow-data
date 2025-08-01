import materialsData from "../data/materials.json";

import {MaterialCategory} from "../types/Category";
import {Rarity} from "../types/Rarity";
import {Faction, Factions} from "./Factions";
import {Events} from "./Events";

/**
 * 材料
 */
export class Material {
    // 材料id
    id!: string;
    // 稀有性
    rarity!: Rarity;
    // 类别
    category!: MaterialCategory;
    // 所需源材料
    required?: Map<Material, number>;
    // 基本分数
    requiredRank?: string;
    // 派系
    faction?: Faction;
    event?: Event;

    constructor(id: string, rarity: Rarity, category: MaterialCategory, requiredRank?: string, faction?: Faction, event?: Event) {
        this.id = id;
        this.rarity = rarity;
        this.category = category;
        this.requiredRank = requiredRank;
        this.faction = faction;
        this.event = event;
    }

    public static fromRawData(key: string, rawData: any): Material {
        const faction = rawData.faction as keyof typeof Factions;
        const event = rawData.event as keyof typeof Events;
        return new Material(
            key,
            rawData.rarity as Rarity,
            rawData.category as MaterialCategory,
            rawData.requiredRank ?? undefined,
            faction ? Factions[faction] : undefined,
            event ? Events[event] : undefined
        );
    }

    public static updateMaterialWithRequired(key: string, rawData: any, materials: Record<string, Material>) {
        if (!rawData.raw) return;
        const required = new Map<Material, number>();
        for (const [requiredKey, quantity] of Object.entries(rawData.raw)) {
            const requiredMaterial = materials[requiredKey];
            if (requiredMaterial) {
                required.set(requiredMaterial, quantity as number);
            }
        }
        materials[key].required = required;
    }

    public static loadMaterials(): Record<string, Material> {
        const materials: Record<string, Material> = {};
        // Load all materials without their required materials
        for (const [key, value] of Object.entries(materialsData)) {
            materials[key] = Material.fromRawData(key, value);
        }

        // Load the required materials for each material
        for (const [key, value] of Object.entries(materialsData)) {
            Material.updateMaterialWithRequired(key, value, materials);
        }
        return materials;
    }
}

type Materials = {
    [K in keyof typeof materialsData]: Material;
};

export const Materials: Materials = Material.loadMaterials() as Materials;
