export declare const ShipSizes: readonly ["extraSmall", "small", "medium", "large"];
export type ShipSize = (typeof ShipSizes)[number];
export type SlotWithGunports = [number, number];
export type SlotWithGunportsAcrossDecks = [
    number,
    {
        top: number;
        lower?: number;
    }
];
//# sourceMappingURL=ShipProperties.d.ts.map