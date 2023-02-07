export class Chat {
  name: string;
  nameId: string;
  creationDate: Date;
  messages: any;

  constructor(obj?: any) {
    this.name = obj ? obj.name : "";
    this.nameId = obj ? obj.name : "";
    this.creationDate = new Date();
    this.messages = obj ? obj.messages : [];
  }

  public toJSON() {
    return {
      name: this.name,
      nameId: this.nameId,
      creationDate: this.creationDate,
      messages: this.messages
    }
  }
}