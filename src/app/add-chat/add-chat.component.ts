import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Chat } from 'src/models/chats.class';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.scss']
})
export class AddChatComponent {

  allUser: any = [];
  selectedUser;
  chat = new Chat();

  constructor(
    private firestore: AngularFirestore,
    public dialogRef: MatDialogRef<AddChatComponent>
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
    this.chat.name = this.selectedUser.firstName + " " + this.selectedUser.lastName;
    this.chat.nameId = this.selectedUser.customIdName;

    console.log(this.chat);

    this.firestore
    .collection('chatrooms')
    .add(this.chat.toJSON())
    .then(() => {
      this.dialogRef.close();
    })
  }

}

