import shipsData from '../data/ships.json';

import {ShipSize, SlotWithGunports, SlotWithGunportsAcrossDecks} from "../types/ShipProperties";
import {Season, Seasons} from "./Seasons";
import {Contract, Contracts} from "./Contracts";
import {Material, Materials} from "./Materials";

/**
 * 船只
 */
export class Ship {
    constructor(
        // 船只id
        public readonly id: string,
        // 尺寸
        public readonly size: ShipSize,
        // 类型
        public readonly type: string,
        // 合同
        public readonly contract: Contract | undefined,
        // 蓝图
        public readonly blueprint: string | string[] | undefined,
        // 来源赛季
        public readonly bySeason: Season | undefined,
        // 血量
        public readonly hitPoints: number,
        // 增强力量
        public readonly braceStrength: number,
        public readonly braceStrengthRecovery: number,
        // stamina
        public readonly stamina: number | undefined,
        // 基础分数
        public readonly baseRank: number,
        // 基本分数
        public readonly requiredRank: string | undefined,
        public readonly contact: string | undefined,
        // 船速度
        public readonly sailSpeed: {
            halfSail: number;
            fullSail: number;
            travelSail: number;
        },
        // 货物-容器
        public readonly cargo: {
            cargoSlots: number;
            cargoMaxWeight: number;
        },
        public readonly required: Map<Material, number> | undefined,
        // 插槽
        public readonly slots: {
            attachement?: SlotWithGunports;
            frontWeapon?: SlotWithGunportsAcrossDecks;
            leftSideWeapon?: SlotWithGunportsAcrossDecks;
            rightSideWeapon?: SlotWithGunportsAcrossDecks;
            aftWeapon?: SlotWithGunportsAcrossDecks;
            auxiliaryWeapon?: SlotWithGunports;
            furniture?: SlotWithGunports;
            ultimate?: SlotWithGunports;
        },
        public readonly perks: string[],
        // 添加
        public readonly dateAdded: Date,
        // 最后更新时间
        public readonly lastUpdated: Date
    ) {
        return this
    }

    // Static method to create a Ship instance from raw data
    public static fromRawData(rawData: any): Ship {
        const season = rawData.season as keyof typeof Seasons;
        const contract = rawData.contract as keyof typeof Contracts;
        const required = rawData.required ? new Map<Material, number>() : undefined;
        if (required) {
            for (const [requiredKey, quantity] of Object.entries(rawData.required)) {
                const requiredMaterial = requiredKey as keyof typeof Materials;
                required.set(Materials[requiredMaterial], quantity as number);
            }
        }

        return new Ship(
            rawData.id,
            rawData.size,
            rawData.type,
            rawData.contract ? Contracts[contract] : undefined,
            rawData.blueprint ?? undefined,
            season ? Seasons[season] : undefined,
            rawData.hitpoints,
            rawData.braceStrength,
            rawData.braceStrengthRecovery,
            rawData.stamina ?? undefined,
            rawData.baseRank,
            rawData.requiredRank ?? undefined,
            rawData.contact ?? undefined,
            rawData.sailSpeed,
            rawData.cargo,
            required,
            {
                attachement: rawData.slots.attachement ?? undefined,
                frontWeapon: rawData.slots.frontWeapon ?? undefined,
                leftSideWeapon: rawData.slots.leftSideWeapon ?? undefined,
                rightSideWeapon: rawData.slots.rightSideWeapon ?? undefined,
                aftWeapon: rawData.slots.aftWeapon ?? undefined,
                auxiliaryWeapon: rawData.slots.auxiliaryWeapon ?? undefined,
                furniture: rawData.slots.furniture ?? undefined,
                ultimate: rawData.slots.ultimate ?? undefined
            },
            rawData.perks,
            new Date(rawData.dateAdded),
            new Date(rawData.lastUpdated)
        );
    }

    // Static method to load all ships from the JSON data
    public static loadShips(): Record<string, Ship> {
        const ships: Record<string, Ship> = {};
        for (const [key, value] of Object.entries(shipsData)) {
            ships[key] = Ship.fromRawData(value);
        }
        return ships;
    }
}

type Ships = {
    [K in keyof typeof shipsData]: Ship;
};

export const Ships: Ships = Ship.loadShips() as Ships;
