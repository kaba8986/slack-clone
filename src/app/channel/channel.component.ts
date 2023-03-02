import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Thread } from 'src/models/thread.class';
import { ActivatedRoute } from '@angular/router';
import { ThreadcontentService } from '../services/threadcontent.service';
import { AuthService } from '../services/auth.service';
import { EmojipickerService } from '../services/emojipicker.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit{

  thread = new Thread();
  toggled: boolean = false;
  allThreads:any = [];  
  date = new Date().getTime();
  channelId:string;
  threadId:string;
  currentThreadId:string;
  thread$: any;

  @Input() threadContent;
  
  constructor(private firestore: AngularFirestore, 
              private route: ActivatedRoute, 
              public threadContentService: ThreadcontentService, 
              public as: AuthService, 
              public emojipicker: EmojipickerService,
              public dialog: MatDialog) {
  }

 

  ngOnInit(): void {
    this.route.params.subscribe( (params): void => {
      this.getChannelId(params);
      this.getUpdatesFromChannelCollection()
      //this.getDataForThreadService()
    });
  }

  getChannelId(params) {
    this.channelId = params['channelName'];
  }

  getUpdatesFromChannelCollection() {
    this.firestore.collection('channel').doc(this.channelId).collection('threads').valueChanges({idField: 'id'}).subscribe( (changes) => {
      this.allThreads = changes;
      this.allThreads = this.allThreads.sort(this.sortThreads('originalDate'));
    })
  }

  // getDataForThreadService() {
  //   this.threadContent.channelId = this.channelId;
  // }

  sortThreads(originalDate){
    return function (a, b) {
      if (a[originalDate] > b[originalDate]) {
        return 1;
      } else if(a[originalDate] < b[originalDate]) {
        return -1;
      }
      return 0;
    }
  }


  setThreadId(threadId) {
    this.currentThreadId = threadId;
  }



}
