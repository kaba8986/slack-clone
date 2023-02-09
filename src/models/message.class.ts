export class Message {
    senderID: string;
    content: string;
    timestamp: Date;
    timeString: string;

    constructor(obj?: any) {
        this.senderID = obj ? obj.contsenderIDent : 'mySenderID'
        this.content = obj ? obj.content : ''
        this.timestamp = new Date();
        this.timeString = obj ? obj.content : ''
    }

    public toJSON() {
        return {
            senderID: this.senderID,
            content: this.content, 
            timestamp: this.timestamp,
            timeString: this.timeString
        }
    }
}