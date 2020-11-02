import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Meteorite } from '../models/meteorite';

@Injectable({
  providedIn: 'root'
})
export class MeteoriteService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllMeteorites(): Observable<Meteorite[]> {
    return this.http.get<Meteorite[]>(this.API_URL + '/meteorites');
  }
}
