export class Message {
    senderID: string;
    senderName: string;
    content: string;
    timestamp: Date;
    timeString: string;

    constructor(obj?: any) {
        this.senderID = obj ? obj.senderID : 'mySenderID';
        this.senderName = obj ? obj.senderName : 'mySenderName';
        this.content = obj ? obj.content : '';
        this.timestamp = new Date();
        this.timeString = obj ? obj.content : '';
    }

    public toJSON() {
        return {
            senderID: this.senderID,
            senderName: this.senderName,
            content: this.content, 
            timestamp: this.timestamp,
            timeString: this.timeString
        }
    }
}