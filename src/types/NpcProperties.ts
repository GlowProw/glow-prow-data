export interface SlotNpcBase {
    data?: any
}

export type NpcType = 'npc' | 'structure'

export const NpcCategorys = ["powder", "water", "helmTask", "task", "shop", "pvpMode", "factory", "mail", "warehouse", "objective"] as const;

export type NpcCategory = (typeof NpcCategorys)[number];

export type SlotGrillPorts = ''
