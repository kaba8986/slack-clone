import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{

  public signUpForm: FormGroup;

  constructor(public auth: Auth, public router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register(){
    //firebase sign in

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
