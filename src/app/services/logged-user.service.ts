import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {

  loggedUser: any;
  auth = getAuth();

  constructor(
    private firestore: AngularFirestore
  ) { }


  getLoggedUser()  {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.firestore
        .collection('users')
        .doc(user.uid)
        .valueChanges()
        .subscribe((data: any) => {
          this.loggedUser  = data;
          return new User(data);
        })
      } 

    });
  }


  
}
