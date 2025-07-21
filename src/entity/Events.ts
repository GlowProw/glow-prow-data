import {Season} from './Seasons';
import eventsData from "../data/events.json";

/**
 * 事件
 */
export declare class Event {
    // 事件id
    readonly id: string;
    // 赛季
    readonly seasons: Season[];

    constructor(id: string, seasons: Season[]);

    static loadEvents(): Record<string, Event>;
}

type Events = {
    [p: string]: Events | unknown;
};
export const Events: Events = {
    ...Object.fromEntries(
        Object.entries(eventsData).map(([key, value]) => [key, value])
    )
};
export {};
