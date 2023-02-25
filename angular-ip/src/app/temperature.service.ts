import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Temperature } from './temperature';
import { WorldCity } from './worldCity';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {

  private temperatureUrl = 'http://localhost:8080/temp/erature';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private messageService: MessageService,
    private http: HttpClient) { }


    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

      /** Log a TemperatureService message with the MessageService */
    private log(message: string) {
      this.messageService.add(`TemperatureService: ${message}`);
    }

/** GET temperatures from the server */
getTemperatures(): Observable<Temperature[]> {
  this.log('fetched temperatures');
  return this.http.get<Temperature[]>(this.temperatureUrl).pipe(
    tap((_) => this.log('fetched temperatures')),
    catchError(this.handleError<Temperature[]>('getTemperatures', []))
  );
}

getAllTemperaturesForWille(id: number): Observable<Temperature[]> {
  this.log('fetched temperatures for city');
  const url = `${this.temperatureUrl+"/ville"}/${id}`;
  return this.http.get<Temperature[]>(url).pipe(
    tap((_) => this.log('fetched temperatures')),
    catchError(this.handleError<Temperature[]>('getTemperatures', []))
  );
}

  /** GET temperature by id. Will 404 if id not found */
  getTemperature(id: number): Observable<Temperature> {
    const url = `${this.temperatureUrl}/${id}`;
    return this.http.get<Temperature>(url).pipe(
      tap((_) => this.log(`fetched temperature id=${id}`)),
      catchError(this.handleError<Temperature>(`getTemperature id=${id}`))
    );
  }

  getByVille(ville: WorldCity): Observable<Temperature[]> {
    const url = `"${this.temperatureUrl}"/${ville}`;
    return this.http.get<Temperature[]>(url).pipe(
      tap((_) => this.log(`fetched temperature id=${ville}`)),
      catchError(this.handleError<Temperature[]>('getTemperatures', []))
    );
  }

  /** PUT: update the temperature on the server PAS FAIT DANS INTELLIJ */
  updateTemperature(temperature: Temperature): Observable<any> {
    return this.http.put(this.temperatureUrl, temperature, this.httpOptions).pipe(
      tap((_) => this.log(`updated temperature id=${temperature.id}`)),
      catchError(this.handleError<any>('updateTemperature'))
    );
  }

  /** POST: add a new temperature to the server */
  addTemperature(temperature: Temperature): Observable<Temperature> {
    return this.http.post<Temperature>(this.temperatureUrl, temperature, this.httpOptions).pipe(
      tap((newTemperature: Temperature) => this.log(`added temperature w/ id=${newTemperature.id}`)),
      catchError(this.handleError<Temperature>('addTemperature'))
    );
  }

  /** DELETE: delete the temperature from the server */
  deleteTemperature(id: number): Observable<Temperature> {
    const url = `${this.temperatureUrl}/${id}`;

    return this.http.delete<Temperature>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted temperature id=${id}`)),
      catchError(this.handleError<Temperature>('deleteTemperature'))
    );
  }

}
