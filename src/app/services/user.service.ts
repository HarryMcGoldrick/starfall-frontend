import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('userObj')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  updateCurrentUser(user: User): void {
    localStorage.setItem('userObj', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  hasCurrentUser(): boolean {
    return !!localStorage.getItem('id_token');
  }

  removeCurrentUser(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('userObj');
  }
}
