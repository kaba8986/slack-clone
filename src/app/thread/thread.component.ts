import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadcontentService } from '../services/threadcontent.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { Thread } from 'src/models/thread.class';
import { Answer } from 'src/models/answer.class';
import { Auth } from '@angular/fire/auth';



@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit, OnChanges{
  userId: string;
  data: any;
  db = getFirestore();
  docRef;
  docSnap;
  currentThreadId:string;
  thread = new Thread();
  answer = new Answer();
  date:number = new Date().getTime();
  allAnswers:any = [];
  

  @Input() threadId:string;
  @Input() channelId:string;



  constructor(public threadContent: ThreadcontentService, public as: AuthService, private route: ActivatedRoute, private firestore: AngularFirestore, public auth: Auth) {
    //Wenn CurrentValue von changes am Anfang nicht vorhanden ist, muss die fehlermeldung abgefangen werden
  }

  /**
   * 
   * @param changes Angular variable to represent the change in the DOM
   * When clicking on "Antworten" to see the Thread, Angular recognise the change in the thread ID and loads the content of the Thread from Server
   */
  ngOnChanges(changes: SimpleChanges): void {
    this.getCurrentThreadId(changes);
    this.getThreadFromServer();
  }

  getCurrentThreadId(changes: SimpleChanges) {
    this.currentThreadId = changes['threadId'].currentValue;
  }

  getThreadFromServer() {
     if (this.currentThreadId) {
      this.firestore.collection('channel').doc(this.channelId).collection('threads').valueChanges().subscribe(async () => {
        this.docRef = doc(this.db,'channel',this.channelId,'threads', this.currentThreadId)
          this.docSnap = await getDoc(this.docRef);
          this.data = this.docSnap.data();
          this.allAnswers = this.data.answers;
          this.getDataOfThread();
        });
    };
  }

  getDataOfThread() {
    this.thread = new Thread(this.data);
  }


  ngOnInit(): void {
    this.route.params.subscribe( (): void => {
      this.userId = this.as.currentUserID;
    });
  }

  sendText() {
    this.getAnswerCreator();
    this.getText();
    this.convertDate(this.date);
    this.allAnswers.push(this.answer.toJSON());
    this.firestore.collection('channel').doc(this.channelId).collection('threads').doc(this.threadId).update({'answers': this.allAnswers});
  }

  getAnswerCreator() {
    this.answer.answerName = this.auth.currentUser.email; //email muss gegen DisplayName ausgetauscht werden
  }

  getText() {
    let inputValue = (document.getElementById('answerfield') as HTMLInputElement).value;
    this.answer.answerText = inputValue;
    inputValue = '';
  }

  convertDate(timestamp:number) {
    let date = new Date(timestamp);
    this.answer.originalDate = new Date().getTime();
    this.answer.createdDate = date.toLocaleDateString();
    this.answer.createdTime = date.toLocaleTimeString();
  }


  openDialog() {

  }
}
