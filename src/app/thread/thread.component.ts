import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadcontentService } from '../services/threadcontent.service';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, doc, getDoc, getFirestore, Firestore } from 'firebase/firestore';



@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit, OnChanges{

  channelId:string;
  userId: string;
  data: any;
  @Input() threadId:string;
  db = getFirestore();
  docRef;
  docSnap;

  creatorName:string;

  constructor(public threadContent: ThreadcontentService, public as: AuthService, private route: ActivatedRoute, private firestore: AngularFirestore) {

  }

  @ViewChild('thread') threadarea!: ElementRef;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    let currentId = changes['threadId'].currentValue;
    this.channelId = this.threadContent.channelId;



    console.log(this.channelId);
    if (currentId) {
      this.firestore.collection('channel').doc(this.channelId).collection('threads').valueChanges().subscribe(async () => {
        this.docRef = doc(this.db,'channel',this.channelId,'threads', currentId)
          this.docSnap = await getDoc(this.docRef);
          let data: any = this.docSnap.data();
          console.log(data.creatorName)
          this.creatorName = data.creatorName
        })
    }


  }


  ngOnInit(): void {

    this.route.params.subscribe( (): void => {
      this.userId = this.as.currentUserID;
      
    });
  }



}
