import { Message } from "./message.class";

export class Chat {
  chatMembers: any;
  creationDate: Date;
  messages: any;

  constructor(obj?: any) {
    this.chatMembers = obj ? obj.chatMembers : [];
    this.creationDate = new Date();
    this.messages = obj ? obj.messages : [];
  }

  public toJSON() {
    return {
      chatMembers: this.chatMembers,
      creationDate: this.creationDate,
      messages: this.messages
    }
  }
}