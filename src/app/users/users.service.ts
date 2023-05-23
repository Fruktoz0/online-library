import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, getDocs } from '@angular/fire/firestore';
import { User } from '../auth/models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
users: User[] = [];

  constructor(private firestore: Firestore) { }



  async listUsers(){
    const querySnapshot = await getDocs(collection(this.firestore, 'users'));
    querySnapshot.forEach((doc) =>{
      this.users.push(doc.data());
    });
    return this.users;
      
    
  }
}
