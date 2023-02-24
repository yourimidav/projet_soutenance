import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CustomGeoJson } from './map';

const API_URL = 'http://localhost:3000/markers';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  getMarkers(): Observable<CustomGeoJson[]> {
    return this.http.get<CustomGeoJson[]>(API_URL);
  }

  createMarker(data: CustomGeoJson): Observable<CustomGeoJson> {
    return this.http.post<CustomGeoJson>(API_URL, data, httpOptions);
  }

  removeMarker(id: number): Observable<CustomGeoJson> {
    return this.http.delete<CustomGeoJson>(API_URL + `/${id}`);
  }
}