import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

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
  currentThreadId: string;
  docRef;
  docSnap;
  data: any;
  allAnswers: any = [];
  db = getFirestore();

  @Input() channelId: string;

  // channelId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore ) {

  }

  ngOnInit(): void {
    // this.route.params.subscribe( (params): void => {
    // this.getChannelId(params);
    // this.getUpdatesFromChannelCollection();
    this.getThreadFromServer();
    // this.getDataForThreadService()
    // });
  }

  // getChannelId(params) {
  //   this.channelId = params['channelName'];
  // }

  async getThreadFromServer() {
    // const querySnapshot = await getDocs(collection(this.db, "channel"));
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log('TESTE', doc.id, " => ", doc.data());
    // });

      this.firestore.collection('channel').doc(this.channelId).collection('threads').valueChanges().subscribe((changes) => {
        // this.docRef = doc(this.db, 'channel', this.channelId, 'threads', this.currentThreadId)
        // this.docSnap = await getDoc(this.docRef);
        // this.data = this.docSnap.data();
        // this.allAnswers = this.data.answers;
        // console.log('WAS', this.docRef);
        this.allThreads = changes;
      console.log('json', this.allThreads);
      });
  }

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
    // }
  }