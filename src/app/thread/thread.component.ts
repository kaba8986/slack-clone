import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ThreadcontentService } from '../services/threadcontent.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit{

  channelId:string;

  constructor(public threadContent: ThreadcontentService, private route: ActivatedRoute) {}

  ngOnInit(): void {

    this.route.params.subscribe( (): void => {
      this.channelId = this.threadContent.channelId;
    });
  }


}
