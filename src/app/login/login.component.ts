import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { signOut } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../services/auth.service';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: Auth, 
    public router: Router, 
    private fb: FormBuilder, 
    private firestore: AngularFirestore, 
    public as: AuthService) { }

  logInForm: FormGroup;

  Uid: string;

  firstName: string;
  lastName: string;
  fullName: string;

  userGender: any;

  ngOnInit(): void {
    this.logInForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(){
    //firebase log in

     signInWithEmailAndPassword(this.auth, this.logInForm.value.email, this.logInForm.value.password)
       .then((response: any)=>{
        console.log(response.user);
        console.log('all login data',response.user.uid);

        const Uid = response.user.uid
        console.log('firebase Auth ID',Uid);
        //firebase signin/login ID in auth.service.ts gespeichert
        this.as.currentUserID = Uid;
        this.as.currentUser = response.user;
        console.log('user from as service', this.as.currentUser);
        

         this.router.navigate(['']);
         this.getLoggedUser(Uid);
       })
       .catch((err)=>{
         alert(err.message);
       });   
  }

  getLoggedUser(id: string) {
    this.firestore
    .collection('users')
    .doc(id)
    .valueChanges()
    .subscribe((data: any) => {
      this.as.currentUser = data;
      console.log('sub user', this.as.currentUser);
      this.displayName(this.as.currentUser);
      
      

    });
  }

  displayName(currentUser: any){
    this.firstName = currentUser.firstName;
    this.lastName = currentUser.lastName;
    this.fullName = this.firstName + ' ' + this.lastName;
    this.as.displayName = this.fullName;
    //console.log('full name', this.fullName);
    console.log('full name ser', this.as.displayName);
    this.as.userGender = currentUser.gender;
    console.log('gender', this.as.userGender);
  }

  
}
