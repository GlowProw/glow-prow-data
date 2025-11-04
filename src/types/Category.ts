export const CommodityCategories = [
    "localFaction", "megacorp", "kingpin", "theHelm", "summoningBell", "unique"
] as const;

export type CommodityCategory = (typeof CommodityCategories)[number];

export const MaterialCategories = [
    "raw", "refined", "specialized", "exotic", "helm", "scrap", "currency"
] as const;

export type MaterialCategory = (typeof MaterialCategories)[number];

export const MapLocationCategories = [
    "capitalSettlement", "outpost", "den", "foundry", "lumberyard", "militaryBase", "megafort"
] as const;

export type MapLocationCategory = (typeof MapLocationCategories)[number];
