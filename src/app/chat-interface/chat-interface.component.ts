import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore';
import { Message } from 'src/models/message.class';
import { User } from 'src/models/user.class';
import { Thread } from 'src/models/thread.class';
import { Answer } from 'src/models/answer.class';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss']
})
export class ChatInterfaceComponent {

  constructor(
    private firestore: AngularFirestore,
    private auth: Auth,
    public as: AuthService,
  ) { }

  @ViewChild('fileUploader') fileUploader: ElementRef;

  toggled: boolean = false;
  message = new Message();
  thread = new Thread();
  answer = new Answer();
  date = new Date().getTime();
  @Input() chatroomId: string;
  @Input() currUser: User;
  @Input() channelId: string;
  @Input() threadId: string;
  @Input() allAnswers:any;
  db = getFirestore();

  //////////////// new editor - start /////////////////////

  quillConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript

      [{ 'color': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],

      ['link', 'image', 'video'],                         // link and image, video
      ['emoji']
    ],
    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
  };

  //////////////// new editor - end/////////////////////

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
  send() {
    if (this.chatroomId) {
      this.chatmassage();
    } else if (this.channelId && !this.threadId) {
      this.channelmassage();
    } else {
      this.threadmassage();
    }
  }

  async chatmassage() {
    this.message.senderID = this.currUser.userID;
    this.message.senderName = this.currUser.firstName + " " + this.currUser.lastName;
    this.message.timeString = this.message.timestamp.toLocaleTimeString("en-GB");
    // this.message.content = document.getElementById('input-field').textContent;

    const messageRef = doc(this.db, 'chats', this.chatroomId);
    await updateDoc(messageRef, {
      messages: arrayUnion(this.message.toJSON())
    })
    console.log(typeof this.message.timestamp);
    console.log(typeof this.message.timeString);
    this.message.content = "";
  }

  channelmassage() {
    this.getThreadCreator();
    this.getText();
    this.convertThreadDate(this.date);
    this.firestore.collection('channel').doc(this.channelId).collection('threads').add(this.thread.toJSON()).then((result) => {
      console.log(result);
    })
  }

  getThreadCreator() {
    this.thread.creatorName = this.auth.currentUser.email; //email muss gegen DisplayName ausgetauscht werden
    this.thread.creatorGender = this.as.userGender;
  }

  getText() {
    if (!this.threadId) {
      this.thread.threadText = this.message.content;
    } else {
      this.answer.answerText = this.message.content;
    }
  }

  convertThreadDate(timestamp: number) {
    let date = new Date(timestamp);
    this.thread.originalDate = new Date().getTime();
    this.thread.createdDate = date.toLocaleDateString();
    this.thread.createdTime = date.toLocaleTimeString();
  }

  threadmassage() {
    this.getAnswerCreator();
    this.getText();
    this.convertAnswerDate(this.date);
    console.log(this.allAnswers);
    this.allAnswers.push(this.answer.toJSON());
    console.log(this.allAnswers);
    this.firestore.collection('channel').doc(this.channelId).collection('threads').doc(this.threadId).update({ 'answers': this.allAnswers });
  }

  getAnswerCreator() {
    this.answer.answerName = this.auth.currentUser.email; //email muss gegen DisplayName ausgetauscht werden
    this.answer.answerGender = this.as.userGender;
  }

  convertAnswerDate(timestamp: number) {
    let date = new Date(timestamp);
    this.answer.originalDate = new Date().getTime();
    this.answer.createdDate = date.toLocaleDateString();
    this.answer.createdTime = date.toLocaleTimeString();
  }

}
