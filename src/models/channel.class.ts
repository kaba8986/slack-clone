export class Channel {
    channelName: string;
    description: string;
    createdDate: number;

    constructor(obj?) {
        this.channelName = obj?.channelName || '';
        this.description = obj?.description || '';
        this.createdDate = obj.createdDate || '';
    }

    public toJSON() {
        return {
            channelName: this.channelName,
            description: this.description,
            createdDate: this.createdDate,
        }
    }
}