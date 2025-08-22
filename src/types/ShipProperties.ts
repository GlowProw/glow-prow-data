export const ShipSizes = ["extraSmall", "small", "medium", "large"] as const;

export type ShipSize = (typeof ShipSizes)[number];

export type SlotWithGunPorts = [number, number];

export type SlotWithGunPortsAcrossDecks = [
    number, {
        top: number;
        lower?: number
    }
];

export const ShipArchetypes = ["tank", "dps", "support"] as const;

export type ShipArchetype = (typeof ShipArchetypes)[number];
