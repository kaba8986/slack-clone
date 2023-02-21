import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  currentUserID: string;
  currentUser: JSON;
  displayName: string;
  userGender: any;

}
