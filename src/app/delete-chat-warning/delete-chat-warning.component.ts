import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion, deleteField, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';

@Component({
  selector: 'app-delete-chat-warning',
  templateUrl: './delete-chat-warning.component.html',
  styleUrls: ['./delete-chat-warning.component.scss']
})
export class DeleteChatWarningComponent {

  chatroomId: string;
  messageIndex: number;
  db = getFirestore();
  allMessages: any;

  constructor(private firestore: AngularFirestore) {

  }

  async deleteMessage(index: number) {
    const messageRef = doc(this.db, "chats", this.chatroomId);
    const docSnap = await getDoc(messageRef);
    this.allMessages = docSnap.data();
    this.allMessages.messages.splice(index, 1);

    //delete old messages
    await updateDoc(messageRef, {
      messages: deleteField()
    });

    //upload new messages
    await updateDoc(messageRef, {
      messages: this.allMessages.messages
    });
  }
}
