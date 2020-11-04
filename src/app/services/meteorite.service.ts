import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Meteorite } from '../models/meteorite';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MeteoriteService {

  constructor(private http: HttpClient, private userService: UserService) { }
  API_URL = environment.apiUrl;

  getFavourites(username: string): Observable<string[]> {
    const params = new HttpParams().set('username', username);
    return this.http.get<string[]>(`${this.API_URL}/meteorites/favourites`, { params });
  }

  getAllMeteorites(): Observable<Meteorite[]> {
    return this.http.get<Meteorite[]>(`${this.API_URL}/meteorites`);
  }

  updateFavourite(meteoriteId: string): any {
    const body = {
      username: this.userService.currentUserValue.username,
      meteorite_id: meteoriteId
    };
    this.http.post<string>(`${this.API_URL}/meteorites/favourites`, body).subscribe();
  }
}
