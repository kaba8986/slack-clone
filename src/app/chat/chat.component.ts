import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Message } from 'src/models/message.class';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @ViewChild('fileUploader') fileUploader:ElementRef;
 

  chatHis: any = [
    {
      userName: 'Max Mustermann',
      timeStamp: '09:31',
      content: 'Hallo Andreas. Na, wie kommst du voran?'
    },
    {
      userName: 'Andreas Burghardt',
      timeStamp: '10:04',
      content: 'Hi Max. Ganz gut gerade. Bin jetzt aktuell beim Slack-Clone, also schon beim letzten Coding-Project. Sieht kompliziert aus, aber bekommt man bestimmt auch irgendwie hin. Bei dir?'
    },
    {
      userName: 'Max Mustermann',
      timeStamp: '10:12',
      content: 'Okay cool. Ja auch ganz gut. Hab jetzt das Portfolio gerade zum zweiten mal eingereicht. Irgendwas finden die halt immer :D'
    },
    {
      userName: 'Andreas Burghardt',
      timeStamp: '10:22',
      content: 'Haha ja :D War bei mir aber auch so. Ist ja aber auch richtig. Junus und Manuel sagen ja immer wieder in den Videos, dass das Portfolio perfekt sein muss.'
    },
    {
      userName: 'Max Mustermann',
      timeStamp: '10:36',
      content: 'Stimmt. Slack-Clone ist wieder so ein Gruppen-Projekt wie Join oder? Nur auf Angular-Basis halt?'
    },
    {
      userName: 'Andreas Burghardt',
      timeStamp: '10:49',
      content: 'Genau, Gruppenarbeit. Wir sind gerade am Anfang. Jeder kümmert sich gerade um das HTML und Basis-CSS eines bestimmten Teils, danach überlegen wir uns, wie es weitergeht.'
    },
  ]



  constructor(
    private firestore: AngularFirestore
  ) {}

  message = new Message();

  formatText(style: string) {
    document.execCommand(style);
  }

  showFilename(event) {
    let outputField = document.getElementById( 'uploads' );

    let input = event.srcElement;
    let fileName = input.files[0].name;

    outputField.textContent = fileName;
  }

  resetUpload() {
    this.fileUploader.nativeElement.value = null;
    console.log(this.fileUploader.nativeElement.value);
    document.getElementById( 'uploads' ).textContent = "";
  }

  saveMessage() {
    this.message.creationDateAsString = this.message.creationDate.toLocaleDateString();
    // this.message.content = document.getElementById('input-field').textContent;

    console.log(this.message);

    
    this.firestore
    .collection('messages')
    .add(this.message.toJSON)
    
  }



}
