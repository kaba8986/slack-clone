import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/models/chats.class';
import { Message } from 'src/models/message.class';
import { User } from 'src/models/user.class';
import { LoggedUserService } from '../services/logged-user.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @ViewChild('fileUploader') fileUploader:ElementRef;

  message = new Message();
  chatroomId: string;
  currUser = new User();
  currChatroom = new Chat();
  auth = getAuth();
  db = getFirestore();


  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private log: LoggedUserService
  ) {}



  ngOnInit(): void {
    //Get params or chatroomID from URL
    this.route.paramMap
    .subscribe( paramMap => {
      this.chatroomId = paramMap.get('chatId');
      this.getChatroom(); 
      this.getLoggedUser(); 
    })
  }

  
  /**
   * Load current Chatroom with chatroomId from URL params
   */
  getChatroom() {
    this.firestore
    .collection('chats')
    .doc(this.chatroomId)
    .valueChanges()
    .subscribe((data: any) => {
      this.currChatroom = new Chat(data);
    })
  }


  /**
   * Check if a User is logged in - if yes, load currUser from Firestore with authID
   */
  getLoggedUser()  {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.firestore
        .collection('users')
        .doc(user.uid)
        .valueChanges()
        .subscribe((data: any) => {
          this.currUser  = data;
        })
      } 
    });
  }


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
   * Creates a Message - Create senderID, transform timeStamp to timeString 
   * and push new Message to currChatroom
   */
  async send() {
    this.message.senderID = this.currUser.firstName  + " " + this.currUser.lastName;
    this.message.timeString = this.message.timestamp.toLocaleTimeString("en-GB");
    // this.message.content = document.getElementById('input-field').textContent;

    const messageRef = doc(this.db, 'chats', this.chatroomId);
    await updateDoc(messageRef , {
      messages: arrayUnion(this.message.toJSON())
    })
  }


  /**
   * Open delete chat warning dialog
   */
  openDeleteDialog() {

  }

}
