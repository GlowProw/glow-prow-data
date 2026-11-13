import setsData from '../data/sets.json';
import {SetType} from '../types/SetProperties';
import {BaseType} from "./BaseType";

type RawSet = {
    id: string;
    type: SetType;
    inofficial?: boolean;
};

const typedSetsData = setsData as Record<string, RawSet>;

/**
 * 集合
 */
export class Set extends BaseType {
    constructor(
        public readonly id: string,
        public readonly type: SetType,
        public readonly inofficial?: boolean
    ) {
        super()
        this._entityType = Set;
        this._entityTypeName = 'Set';
        return this
    }

    public static loadSets(): Record<string, Set> {
        const sets: Record<string, Set> = {};
        for (const [key, value] of Object.entries(typedSetsData)) {
            sets[key] = new Set(
                value.id,
                value.type as SetType,
                value.inofficial ?? false
            );
        }
        return sets;
    }
}

type Sets = {
    [K in keyof typeof setsData]: Set;
};

export const Sets = Set.loadSets() as Sets;
