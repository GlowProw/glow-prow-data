import questlogData from "../data/questlog.json";
import { BaseType } from "./BaseType";

export type QuestlogCategory =
    | 'johnScurlock'
    | 'admiralRahma'
    | 'theHubacTwins'
    | 'lucianHarrow'
    | 'vikramRajan'
    | 'liTianNing'
    | 'laPeste'
    | 'infamyQuest'
    | 'investigations'
    | 'clanOfFara'
    | 'compagnieRoyale'
    | 'confederationOfUngwana'
    | 'dominionOfRempah'
    | 'dutchMerchantCompany'
    | 'seaPeople'
    | 'theHelm'
    | 'rogues'
    | 'JohnScurlock'
    | 'AdmiralRahma'
    | 'SeaPeople'
    | 'ClanOfFara'
    | 'TheHelm'
    | 'Investigations'
    | (string & {});

/**
 * 剧情与任务日志
 */
export class Questlog extends BaseType {
    constructor(
        // 任务ID
        public readonly id: string,
        // 类别 (如 johnScurlock, admiralRahma, seaPeople, clanOfFara, theHelm, investigations 等)
        public readonly category: QuestlogCategory,
        // 创建日期
        public readonly dateAdded: Date | undefined,
        // 最后更新日期
        public readonly lastUpdated: Date | undefined,
        // 前置任务 (支持 Questlog 实体或 string ID)
        public readonly introduction?: (Questlog | string)[]
    ) {
        super();
        this._entityType = Questlog;
        this._entityTypeName = 'Questlog';
        return this;
    }

    public static fromRawData(key: string, rawData: any): Questlog {
        return new Questlog(
            rawData.id || key,
            (rawData.category || '') as QuestlogCategory,
            rawData.dateAdded ? new Date(rawData.dateAdded) : undefined,
            rawData.lastUpdated ? new Date(rawData.lastUpdated) : undefined,
            rawData.introduction || undefined
        );
    }

    public static loadQuestlogs(): Record<string, Questlog> {
        const questlogs: Record<string, Questlog> = {};
        for (const [key, value] of Object.entries(questlogData)) {
            questlogs[key] = Questlog.fromRawData(key, value);
        }

        // 解析前置任务中的字符串引用为 Questlog 实体
        for (const quest of Object.values(questlogs)) {
            if (quest.introduction && quest.introduction.length > 0) {
                const resolved = quest.introduction.map(item => {
                    if (typeof item === 'string' && questlogs[item]) {
                        return questlogs[item];
                    }
                    return item;
                });
                (quest as { introduction?: (Questlog | string)[] }).introduction = resolved;
            }
        }

        return questlogs;
    }
}

type Questlogs = {
    [K in keyof typeof questlogData]: Questlog;
};

export const Questlogs: Questlogs = Questlog.loadQuestlogs() as Questlogs;
export const Quests = Questlogs;
export const Quest = Questlog;
