export class Channel {
    channelName: string;
    description: string;
    createdDate: number;

    constructor(obj?) {
        this.channelName = obj ? obj.channelName : '';
        this.description = obj ? obj.description : '';
        this.createdDate = obj ? obj.createdDate : '';
    }

    public toJSON() {
        return {
            channelName: this.channelName,
            description: this.description,
            createdDate: this.createdDate,
        }
    }
}