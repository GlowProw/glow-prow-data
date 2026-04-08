import shipsData from '../data/ships.json';

import {ShipArchetype, ShipSize, SlotWithGunPorts, SlotWithGunPortsAcrossDecks} from "../types/ShipProperties";
import {Season, Seasons} from "./Seasons";
import {Contract, Contracts} from "./Contracts";
import {Material, Materials} from "./Materials";
import {BaseType} from "./BaseType";
import {Item, Items} from "./Items";

/**
 * 船只
 */
export class Ship extends BaseType {
    constructor(
        // 船只id
        public readonly id: string,
        // 尺寸
        public readonly size: ShipSize,
        // 类型
        public readonly type: string,
        // 船只定位
        public readonly archetype: ShipArchetype,
        // 合同
        public readonly contract: Contract | undefined,
        // 蓝图
        public readonly blueprint: string | string[] | undefined,
        // 线索
        public readonly obtainable: string | Item | Array<string | Item> | Array<Array<string | Item> | Item | string> | undefined,
        // 来源赛季
        public readonly bySeason: Season | undefined,
        // 血量
        public readonly hitPoints: number,
        // 增强力量
        public readonly braceStrength: number,
        public readonly braceStrengthRecovery: number,
        // 耐力
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
            attachement?: SlotWithGunPorts;
            frontWeapon?: SlotWithGunPortsAcrossDecks;
            leftSideWeapon?: SlotWithGunPortsAcrossDecks;
            rightSideWeapon?: SlotWithGunPortsAcrossDecks;
            aftWeapon?: SlotWithGunPortsAcrossDecks;
            auxiliaryWeapon?: SlotWithGunPorts;
            furniture?: SlotWithGunPorts;
            ultimate?: SlotWithGunPorts;
        },
        public readonly perks: string[],
        // 添加
        public readonly dateAdded: Date,
        // 最后更新时间
        public readonly lastUpdated: Date
    ) {
        super()
        this._entityType = Ship
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
        let obtainable = rawData.obtainable ?? undefined;
        if (Array.isArray(obtainable)) {
            const _obtainable = new Array<Array<string | Item> | string | Item>();
            for (const obtainableKey of rawData.obtainable as Array<keyof typeof Items>) {
                if (Array.isArray(obtainableKey)) {
                    const obtainableGroup = new Array<string | Item>();
                    for (const subKey of obtainableKey as Array<keyof typeof Items>) {
                        const obtainableItem = Items[subKey];
                        if (obtainableItem && obtainableItem.type === "chest") {
                            obtainableGroup.push(obtainableItem);
                        } else {
                            obtainableGroup.push(subKey);
                        }
                    }
                    _obtainable.push(obtainableGroup);
                } else {
                    const obtainableItem = Items[obtainableKey];
                    if (obtainableItem && obtainableItem.type === "chest") {
                        _obtainable.push(obtainableItem);
                    } else {
                        _obtainable.push(obtainableKey);
                    }
                }
            }
            obtainable = _obtainable;
        } else if (obtainable) {
            const obtainableItem = Items[rawData.obtainable as keyof typeof Items];
            if (obtainableItem && obtainableItem.type === "chest") {
                obtainable = obtainableItem;
            }
        }

        return new Ship(
            rawData.id,
            rawData.size,
            rawData.type,
            rawData.archetype,
            rawData.contract ? Contracts[contract] : undefined,
            rawData.blueprint ?? undefined,
            obtainable,
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
