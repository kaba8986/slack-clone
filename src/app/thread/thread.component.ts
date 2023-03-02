import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadcontentService } from '../services/threadcontent.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Thread } from 'src/models/thread.class';
import { Answer } from 'src/models/answer.class';
import { Auth } from '@angular/fire/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';



@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit, OnChanges{
  userId: string;
  currentThreadId:string;
  thread = new Thread();
  allAnswers:any = [];
  
  docRef;
  docSnap;
  db = getFirestore();
  data: any;

  @Input() threadId:string;
  @Input() channelId:string;


  constructor(
    public as: AuthService, 
    private route: ActivatedRoute, 
    private firestore: AngularFirestore, 
    public auth: Auth) {
  }
  
  /**
   * 
   * @param changes Angular variable to represent the change in the DOM
   * When clicking on "Antworten" to see the Thread, Angular recognise the change in the thread ID and loads the content of the Thread from Server
   */
   ngOnChanges(changes: SimpleChanges): void {
    if (changes["threadId"] !== undefined && changes["threadId"].currentValue !== undefined) {
      this.getCurrentThreadId(changes);
    }
  }

   getCurrentThreadId(changes: SimpleChanges) {
    this.currentThreadId = changes['threadId'].currentValue;
    this.openThread(this.channelId, this.threadId);
  }

  openThread(channelId: string, threadId: string) {
    this.getThreadFromServer(channelId, threadId);
  }

  getThreadFromServer(channelId:string, threadId:string) {
     this.firestore.collection('channel').doc(channelId).collection('threads').valueChanges().subscribe(async () => {
       this.docRef = doc(this.db,'channel',channelId,'threads', threadId)
         this.docSnap = await getDoc(this.docRef);
         this.data = this.docSnap.data();
         this.allAnswers = this.data.answers;
         this.thread = new Thread(this.data);
       }); 
      }


  ngOnInit(): void {
    this.route.params.subscribe( (): void => {
      this.userId = this.as.currentUserID;
    });
  }

}


