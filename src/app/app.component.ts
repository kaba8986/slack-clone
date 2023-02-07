import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AddChatComponent } from './add-chat/add-chat.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slack-clone';

  dataSource: any;
  treeControl: any;
  allChannels: any = [];
  newarr: any = [];
  allChatrooms: any = [];

  channelId;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.firestore.collection('channel').valueChanges({ idField: 'customIdName'}).subscribe((changes: any) => {
        this.allChannels = changes;
    });

    this.firestore
    .collection('chatrooms')
    .valueChanges({ idField: 'customIdName'})
    .subscribe((data: any) => {
      this.allChatrooms = data;
    })

    setTimeout(() => {
      console.log(this.allChatrooms);
    }, 3000)

  }


  openAddChannel(): void {
    const dialogRef = this.dialog.open(AddChannelComponent, {
      // data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  openAddChat() {
    const dialogRef = this.dialog.open(AddChatComponent);

  }


}
