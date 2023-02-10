export class Thread {
    creatorName: string;
    originalDate:number;
    createdDate: any;
    createdTime: string;
    threadText: string;
    emojiReaction: string[];
    emojiCounter: string[];
    answers: string[];


    constructor(obj?:any) {
        this.creatorName = obj ? obj.creatorName : '';
        this.originalDate = obj ? obj.originalDate : '';
        this.createdDate = obj ? obj.createdDate : '';
        this.createdTime = obj ? obj.createdTime : '';
        this.threadText  = obj ? obj.threadText : '';
        this.emojiReaction = obj ? obj.emojiReaction : [];
        this.emojiCounter = obj ? obj.emojiCounter : [];
        this.answers = obj ? obj.answers : [];
    }

    public toJSON() {
        return {
            creatorName: this.creatorName,
            originalDate: this.originalDate,
            createdDate: this.createdDate,
            createdTime: this.createdTime,
            threadText: this.threadText,
            emojiReaction: this.emojiReaction,
            emojiCounter: this.emojiCounter,
            answers: this.answers,
        }
    }
}