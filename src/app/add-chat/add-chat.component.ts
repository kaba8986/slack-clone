import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/models/chats.class';
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";


@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.scss']
})
export class AddChatComponent {

  allUser: any = [];
  selectedUserID;
  personalID;
  chatName: string;
  chat = new Chat();

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<AddChatComponent>,
    private auth: Auth
  ) {

  }

  ngOnInit(): void {
    //Load all User from Users-collection
    this.firestore
      .collection('users')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((data: any) => {
        this.allUser = data;
      })
  }

  // Initialize Firebase



  save() {
    this.createNewChat();
    this.addChatToUser();
  }


  createNewChat() {
    this.personalID = this.auth.currentUser.uid; //read personal Id from auth
    this.chat.chatPartners.push(this.personalID, this.selectedUserID.userID); //add personal Id and chatPartner Id to new chat
    this.chatName = this.sortStrings(this.personalID, this.selectedUserID.userID);     //create chatID from two chatPartnerIds

    //add new Chat to firestore-db
    
    this.firestore
      .collection('chats')
      .add(this.chat.toJSON())
      .then(() => {
        this.dialogRef.close();
      })
  }


  addChatToUser() {
   
    this.firestore
      .collection('users')
      .doc(this.personalID)
      .set(
        { chats: [{'chatName': this.chatName, 'chatPartner': this.selectedUserID.firstName + " " + this.selectedUserID.lastName}]},
        { merge: true }
      )
    
  }


  sortStrings(a: string, b: string) {
    let stringName = "";
    if (a >= b) {
      stringName = a.concat("-", b);
    } else {
      stringName = b.concat("-", a);
    }
    return stringName;
  }

}

