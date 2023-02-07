import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AddChatComponent } from './add-chat/add-chat.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';


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
  value = '';

  channelId;

  constructor(public dialog: MatDialog, private firestore: AngularFirestore, private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    this.firestore.collection('channel').valueChanges({ idField: 'customIdName' }).subscribe((changes: any) => {
      this.allChannels = changes;
    });

    this.firestore
    .collection('chatrooms')
    .valueChanges({ idField: 'customIdName'})
    .subscribe((data: any) => {
      this.allChatrooms = data;
    })
  }


  openAddChannel(): void {
    const dialogRef = this.dialog.open(AddChannelComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  openAddChat() {
    const dialogRef = this.dialog.open(AddChatComponent);
  }

  openSearchFilter(){
    const dialogRef = this.dialog.open(SearchFilterComponent);
  }

}
