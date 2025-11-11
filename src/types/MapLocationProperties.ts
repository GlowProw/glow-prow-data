export type MapDifficultyType = 'coop' | 'pvp'

export interface MapDifficulty {
    type: MapDifficultyType
    minimumPeople: number
}
