import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  API_URL = environment.apiUrl;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = {
      username,
      password
    };
    return this.http.post<any>(this.API_URL + '/login', body).pipe(
      map(res => {
        localStorage.setItem('id_token', JSON.stringify(res.token));
        return res;
      })
    );
  }

  logout() {
    localStorage.removeItem('id_token');
  }
}
