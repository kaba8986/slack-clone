import { Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { arrayUnion, deleteField, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { Message } from 'src/models/message.class';

@Component({
  selector: 'app-edit-chat-message',
  templateUrl: './edit-chat-message.component.html',
  styleUrls: ['./edit-chat-message.component.scss']
})
export class EditChatMessageComponent {

  @ViewChild('fileUploader') fileUploader: ElementRef;

  messageIndex: number;
  chatroomId: string;
  toggled: boolean = false;
  message = new Message();
  allMessages: any;
  db = getFirestore();

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<EditChatMessageComponent>
  ) { }

  ngOnInit(): void {
    this.getData();
  }

    //////////////// new editor - start /////////////////////

    quillConfig = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
  
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  
        [{ 'color': [] }],          // dropdown with defaults from theme
        [{ 'align': [] }],
  
        ['link', 'image', 'video']                         // link and image, video
      ]
    };
  
    //////////////// new editor - end/////////////////////

  async getData() {
    const chatRef = doc(this.db, 'chats', this.chatroomId);
    const docSnap = await getDoc(chatRef);
    this.setMessage(docSnap.data());
  }

  setMessage(data: any) {
    this.message = new Message(data.messages[this.messageIndex]);
    console.log(this.message);
  };



  formatText(style: string) {
    document.execCommand(style);
  }

  /**
   * Show Filename from uploaded File
   * @param event 
   */
  showFilename(event) {
    let outputField = document.getElementById('uploads');
    let input = event.srcElement;
    let fileName = input.files[0].name;
    outputField.textContent = fileName;
  }

  /**
   * Delete uploaded file 
   */
  resetUpload() {
    this.fileUploader.nativeElement.value = null;
    document.getElementById('uploads').textContent = "";
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
  async saveMessage(index: number) {
    const messageRef = doc(this.db, "chats", this.chatroomId);
    const docSnap = await getDoc(messageRef);
    this.allMessages = docSnap.data();
    this.allMessages.messages.splice(index, 1);
    this.allMessages.messages.splice(index, 0, this.message.toJSON());

    console.log(this.allMessages.messages);

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
