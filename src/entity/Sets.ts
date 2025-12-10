import setsData from '../data/sets.json';
import {SetType} from '../types/SetProperties';
import {BaseType} from "./BaseType";

/**
 * 集合
 */
export class Set extends BaseType {
    constructor(
        public readonly id: string,
        public readonly type: SetType
    ) {
        super()
        this.entityType = Set;
        return this
    }

    public static loadSets(): Record<string, Set> {
        const sets: Record<string, Set> = {};
        for (const [key, value] of Object.entries(setsData)) {
            sets[key] = new Set(
                value.id,
                value.type as SetType
            );
        }
        return sets;
    }
}

type Sets = {
    [K in keyof typeof setsData]: Set;
};

export const Sets = Set.loadSets() as Sets;
