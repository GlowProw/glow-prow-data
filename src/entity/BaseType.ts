/**
 * 基础类型
 */
export abstract class BaseType {
    /**
     * Entity
     * Item._entityType === Item
     */
    protected _entityType: null | any;

    /**
     * Entity character
     * Item._typeStringName == 'Item'
     */
    public get _typeStringName(): string {
        return this._entityType?.name ?? this._entityType ?? 'Unknown';
    }

    /**
     * Check if it is of a specific type
     * Item.isType(Item) return true
     * Item.isType([Npc, Item]) return true
     * Item.isType(['Item', 'item'])
     */
    public isType(type: any[] | string[]): boolean {
        if (this._entityType == null) return false

        if (Array.isArray(type)) {
            return type.includes(this._entityType) || type.map(i => i.toLocaleLowerCase()).includes(this._entityType?.name.toLocaleLowerCase());
        } else {
            return this._entityType === type;
        }
    }
}
