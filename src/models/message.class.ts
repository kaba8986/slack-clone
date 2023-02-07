export class Message{
    content: string;
    creationDate: Date;
    creationDateAsString: string;

    constructor(obj?: any){
        this.content = obj ? obj.content : ''
        this.creationDate = new Date();
        this.creationDateAsString = obj ? obj.creationDateAsString : ''
    }

    public toJSON(){
        return{
            content: this.content,
            creationDate: this.creationDate, 
            creationDateAsString: this.creationDateAsString, 
        }
    }
}