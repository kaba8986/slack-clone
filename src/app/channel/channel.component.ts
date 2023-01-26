import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit{

  //Test-Inhalte für das Design, wird später durch den jeweiligen Datenbankeintrag ersetzt

  threads:any = [
    { "userName": 'Patrick Frantzen',
      "timeStamp": '18:51',
      "content": 'Hey Leute, ich habe eine Frage: Was ist noch mal der Unterschied zwischen einem JSON und einem normalen Array?'
    },
    {
      "userName": 'Hagen Struwe',
      "timeStamp": '09:15',
      "content": 'Hey Team, ich habe etwas cooles rausgefunden: Man kann Material Design mit ::ng-deep selbst gestalten'
    },
    {
      "userName": 'Brett Scott',
      "timeStamp": '17:14',
      "content": 'Ich benötige bitte Feedback zu meinem CV und meinem Anschreiben. Kann mir jemand helfen?'
    },
    {
      "userName": 'Andreas Burghardt',
      "timeStamp": '13:37',
      "content": 'Anruf bei einer Hotline: Anrufer: „Ich benutze Windows …“, Hotline: „Ja …?“, Kunde: „Mein Computer funktioniert nicht richtig.“, Hotline: „Das sagten Sie bereits.“'
    },
  ]
  
  constructor() {}

  ngOnInit(): void {
  }

  openDialog() {
  }

}
