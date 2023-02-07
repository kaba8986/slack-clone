import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { signOut } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public auth: Auth, public router: Router, private fb: FormBuilder) { }

  logInForm: FormGroup;

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
         console.log(response.user.uid);
         this.router.navigate(['']);
       })
       .catch((err)=>{
         alert(err.message);
       });   
  }
}
