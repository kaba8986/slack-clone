import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Thread } from 'src/models/thread.class';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Observable } from 'rxjs';
import { doc, getDoc, getFirestore, QuerySnapshot } from 'firebase/firestore';
import { ThreadcontentService } from '../services/threadcontent.service';


@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss'],
})
export class ChannelComponent implements OnInit{

  thread = new Thread();

  allThreads:any = [];  
  date = new Date().getTime();
  channelId:string;
  threadId:string;
  thread$: any;


  
  constructor(private firestore: AngularFirestore, private auth: Auth, private route: ActivatedRoute, public threadContent: ThreadcontentService) {
  
  }

  ngOnInit(): void {
    this.route.params.subscribe( (params): void => {
      this.getChannelId(params);
      this.getUpdatesFromChannelCollection()
      this.getDataForThreadService()
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

  getDataForThreadService() {
    this.threadContent.channelId = this.channelId;
  }

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

  openDialog() {
  }

  openThread(id) {
    this.threadId = id;
    


      

  }

  addEmoji($event) {
    
  }

  sendText() {
    this.getThreadCreator();
    this.getText();
    this.convertDate(this.date);
    this.firestore.collection('channel').doc(this.channelId).collection('threads').add(this.thread.toJSON()).then( (result) => {
      console.log(result);
    })
  }

  getThreadCreator() {
    this.thread.creatorName = this.auth.currentUser.email; //email muss gegen DisplayName ausgetauscht werden
  }

  getText() {
    let inputValue = (document.getElementById('inputfield') as HTMLInputElement).value;
    this.thread.threadText = inputValue;
    inputValue = '';
  }

  convertDate(timestamp) {
    let date = new Date(timestamp);
    this.thread.originalDate = new Date().getTime();
    this.thread.createdDate = date.toLocaleDateString();
    this.thread.createdTime = date.toLocaleTimeString();
  }
}
