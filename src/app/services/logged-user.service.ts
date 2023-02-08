import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {



  constructor(
    private firestore: AngularFirestore
  ) { }

/*
  getLoggedUser()  {
    let loggedUser: any;
    let auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.firestore
        .collection('users')
        .doc(user.uid)
        .valueChanges()
        .subscribe((data: any) => {
          loggedUser  = data;
        })
      } 
    });
  }
  */
}
