import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private API_KEY = '8118ed6ee68db2debfaaa5a44c832918';//clef du prof 

  constructor(private http: HttpClient) {}

  getWeatherFromCity(city: string): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&units=metric&appid=${this.API_KEY}`
    );
  }

  getWeatherFromcoord(lat: number,lon:number): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=fr&units=metric&appid=${this.API_KEY}`
    );
  }

  //https://api.openweathermap.org/data/2.5/weather?lat=47,4167&lon=0,6667&lang=fr&units=metric&appid=8118ed6ee68db2debfaaa5a44c832918`
}
