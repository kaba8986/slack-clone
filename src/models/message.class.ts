export class Message {
    senderID: string;
    content: string;
    timestamp: Date;

    constructor(obj?: any) {
        this.senderID = obj ? obj.contsenderIDent : 'mySenderID'
        this.content = obj ? obj.content : ''
        this.timestamp = new Date();
    }

    public toJSON() {
        return {
            senderID: this.senderID,
            content: this.content, 
            timestamp: this.timestamp
        }
    }
}