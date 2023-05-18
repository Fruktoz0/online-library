import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private firestore: Firestore, router: Router) { }


  registerUser(user: User) {
    const newUser = doc(collection(this.firestore, 'users'));
    return setDoc(newUser, user);
  }

  loginUser(){
  }
}
