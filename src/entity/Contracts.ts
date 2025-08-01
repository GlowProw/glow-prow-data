import contractsData from "../data/contracts.json";

/**
 * 合同
 */
export class Contract {
    constructor(
        // 合同id
        public readonly id: string
    ) {}

    public static loadContracts(): Record<string, Contract> {
        const contracts: Record<string, Contract> = {};
        for (const [key, value] of Object.entries(contractsData)) {
            contracts[key] = new Contract(
                value.id
            );
        }
        return contracts;
    }
}

type Contracts = {
    [K in keyof typeof contractsData]: Contract;
};

export const Contracts = Contract.loadContracts() as Contracts;
