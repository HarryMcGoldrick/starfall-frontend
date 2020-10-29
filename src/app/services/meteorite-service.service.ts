import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Meteorite } from '../models/meteorites';

@Injectable({
  providedIn: 'root'
})
export class MeteoriteService {
  API_URL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllMeteorites(): Observable<Meteorite[]> {
      const url = this.API_URL + '/meteorites';
      return this.http.get<Meteorite[]>(url);
  }
}
