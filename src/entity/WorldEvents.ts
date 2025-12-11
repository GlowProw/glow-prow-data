import worldEventsData from '../data/worldEvents.json';
import {WorldEventType} from '../types/WorldEventProperties';
import {Events} from './Events';
import {Factions} from './Factions';
import {BaseType, EntityType} from "./BaseType";

export class WorldEvent extends BaseType {
    constructor(
        // 事件id
        public readonly id: string,
        // 事件类型
        public readonly type: WorldEventType,
        // 事件所属阵营
        public readonly faction?: unknown,
        // 事件
        public readonly event?: unknown
    ) {
        super()
        this.entityType = EntityType.WorldEvent;
        return this
    }

    public static fromRawData(rawData: any): WorldEvent {
        const faction = rawData.faction as keyof typeof Factions;
        const event = rawData.event as keyof typeof Events;
        return new WorldEvent(
            rawData.id,
            rawData.type as WorldEventType,
            faction ? Factions[faction] : undefined,
            event ? Events[event] : undefined
        );
    }

    public static loadWorldEvents(): Record<string, WorldEvent> {
        const worldEvents: Record<string, WorldEvent> = {};
        for (const [key, value] of Object.entries(worldEventsData)) {
            worldEvents[key] = WorldEvent.fromRawData(value);
        }
        return worldEvents;
    }
}

type WorldEvents = {
    [K in keyof typeof worldEventsData]: WorldEvent;
};

export const WorldEvents = WorldEvent.loadWorldEvents() as WorldEvents;
