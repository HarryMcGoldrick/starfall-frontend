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
    return this.http.post<any>(this.API_URL + '/login', body).pipe(
      map(res => {
        const user: User = new User();
        user.username = username;
        this.userService.updateCurrentUser(user);
        localStorage.setItem('id_token', JSON.stringify(res.token));
        return res;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('id_token');
  }

}
