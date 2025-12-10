import {BluePrint} from "./BluePrint";
import {Commodity} from "./Commodities";
import {Contract} from "./Contracts";
import {Cosmetic} from "./Cosmetics";
import {EmpireSkill} from "./EmpireSkills";
import {Faction} from "./Factions";
import {Item} from "./Items";
import {MapLocation} from "./MapLocations";
import {Material} from "./Materials";
import {Modification} from "./Modifications";
import {Npc} from "./Npcs";
import {Region} from "./Regions";
import {Season} from "./Seasons";
import {Set} from "./Sets";
import {Ship} from "./Ships";
import {Territory} from "./Territories";
import {TreasureMap} from "./TreasureMaps";
import {Ultimate} from "./Ultimates";
import {WorldEvent} from "./WorldEvents";

export type Types =
    | typeof BluePrint
    | typeof Commodity
    | typeof Contract
    | typeof Cosmetic
    | typeof EmpireSkill
    | typeof Faction
    | typeof Item
    | typeof MapLocation
    | typeof Material
    | typeof Modification
    | typeof Npc
    | typeof Region
    | typeof Season
    | typeof Set
    | typeof Ship
    | typeof Territory
    | typeof TreasureMap
    | typeof Ultimate
    | typeof WorldEvent;

export type TypeNames =
    | 'BluePrint'
    | 'Commodity'
    | 'Contract'
    | 'Cosmetic'
    | 'EmpireSkill'
    | 'Faction'
    | 'Item'
    | 'MapLocation'
    | 'Material'
    | 'Modification'
    | 'Npc'
    | 'Region'
    | 'Season'
    | 'Set'
    | 'Ship'
    | 'Territory'
    | 'TreasureMap'
    | 'Ultimate'
    | 'WorldEvent';

/**
 * 基础类型
 */
export abstract class BaseType {
    protected entityType: Types | null = null;

    public get _type(): Types | null {
        return this._typeEntity;
    }

    /**
     * Entity
     * Item._type === Item
     * or
     * Item._typeEntity === Item
     */
    public get _typeEntity(): Types | null {
        return this.entityType;
    }

    /**
     * Entity character
     * Item._typeStringName == 'Item'
     */
    public get _typeStringName(): string {
        return this.entityType?.name ?? 'Unknown';
    }

    /**
     * Check if it is of a specific type
     */
    public isType<T extends Types | Types[]>(typeOrTypes: T): this is
        T extends Types ? InstanceType<T> :
            T extends Types[] ? InstanceType<T[number]> :
                never {

        if (Array.isArray(typeOrTypes)) {
            return typeOrTypes.some(type => this.entityType === type);
        } else {
            return this.entityType === typeOrTypes;
        }
    }
}
