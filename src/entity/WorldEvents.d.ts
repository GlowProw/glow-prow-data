import worldEventsData from '../data/worldEvents.json';
import {WorldEventType} from '../types/WorldEventProperties';
import {Faction} from './factions';

export declare class WorldEvent {
    readonly id: string;
    readonly type: WorldEventType;
    readonly faction?: Faction | undefined;

    constructor(id: string, type: WorldEventType, faction?: Faction | undefined);

    static fromRawData(rawData: any): WorldEvent;

    static loadWorldEvents(): Record<string, WorldEvent>;
}

type WorldEvents = {
    [p: string]: WorldEvent | unknown;
};
export const WorldEvents: WorldEvents = {
    ...Object.fromEntries(
        Object.entries(worldEventsData).map(([key, value]) => [key, value])
    )
};
export {};
