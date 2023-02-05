import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, getDoc, collectionData, docData, updateDoc, collection, doc, DocumentData, onSnapshot} from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{

  public signUpForm: FormGroup;

  constructor(private firestore: Firestore, public auth: Auth, public router: Router, private fb: FormBuilder) { }

  user = new User();
  birthDate: Date;

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(){
    //firebase sign in
    this.loadToFirebase();
    this.RegisterFirebase();
  }

  //neue Nutzer erstellt von user.class.ts per Dialog-eingabe dann in Firebase 'user' collection gespeichiert.
  loadToFirebase(){
    this.user.birthDate = this.birthDate.getTime()
    console.log('my user',this.user)

    const coll = collection(this.firestore, 'users');
    const docRef = addDoc(coll, this.user.toJson()).then((result: any)=>{
      console.log('loaded to firebase', result)
    });
  }

  //login Kriterien geprüft und user zu Firebase Authenication hinzugefügt
  RegisterFirebase(){
    createUserWithEmailAndPassword(this.auth, this.signUpForm.value.email, this.signUpForm.value.password)
    .then((response: any)=>{
      console.log(response.user);
      this.router.navigate(['login']);
    })
    .catch((err)=>{
      alert(err.message);
    });
  }
  

}
