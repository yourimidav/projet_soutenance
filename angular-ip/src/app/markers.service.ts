import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Markers } from './marker';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class MarkersService {
  private markersUrl= 'http://localhost:8080/markers/les';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(    
    private messageService: MessageService,
    private http: HttpClient) { }

    private handleError<T>(operation = 'operation', result?: T){
      return (error: any): Observable<T> => {
        console.error(error);
        this.logMessage(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
  
    private logMessage(message: string){
      this.messageService.add(`Markers: ${message}`);
    }

    getAllMarkers(): Observable<Markers[]>{
      return this.http.get<Markers[]>(this.markersUrl).pipe(
        tap((_) => this.logMessage('markers fetched')),
        catchError(this.handleError<Markers[]>('getAllMarkers', []))
      );
    }


    getMarkerById(id: number): Observable<Markers> {
      const url = `${this.markersUrl}/${id}`;
      return this.http.get<Markers>(url).pipe(
        tap((_) => this.logMessage(`marker fetched by id=${id}`)),
        catchError(this.handleError<Markers>(`getMarkerById with id=${id}`))
      );
    }

    updateMarker(marker: Markers): Observable<Markers> {
      return this.http.put<Markers>(this.markersUrl, marker, this.httpOptions).pipe(
        tap((_) => this.logMessage(`Marker with id=${marker.id} updated`)),
        catchError(this.handleError<Markers>('updateMarker'))
      );
    }

    addMarker(marker: Markers): Observable<Markers>{
      return this.http.post<Markers>(this.markersUrl, marker, this.httpOptions).pipe(
        tap((marker: Markers) => this.logMessage(`Marker with id=${marker.id} added`)),
        catchError(this.handleError<Markers>('addMarker'))
      );
    }

    deleteMarker(id: number): Observable<Markers> {
      const url = `${this.markersUrl}/${id}`;
      return this.http.delete<Markers>(url, this.httpOptions).pipe(
        tap((_) => this.logMessage(`Marker designated by id=${id}) deleted`)),
        catchError(this.handleError<Markers>('deleteMarker'))
      );
    }

}
