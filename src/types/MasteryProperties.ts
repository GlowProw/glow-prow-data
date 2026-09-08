export const MasteryCategories = [
    "offensive", "defensive", "support", "unique", "impetus"
] as const;

export type MasteryCategory = (typeof MasteryCategories)[number];

export const MasteryRoles = [
    "buff", "keyBuff", "seasonalPerk"
] as const;

export type MasteryRole = (typeof MasteryRoles)[number];

export interface MasteryNodePosition {
    x: number;
    y: number;
}

export interface MasteryEdge {
    id: string;
    source: string;
    target: string;
    type?: string;
    data?: any;
    style?: any;
}