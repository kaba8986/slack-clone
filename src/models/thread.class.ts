export class Channel {
    creatorName: string;
    createdDate: string;
    threadText: string;
    emojiReaction: string[];
    emojiCounter: string[];
    answers: string[];


    constructor(obj?:any) {
        this.creatorName = obj ? obj.channelName : '';
        this.createdDate = obj ? obj.createdDate : '';
        this.threadText  = obj ? obj.threadText : '';
        this.emojiReaction = obj ? obj.emojiReaction : '';
        this.emojiCounter = obj ? obj.emojiCounter : '';
        this.answers = obj ? obj.answers : '';
    }

    public toJSON() {
        return {
            channelName: this.creatorName,
            createdDate: this.createdDate,
            threadText: this.threadText,
            emojiReaction: this.emojiReaction,
            emojiCounter: this.emojiCounter,
            answers: this.answers,
        }
    }
}