export interface SlotNpcBase {
    data?: any
}

export interface SlotContainers {
    data?: any
}

export interface SlotWorker {
    data?: any
}

export type NpcSlots = {
    container?: SlotContainers | unknown
} | {
    worker: SlotWorker | unknown
} | {
    grill?: SlotGrillPorts | unknown,
} | {
    upgradeShips?: boolean,
    craftNewShips?: boolean,
    manageShips?: boolean,
    upgradeShipCosmetic?: boolean
}

export type NpcType = 'npc' | 'structure'

export const NpcCategorys = ["powder", "water", "helmTask", "task", "shop", "pvpMode", "factory", "mail", "warehouse", "objective"] as const;

export type NpcCategory = (typeof NpcCategorys)[number];

export type SlotGrillPorts = ''

