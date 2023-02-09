import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection, collectionGroup, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { ThreadcontentService } from '../services/threadcontent.service';

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
  channelId: string;
  db = getFirestore()

  constructor(private firestore: AngularFirestore, private route: ActivatedRoute, public threadContent: ThreadcontentService) {

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
    this.firestore.collection('channel').valueChanges({ idField: 'customIdName' }).subscribe((changes) => {
      this.allThreads = this.allThreads.sort(this.sortThreads('originalDate'));
      this.allThreads = changes;
      console.log('json', this.allThreads);

      var channels = collection(this.db, 'channel');
      const q = query(channels, where("threads", "==", true));
      console.log('json', q);
      
    });
  }

  // getDataForThreadService() {
  //   this.threadContent.channelId = this.channelId;
  // }

  sortThreads(originalDate) {
    return function (a, b) {
      if (a[originalDate] > b[originalDate]) {
        return 1;
      } else if (a[originalDate] < b[originalDate]) {
        return -1;
      }
      return 0;
    }
  }
}
