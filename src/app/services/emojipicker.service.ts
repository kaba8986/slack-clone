import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EmojipickerComponent } from '../emojipicker/emojipicker.component';

@Injectable({
  providedIn: 'root'
})
export class EmojipickerService {

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EmojipickerComponent>) { }

  openDialog(): void {
     this.dialogRef = this.dialog.open(EmojipickerComponent);
  };

  addEmoji(event) {
    console.log(event.emoji.id);
    this.dialogRef.close()
  }

  handleSelection(event, channelId: string, threadId: string) {
    console.log(event.char);
    this.firestore.collection('channel').doc(channelId).collection('threads').doc(threadId).update({ 'emojiReaction': event.char, 'emojiCounter': 1 });

  }
}
