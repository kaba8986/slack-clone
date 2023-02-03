import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Channel } from 'src/models/channel.class';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.scss']
})
export class AddChannelComponent {

  channel = new Channel();
  date = new Date();

  constructor(public dialogRef: MatDialogRef<AddChannelComponent>, private firestore: AngularFirestore) { }


  saveChannel() {
    this.channel.createdDate = this.date.getTime();

    //Abfrage einbauen, ob Channel-ID schon besteht. wenn ja, Anfrage abbrechen, wenn nein, dann Channel erstellen
    this.firestore.collection('channel').doc(this.channel.channelName).set(this.channel.toJSON());


    this.dialogRef.close();
  }

}
