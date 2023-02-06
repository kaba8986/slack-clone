import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-add-chat',
  templateUrl: './add-chat.component.html',
  styleUrls: ['./add-chat.component.scss']
})
export class AddChatComponent {

  allUser: any = [];
  selectedUserId;
  newChat = new User();

  constructor(
    private firestore: AngularFirestore,
    private dialogRef: MatDialogRef<AddChatComponent>
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
    console.log(this.selectedUserId);
  }

}

