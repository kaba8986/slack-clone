import { Message } from "./message.class";

export class Chat {
  chatPartners: any;
  creationDate: Date;
  messages: any;

  constructor(obj?: any) {
    this.chatPartners = obj ? obj.chatPartners : [];
    this.creationDate = new Date();
    this.messages = obj ? obj.messages : [];
  }

  public toJSON() {
    return {
      chatPartners: this.chatPartners,
      creationDate: this.creationDate,
      messages: this.messages
    }
  }
}