import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, getDocs, query, where } from 'firebase/firestore';

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

  // channelId: string;

  constructor(private route: ActivatedRoute, private firestor: Firestore) {

  }

  ngOnInit(): void {
    // this.route.params.subscribe( (params): void => {
    // this.getChannelId(params);
    this.getUpdatesFromChannelCollection();
    // this.getDataForThreadService()
    // });
  }

  // getChannelId(params) {
  //   this.channelId = params['channelName'];
  // }

  async getUpdatesFromChannelCollection() {
    // this.firestore.collection('channel').valueChanges({ idField: 'customIdName' }).subscribe((changes) => {
    //   this.allThreads = this.allThreads.sort(this.sortThreads('originalDate'));
    //   this.allThreads = changes;
    //   console.log('json', this.allThreads);

    var channels = collection(this.firestor, 'channel');
    const q = query(channels, where("Allgemein", "==", true));
    console.log('json', q);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      console.log('das ist', doc);
      });
    }

  // getDataForThreadService() {
  //   this.threadContent.channelId = this.channelId;
  // }

  // sortThreads(originalDate) {
  //   return function (a, b) {
  //     if (a[originalDate] > b[originalDate]) {
  //       return 1;
  //     } else if (a[originalDate] < b[originalDate]) {
  //       return -1;
  //     }
  //     return 0;
  //   }
  // }
}
