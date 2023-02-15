import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AddChatComponent } from './add-chat/add-chat.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { Auth } from '@angular/fire/auth';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { AlertLoginComponent } from './alert-login/alert-login.component';
import { User } from 'src/models/user.class';
import { LoggedUserService } from './services/logged-user.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'slack-clone';

  dataSource: any;
  treeControl: any;
  allChannels: any = [];
  allChatrooms: any = [];
  newarr: any = [];
  loggedId: string;
  currUser = new User();

  value = '';

  channelId;

  constructor(
    public dialog: MatDialog, 
    private firestore: AngularFirestore, 
    private route: ActivatedRoute, 
    public router: Router,
    private auth: Auth,
    private logService: LoggedUserService,
    public as: AuthService
    
    ) { }

  ngOnInit(): void {
    this.firestore.collection('channel').valueChanges({ idField: 'customIdName' }).subscribe((changes: any) => {
      this.allChannels = changes;
    });

    //check if somebody is logged in - if yes, save user from firestore
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.loggedId = user.uid;
        this.getLoggedUser(user.uid);
      } else {
        console.log('currently no user logged in')
      }
    });

    setTimeout(() => {

    }, 4000)
  }

  
  getLoggedUser(id: string) {
    this.firestore
    .collection('users')
    .doc(id)
    .valueChanges()
    .subscribe((data: any) => {
      this.currUser = data;
      
    });
  }

  
  

  openAddChannel(): void {
    const dialogRef = this.dialog.open(AddChannelComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  openAddChat() {
    if(this.auth.currentUser) {
      const dialog = this.dialog.open(AddChatComponent);
      dialog.componentInstance.currUser = this.currUser;
    } else {
      const dialog = this.dialog.open(AlertLoginComponent);
    }
  }

  openSearchFilter(){
    const dialogRef = this.dialog.open(SearchFilterComponent);
  }

  logout(){
      signOut(this.auth).then((signOutData: any)=>{
        //console.log(signOutData);
        this.router.navigate(['login'])
      })
  }

}
