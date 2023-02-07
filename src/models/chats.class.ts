export class Chat {
  chatName: string;
  chatInfo: string;
  messages: any;

  constructor(obj?: any) {
    this.chatName = obj ? obj.name : "";
    this.chatInfo = obj ? obj.name : "";
    this.messages = obj ? obj.messages : [];
  }

  public toJSON() {
    return {
      chatName: this.chatName,
      chatInfo: this.chatInfo,
      messages: this.messages,
    }
  }
}