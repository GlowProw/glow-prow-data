import {Season, Seasons} from './Seasons';
import eventsData from "../data/events.json";

/**
 * 事件
 */
export class Event {
    constructor(
        // 事件id
        public readonly id: string,
        // 事件赛季
        public readonly bySeasons: Season[]
    ) {
    }

    public static loadEvents(): Record<string, Event> {
        const events: Record<string, Event> = {};
        for (const [key, value] of Object.entries(eventsData)) {
            const seasons: Season[] = value.seasons.map((_season: string) => {
                const season = _season as keyof typeof Seasons;
                return Seasons[season];
            });
            events[key] = new Event(
                value.id,
                seasons
            );
        }
        return events;
    }
}

type Events = {
    [K in keyof typeof eventsData]: Event;
};

export const Events = Event.loadEvents() as Events;
