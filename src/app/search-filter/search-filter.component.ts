import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { doc, getDocs, getFirestore } from 'firebase/firestore';
import { ThreadDatas } from '../interface/thread-datas';

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
  allThreadsArr: ThreadDatas[] = [];
  name: any = [];
  time: any = [];
  date: any = [];
  text: any = [];
  threaddatas: ThreadDatas[] = [];
  allThreadsValue: any;
  currentThreadId: string;
  docRef;
  docSnap;
  data: any;
  allAnswers: any = [];
  db = getFirestore();

  @Input() channelId: string;

  // channelId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, private firebase: Firestore) {

  }

  ngOnInit(): void {
    this.getchannelsFromServer();
  }

  getchannelsFromServer() {

    this.firestore.collection('channel').valueChanges({ idField: 'customIdName' }).subscribe((changes: any) => {
      this.allChannels = changes;

      for (let i = 0; i < this.allChannels.length; i++) {
        this.allChannelNames = this.allChannels[i].channelName;
        this.firestore.collection('channel').doc(this.allChannelNames).collection('threads').valueChanges({ idField: 'customIdThread' }).subscribe((thread: any) => {
          this.allThreads.push(thread);
          this.allThreadsArr.push(this.allThreads[i][0]);
          
          // this.name.push(this.allThreads[i][0].creatorName),
          // this.time.push(this.allThreads[i][0].createdTime),
          // this.date.push(this.allThreads[i][0].createdDate),
          // this.text.push(this.allThreads[i][0].threadText)
         
        //   let threaddatas = JSON.stringify(this.allThreads[i][0]);
        //   this.threaddatas = JSON.parse(threaddatas);
        // console.log('threaddatas', this.threaddatas);
        });
        
        
      }
      });

      console.log('allThreads', this.allThreads);
      console.log('allThreadsArr', this.allThreadsArr);
      console.log('threaddatas', this.threaddatas); 
    // this.getThreaddatas();
  }


  // getThreaddatas(){
  //   for (let i = 0; i < this.allThreadsArr.length; i++) {
  //     this.text = this.allThreadsArr[i].creatorName;
  //   }
  //   console.log('threadTexts',  this.text);

  // }


}
    
  

//   getThreadsFromServer() {
//     console.log('hm', this.allThreadsArr);
//     for (let j = 0; j < this.allThreadsArr.length; j++) {
//       let TEST = this.allThreadsArr[j];
//       console.log('TEST', TEST);
//     }
//   }
// }

//
    
    //   console.log('Channel name TEST', this.allChannelNames);
    //   for (let i = 0; i < this.allChannelNames.length; i++) {
    //     this.firestore.collection('channel').doc(this.allChannelNames).collection('threads').valueChanges({ idField: 'customIdThread' }).subscribe((thread: any) => {
    //       this.allThreads = thread;
    //     console.log('gucken', this.allThreads);
    //   });
    //   }

    // let allThreadsList = channelList.collection('threads').valueChanges({ idField: 'customIdName' }).subscribe((thread: any) => {;
    //   this.allThreads = allThreadsList;
    // console.log('gucken', this.allThreads);
    // });

    //   for (let i = 0; i < this.allThreads.length; i++) {
    //     let TestThread = this.allThreads[i];
    //     console.log('TestThread', TestThread);
    //   }
    //   console.log('all Threads', this.allThreads);


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