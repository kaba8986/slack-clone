import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/models/chats.class';
import { Message } from 'src/models/message.class';
import { User } from 'src/models/user.class';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { arrayUnion, collection, doc, getDoc, getFirestore, query, updateDoc, where } from 'firebase/firestore';
import { MatDialog } from '@angular/material/dialog';
import { DeleteChatWarningComponent } from '../delete-chat-warning/delete-chat-warning.component';
import { EditChatMessageComponent } from '../edit-chat-message/edit-chat-message.component';


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
  chatPartner: any;
  auth = getAuth();
  db = getFirestore();


  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}



  async ngOnInit(): Promise<void> {
    //Get params or chatroomID from URL
    this.route.paramMap
    .subscribe( paramMap => {
      this.chatroomId = paramMap.get('chatId');
      this.getLoggedUser(); 
      this.getChatroom(); 
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
      // this.getChatroomName(data);
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

  /*
  async getChatroomName(data: any) {
    data.chatMembers.forEach((member: any) => {
      if(member.id != this.currUser.userID) {
        this.chatPartner.push(member.name);
      }
    })
  }
  */



  /**
   * Open delete chat warning dialog
   */
  openDeleteDialog(index: number) {
    const dialog = this.dialog.open(DeleteChatWarningComponent);
    dialog.componentInstance.messageIndex = index;
    dialog.componentInstance.chatroomId = this.chatroomId;
  }

  openEditDialog(index: number) {
    const dialog = this.dialog.open(EditChatMessageComponent);
    dialog.componentInstance.messageIndex = index;
    dialog.componentInstance.chatroomId = this.chatroomId;
  }

}
