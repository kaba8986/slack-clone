import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/models/chats.class';


@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.scss']
})
export class AddChatComponent {

  allUser: any = [];
  selectedUserID;
  personalID;
  chat = new Chat();

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<AddChatComponent>,
    private auth: Auth
    ) {

  }

  ngOnInit(): void {
    this.firestore
    .collection('users')
    .valueChanges({ idField: 'customIdName'})
    .subscribe((data: any) => {
      this.allUser = data;
    })
  }

  saveNewChat() {
    //read personal Id from auth
    this.personalID = this.auth.currentUser.uid;
    //add personal Id and chatPartner Id to new chat
    this.chat.chatPartners.push(this.personalID, this.selectedUserID);
    
    //create chatID from two chatPartnerIds
    let chatName = this.sortStrings(this.personalID, this.selectedUserID);

    console.log('Chatpartners: ', this.chat.chatPartners);
    console.log('ChatName: ', chatName);
  

    //add new Chat to firestore-db
    this.firestore
    .collection('chats')
    .add(this.chat.toJSON())
    .then(() => {
      this.dialogRef.close();
    })


  }

  sortStrings(a: string, b: string) {
    let stringName = "";
    if(a >= b) {
      stringName = a.concat("-", b);
    } else {
      stringName = b.concat("-", a);
    }
    return stringName;
  }

}

