import contractsData from "../data/contracts.json";

/**
 * 合同
 */
export declare class Contract {
    // 合同id
    readonly id: string;

    constructor(id: string);

    static loadContracts(): Record<string, Contract>;
}

type Contracts = {
    [p: string]: Contracts | unknown;
};

export const Contracts: Contracts = {
    ...Object.fromEntries(
        Object.entries(contractsData).map(([key, value]) => [key, value])
    )
};
export {};
