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
    [K in keyof typeof contractsData]: Contract;
};
export declare const Contracts: Contracts;
export {};
//# sourceMappingURL=contracts.d.ts.map
