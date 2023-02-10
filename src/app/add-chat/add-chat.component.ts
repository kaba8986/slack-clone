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
  newChatName: string;
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
      .collection('users',  ref => ref.orderBy('lastName'))
      .valueChanges({ idField: 'customIdName' })
      .subscribe((data: any) => {
        this.allUser = data;
      })
  }


  save() {
    this.newChatName = this.sortStrings(this.currUser.userID, this.selectedUser.userID);     //create chatID from two chatPartnerIds

    if(this.currUser.userID == this.selectedUser.userID) {
      alert("For talking with yourself you don't need a messenger.")
    } else if(this.checkIfNameExists(this.newChatName))  {
      alert('Chatroom already exists!');
    } else {
      this.createNewChat();
      this.addChatToUser();
    }
  }

  checkIfNameExists(name: string) {
    let nameExists = false;
    this.currUser.chats.forEach((chat: any) => {
      if(chat.chatName == name) {
        nameExists = true;
      }
    })
    return nameExists;
  }


  createNewChat() {
    this.personalID = this.auth.currentUser.uid; //read personal Id from auth
    this.chat.chatMembers.push(this.personalID, this.selectedUser.userID); //add personal Id and chatPartner Id to new chat

    //add new Chat to firestore-db
    this.firestore
    .collection('chats')
    .doc(this.newChatName)
    .set(this.chat.toJSON())
    .then(() => {
      this.dialogRef.close();
    })
  }


  async addChatToUser() {
    let newChat = {
      'chatName': this.newChatName, 
      'chatMembers': [{ 
        'id': this.personalID, 
        'name': this.currUser.firstName + " " + this.currUser.lastName
      }, 
      { 
        'id': this.selectedUser.userID, 
        'name': this.selectedUser.firstName+ " " + this.selectedUser.lastName
      }]};
    const userRef = doc(this.db, 'users', this.personalID);
    const partnerRef = doc(this.db, 'users', this.selectedUser.userID);

    await updateDoc(userRef , {
      chats: arrayUnion(newChat)
    })
    await updateDoc(partnerRef , {
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

