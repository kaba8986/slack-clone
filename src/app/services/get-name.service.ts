import { Injectable } from '@angular/core';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { User } from 'src/models/user.class';

@Injectable({
  providedIn: 'root'
})
export class GetNameService {

  db = getFirestore();

  constructor(

  ) { }

  
async getName(userID: string) {
  const docRef = doc(this.db, "users", userID);
  const docSnap = await getDoc(docRef);

  let currUser: any = docSnap.data();
  return currUser.firstName + " " + currUser.lastName;
}

}
