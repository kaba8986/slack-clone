import { Component, Input } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/models/chats.class';
import { doc, updateDoc, arrayUnion, arrayRemove, getFirestore } from "firebase/firestore";
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.scss']
})
export class AddChatComponent {

  allUser: any = [];
  selectedUser;
  personalID;
  chatName: string;
  chat = new Chat();
  db = getFirestore();
  currUser: User;

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

      console.log('Add-Dialog-Log: ', this.currUser);

  }


  save() {
    this.createNewChat();
    this.addChatToUser();
  }


  createNewChat() {
    this.personalID = this.auth.currentUser.uid; //read personal Id from auth
    this.chat.chatPartners.push(this.personalID, this.selectedUser.userID); //add personal Id and chatPartner Id to new chat
    this.chatName = this.sortStrings(this.personalID, this.selectedUser.userID);     //create chatID from two chatPartnerIds

    //add new Chat to firestore-db
    
    this.firestore
    .collection('chats')
    .doc(this.chatName)
    .set(this.chat.toJSON())
    .then(() => {
      this.dialogRef.close();
    })
    
    /*
    this.firestore
      .collection('chats')
      .add(this.chat.toJSON())
      .then(() => {
        this.dialogRef.close();
      })
    */
  }


  async addChatToUser() {
    let newChat = {'chatName': this.chatName, 'chatPartner': this.selectedUser.firstName + " " + this.selectedUser.lastName};


    
    const userRef = doc(this.db, 'users', this.personalID);
    await updateDoc(userRef , {
      chats: arrayUnion(newChat)
    })
    
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

