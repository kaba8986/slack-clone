export class Answer {
    answerName: string;
    answerGender: string;
    originalDate:number;
    createdDate: any;
    createdTime: string;
    answerText: string;
    emojiReaction: string[];
    emojiCounter: string[];


    constructor(obj?:any) {
        this.answerName = obj ? obj.channelName : '';
        this.answerGender = obj ? obj.answerGender: '';
        this.originalDate = obj ? obj.originalDate : '';
        this.createdDate = obj ? obj.createdDate : '';
        this.createdTime = obj ? obj.createdTime : '';
        this.answerText  = obj ? obj.threadText : '';
        this.emojiReaction = obj ? obj.emojiReaction : [];
        this.emojiCounter = obj ? obj.emojiCounter : [];
    }

    public toJSON() {
        return {
            answerName: this.answerName,
            answerGender: this.answerGender,
            originalDate: this.originalDate,
            createdDate: this.createdDate,
            createdTime: this.createdTime,
            answerText: this.answerText,
            emojiReaction: this.emojiReaction,
            emojiCounter: this.emojiCounter,
        }
    }
}