export enum EntityType {
    BluePrint = 'BluePrint',
    Commodity = 'Commodity',
    Contract = 'Contract',
    Cosmetic = 'Cosmetic',
    EmpireSkill = 'EmpireSkill',
    Event = 'Event',
    Faction = 'Faction',
    Item = 'Item',
    MapLocation = 'MapLocation',
    Material = 'Material',
    Modification = 'Modification',
    Npc = 'Npc',
    Region = 'Region',
    Season = 'Season',
    Set = 'Set',
    Ship = 'Ship',
    Territory = 'Territory',
    TreasureMap = 'TreasureMap',
    Ultimate = 'Ultimate',
    WorldEvent = 'WorldEvent'
}

/**
 * 基础类型
 */
export abstract class BaseType {
    protected entityType: EntityType | null = null;

    public get _type(): EntityType | null {
        return this._typeEntity;
    }

    /**
     * Entity
     * Item._type === Item
     * or
     * Item._typeEntity === Item
     */
    public get _typeEntity(): EntityType | null {
        return this.entityType;
    }

    /**
     * Entity character
     * Item._typeStringName == 'Item'
     */
    public get _typeStringName(): string {
        return this.entityType ?? 'Unknown';
    }

    /**
     * Check if it is of a specific type
     */
    public isType(type: EntityType | EntityType[]): boolean {
        if (this.entityType == null) return false

        if (Array.isArray(type)) {
            return type.includes(this.entityType);
        } else {
            return this.entityType === type;
        }
    }

}
