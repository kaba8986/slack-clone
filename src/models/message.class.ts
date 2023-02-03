export class Message{
    firstName: string;
    lastName: string;
    content: string;
    creationDate: Date;
    creationDateAsString: string;

    constructor(obj?: any){
        this.firstName = obj ? obj.firstName : ''
        this.lastName = obj ? obj.lastName : ''
        this.content = obj ? obj.content : ''
        this.creationDate = new Date();
        this.creationDateAsString = obj ? obj.creationDateAsString : ''
    }

    public toJson(){
        return{
            firstName: this.firstName,
            lastName: this.lastName,
            content: this.content,
            creationDate: this.creationDate, 
            creationDateAsString: this.creationDateAsString, 
        }
    }
}