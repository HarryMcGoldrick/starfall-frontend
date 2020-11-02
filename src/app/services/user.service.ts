import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getCurrentUser(): User {
    const userObj = localStorage.getItem('userObj');
    if (userObj) {
      return JSON.parse(userObj);
    } else {
      return new User();
    }
  }

  updateCurrentUser(user: User): void {
    localStorage.setItem('userObj', JSON.stringify(user));
  }

  hasCurrentUser(): boolean {
    return !!localStorage.getItem('id_token');
  }
}
