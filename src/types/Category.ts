export const CommodityCategories = [
    "localFaction", "megacorp", "kingpin", "theHelm", "summoningBell", "unique"
] as const;

export type CommodityCategory = (typeof CommodityCategories)[number];

export const MaterialCategories = [
    "raw", "refined", "specialized", "exotic", "helm", "scrap", "currency"
] as const;

export type MaterialCategory = (typeof MaterialCategories)[number];

export const MapLocationCategories = [
    "capitalSettlement", "outpost", "den", "foundry", "lumberyard", "militaryBase", "megafort",
    "settlement", "weaver", "shipwreck", "archive", "guardTower",
    "miscellaneous", "abaka", "coconut", "durian", "hemp", "jute", "linen", "ndizi", "ramie", "roselle",
    "screwpine", "sisal", "acacia", "greenheart", "iroko", "ironwood", "juniper", "mopane", "teak",
    "bogIron", "cobalt", "copper", "magnetite", "nickel", "pureIron", "zinc",
    "crocodile", "hippopotamus", "shark", "treasureMap", "shareLocation"
] as const;

export type MapLocationCategory = (typeof MapLocationCategories)[number];

export {
    MasteryCategories,
    type MasteryCategory
} from "./MasteryProperties";
