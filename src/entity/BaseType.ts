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
     * 显式指定的实体类型名称
     * 用于防止打包构建工具（Rollup / Vite / esbuild）因 JS 全局保留字冲突将 Set / Event 重命名为 Set2 / Event2
     */
    protected _entityTypeName?: string;

    /**
     * Entity character
     * Item._typeStringName == 'Item'
     */
    public get _typeStringName(): string {
        if (this._entityTypeName) return this._entityTypeName;
        const raw = this._entityType?.name ?? (typeof this._entityType === 'string' ? this._entityType : '');
        if (raw) {
            // 自动剔除打包器为避免全局内置标识符冲突附加的数字/符号后缀 (如 Set2 -> Set, Event$1 -> Event)
            return raw.replace(/[\d$_]+$/, '') || raw;
        }
        return 'Unknown';
    }

    /**
     * Check if it is of a specific type
     * Item.isType(Item) return true
     * Item.isType([Npc, Item]) return true
     * Item.isType(['Item', 'item'])
     */
    public isType(type: any[] | string[] | any): boolean {
        if (this._entityType == null) return false;

        const currentName = this._typeStringName.toLowerCase();
        if (Array.isArray(type)) {
            return type.some(item => {
                if (item === this._entityType) return true;
                if (typeof item === 'string') return item.toLowerCase() === currentName;
                if (item?.name && typeof item.name === 'string') {
                    return item.name.replace(/[\d$_]+$/, '').toLowerCase() === currentName;
                }
                return false;
            });
        } else {
            if (this._entityType === type) return true;
            if (typeof type === 'string') return currentName === (type as string).toLowerCase();
            if (type?.name && typeof type.name === 'string') {
                return type.name.replace(/[\d$_]+$/, '').toLowerCase() === currentName;
            }
            return false;
        }
    }
}
