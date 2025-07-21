import eventsData from '../data/events.json';
import {Season} from './Seasons';

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
    [K in keyof typeof eventsData]: Event;
};
export declare const Events: Events;
export {};
