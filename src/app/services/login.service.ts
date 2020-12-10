import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  API_URL = environment.apiUrl;
  constructor(private http: HttpClient, private userService: UserService) { }

  login(username: string, password: string): Observable<string> {
    const body = {
      username,
      password
    };
    return this.http.post<any>(`${this.API_URL}/login`, body).pipe(
      map(res => {
        this.userService.updateCurrentUser(new User(username));
        localStorage.setItem('id_token', JSON.stringify(res.token));
        return res;
      }, error => {
        console.log(error);
        return error;
      })
    );
  }

  logout(): void {
    this.http.post(`${this.API_URL}/logout`, {}).pipe(
      map(res => {
        this.userService.removeCurrentUser();
        return res;
      })
    );
  }

  register(username: string, password: string): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/register`, { username, password })
  }

}
