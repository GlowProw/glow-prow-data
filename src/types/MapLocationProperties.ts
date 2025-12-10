export type MapDifficultyType = 'coop' | 'pvp'

export interface MapDifficulty {
    type: MapDifficultyType
    minimumPeople: number
}

export class LootItem {
    data: any
    meta: any

    constructor(data: any, meta: any) {
        this.data = data
        this.meta = meta
    }
}
