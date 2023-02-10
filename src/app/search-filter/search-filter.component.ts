import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})

export class SearchFilterComponent implements OnInit {

  value = '';
  title = 'angular-text-search-highlight';
  searchText = '';

  characters = [
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman',
    'Ant-Man',
    'Aquaman',
    'Asterix',
    'The Atom',
    'The Avengers',
    'Batgirl',
    'Batman',
    'Batwoman',
  ];
  allThreads: any = [];
  allChannels: any = [];
  allChannelNames: any = [];
  Test: any = [];
  currentThreadId: string;
  docRef;
  docSnap;
  data: any;
  allAnswers: any = [];
  db = getFirestore();

  @Input() channelId: string;

  // channelId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) {

  }

  ngOnInit(): void {
    this.getchannelsFromServer();
  }

  async getchannelsFromServer() {

    this.firestore.collection('channel').valueChanges({ idField: 'customIdName' }).subscribe((changes: any) => {
      this.allChannels = changes;

      for (let i = 0; i < this.allChannels.length; i++) {
        this.allChannelNames = this.allChannels[i].channelName;
        console.log('Channel name', this.allChannelNames);
      }
      this.getThreadsFromServer();
    });
  }

  getThreadsFromServer() {
    this.firestore.collection('channel').doc(this.allChannelNames).collection('threads').valueChanges({ idField: 'customIdThread' }).subscribe((thread: any) => {
      this.allThreads = thread;

      for (let i = 0; i < this.allThreads.length; i++) {
        let TestThread = this.allThreads[i];
        console.log('TestThread', TestThread);
      }
      console.log('all Threads', this.allThreads);
    });
  }
}

  //   getThreadFromServer() {
  //     if (this.currentThreadId) {
  //      this.firestore.collection('channel').doc(this.channelId).collection('threads').valueChanges().subscribe(async () => {
  //        this.docRef = doc(this.db,'channel',this.channelId,'threads', this.currentThreadId)
  //          this.docSnap = await getDoc(this.docRef);
  //          this.data = this.docSnap.data();
  //          this.allAnswers = this.data.answers;
  //          console.log(this.data)
  //          this.getDataOfThread();
  //        });
  //    };
  //  }

  // async getUpdatesFromChannelCollection() {
  //   this.firestore.collection('channel').valueChanges({ idField: 'customIdName' }).subscribe((changes) => {
  //     this.allThreads = changes;
  //     console.log('json', this.allThreads);
  //   });

  // let channels = collection(this.firestor, 'channel');
  // let q = query(channels, where("Allgemein", "==", true));
  // console.log('json', q);

  // let querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  //   console.log('das ist', doc);
  // });

  // const channels = query(collectionGroup(this.firestor, 'channel'), where('type', '==', 'museum'));
  // const querySnapshot = await getDocs(channels);
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, ' => ', doc.data());
  // });

  // getDataForThreadService() {
  //   this.threadContent.channelId = this.channelId;