import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, doc, getDocs, limit, orderBy, query, setDoc } from '@angular/fire/firestore';
import { User } from './models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private firestore: Firestore, router: Router) { }


  async registerUser(user: User) {
    const usersCollectionRef = collection(this.firestore, 'users');
    const querySnapshot = await getDocs(query(usersCollectionRef, orderBy('id', 'desc'), limit(1)));

    let lastId = 0;
    if (!querySnapshot.empty) {
      const lastUser = querySnapshot.docs[0].data();
      lastId = lastUser['id'];
    }

    const newUser = {
      ...user,
      id: lastId + 1
    };

    await addDoc(usersCollectionRef, newUser);
  }

  loginUser(){
  }
}
