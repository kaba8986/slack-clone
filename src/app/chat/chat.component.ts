import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Chat } from 'src/models/chats.class';
import { Message } from 'src/models/message.class';
import { User } from 'src/models/user.class';
import { LoggedUserService } from '../services/logged-user.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { arrayUnion, doc, getFirestore, updateDoc } from 'firebase/firestore';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  @ViewChild('fileUploader') fileUploader:ElementRef;
 

  chatHis: any = [
    {
      senderId: 'Max Mustermann',
      timeStamp: '09:31',
      content: 'Hallo Andreas. Na, wie kommst du voran?'
    },
    {
      senderId: 'Andreas Burghardt',
      timeStamp: '10:04',
      content: 'Hi Max. Ganz gut gerade. Bin jetzt aktuell beim Slack-Clone, also schon beim letzten Coding-Project. Sieht kompliziert aus, aber bekommt man bestimmt auch irgendwie hin. Bei dir?'
    },
    {
      senderId: 'Max Mustermann',
      timeStamp: '10:12',
      content: 'Okay cool. Ja auch ganz gut. Hab jetzt das Portfolio gerade zum zweiten mal eingereicht. Irgendwas finden die halt immer :D'
    },
    {
      senderId: 'Andreas Burghardt',
      timeStamp: '10:22',
      content: 'Haha ja :D War bei mir aber auch so. Ist ja aber auch richtig. Junus und Manuel sagen ja immer wieder in den Videos, dass das Portfolio perfekt sein muss.'
    },
    {
      senderId: 'Max Mustermann',
      timeStamp: '10:36',
      content: 'Stimmt. Slack-Clone ist wieder so ein Gruppen-Projekt wie Join oder? Nur auf Angular-Basis halt?'
    },
    {
      senderId: 'Andreas Burghardt',
      timeStamp: '10:49',
      content: 'Genau, Gruppenarbeit. Wir sind gerade am Anfang. Jeder kümmert sich gerade um das HTML und Basis-CSS eines bestimmten Teils, danach überlegen wir uns, wie es weitergeht.'
    },
  ]

  message = new Message();
  chatroomId: string;
  currUser = new User();
  currChatroom = new Chat();
  auth = getAuth();
  db = getFirestore();


  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private log: LoggedUserService
  ) {}



  ngOnInit(): void {
    this.route.paramMap
    .subscribe( paramMap => {
      this.chatroomId = paramMap.get('chatId');
      this.getChatroom();
      this.getLoggedUser();
    })

    setTimeout(() => {
      console.log(this.currUser);
    }, 4000)

  }

  getChatroom() {
    this.firestore
    .collection('chats')
    .doc(this.chatroomId)
    .valueChanges()
    .subscribe((data: any) => {
      this.currChatroom = new Chat(data);
    })
  }


  getLoggedUser()  {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.firestore
        .collection('users')
        .doc(user.uid)
        .valueChanges()
        .subscribe((data: any) => {
          this.currUser  = data;
        })
      } 
    });
  }


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
    document.getElementById( 'uploads' ).textContent = "";
  }

  async send() {
    this.message.senderID = this.currUser.firstName  + " " + this.currUser.lastName;
    // this.message.content = document.getElementById('input-field').textContent;

    console.log(this.message.toJSON());

    const messageRef = doc(this.db, 'chats', this.chatroomId);
    await updateDoc(messageRef , {
      messages: arrayUnion(this.message.toJSON())
    })
  }

}
