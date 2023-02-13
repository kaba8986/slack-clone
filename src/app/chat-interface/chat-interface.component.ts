import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { Message } from 'src/models/message.class';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss']
})
export class ChatInterfaceComponent {

  @ViewChild('fileUploader') fileUploader:ElementRef;

  toggled: boolean = false;
  message = new Message();
  @Input () chatroomId: string;
  @Input () currUser: User;
  db = getFirestore();


  formatText(style: string) {
    document.execCommand(style);
  }

  /**
   * Show Filename from uploaded File
   * @param event 
   */
  showFilename(event) {
    let outputField = document.getElementById( 'uploads' );
    let input = event.srcElement;
    let fileName = input.files[0].name;
    outputField.textContent = fileName;
  }

  /**
   * Delete uploaded file 
   */
  resetUpload() {
    this.fileUploader.nativeElement.value = null;
    document.getElementById( 'uploads' ).textContent = "";
  }


  /**
   * Emoji-Picker
   * @param event 
   */
  handleSelection(event) {
    this.message.content += event.char;
    this.toggled = !this.toggled;
  }



  /**
   * Creates a Message - Create senderID, transform timeStamp to timeString 
   * and push new Message to currChatroom
   */
  async send() {
    this.message.senderID = this.currUser.userID;
    this.message.senderName = this.currUser.firstName  + " " + this.currUser.lastName;
    this.message.timeString = this.message.timestamp.toLocaleTimeString("en-GB");
    // this.message.content = document.getElementById('input-field').textContent;

    const messageRef = doc(this.db, 'chats', this.chatroomId);
    await updateDoc(messageRef , {
      messages: arrayUnion(this.message.toJSON())
    })
  }

}
