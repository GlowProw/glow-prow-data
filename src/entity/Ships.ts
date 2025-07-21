import shipsData from '../data/ships.json';

import {ShipSize, SlotWithGunports, SlotWithGunportsAcrossDecks} from "../types/ShipProperties";
import {Season} from "./Seasons";
import {Contract} from "./Contracts";
import {Material} from "./Materials";

/**
 * 船只
 */
export declare class Ship {
    // id
    readonly id: string;
    // 尺寸
    readonly size: ShipSize;
    // 蓝图
    readonly bluePrint: string | string[] | undefined;
    // 来源赛季
    readonly bySeason: Season | undefined;
    // 血量
    readonly hitPoints: number;
    // 增强力量
    readonly braceStrength: number;
    readonly braceStrengthRecovery: number;
    // 耐力
    readonly stamina: number | undefined;
    // 基础分数
    readonly baseRank: number;
    // 基本分数
    readonly requiredRank: string | undefined;
    readonly contact: string | undefined;
    // 船速度
    readonly sailSpeed: {
        halfSail: number;
        fullSail: number;
        travelSail: number;
    };
    // 货物-容器
    readonly cargo: {
        cargoSlots: number;
        cargoMaxWeight: number;
    };
    // 所需材料
    readonly required: Map<Material, number> | undefined;
    // 插槽
    readonly slots: {
        attachement?: SlotWithGunports;
        frontWeapon?: SlotWithGunportsAcrossDecks;
        leftSideWeapon?: SlotWithGunportsAcrossDecks;
        rightSideWeapon?: SlotWithGunportsAcrossDecks;
        aftWeapon?: SlotWithGunportsAcrossDecks;
        auxiliaryWeapon?: SlotWithGunports;
        furniture?: SlotWithGunports;
        ultimate?: SlotWithGunports;
    };
    // 词条
    readonly perks: string[];
    // 添加时间
    readonly dateAdded: Date;
    // 最后更新时间
    readonly lastUpdated: Date;

    constructor(id: string, size: ShipSize, type: string, contract: Contract | undefined, blueprint: string | string[] | undefined, bySeason: Season | undefined, hitpoints: number, braceStrength: number, braceStrengthRecovery: number, stamina: number | undefined, baseRank: number, requiredRank: string | undefined, contact: string | undefined, sailSpeed: {
        halfSail: number;
        fullSail: number;
        travelSail: number;
    }, cargo: {
        cargoSlots: number;
        cargoMaxWeight: number;
    }, required: Map<Material, number> | undefined, slots: {
        attachement?: SlotWithGunports;
        frontWeapon?: SlotWithGunportsAcrossDecks;
        leftSideWeapon?: SlotWithGunportsAcrossDecks;
        rightSideWeapon?: SlotWithGunportsAcrossDecks;
        aftWeapon?: SlotWithGunportsAcrossDecks;
        auxiliaryWeapon?: SlotWithGunports;
        furniture?: SlotWithGunports;
        ultimate?: SlotWithGunports;
    }, perks: string[], dateAdded: Date, lastUpdated: Date);
}

type Ships = {
    [p: string]: Ship | unknown;
};
export const Ships: Ships = {
    ...Object.fromEntries(
        Object.entries(shipsData).map(([key, value]) => [key, value])
    )
};
export {};
