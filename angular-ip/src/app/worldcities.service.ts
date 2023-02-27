import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { MessageService } from './message.service';
import { WorldCity } from './worldCity';


@Injectable({
  providedIn: 'root'
})

export class WorldcitiesService {
  private worldCitiesUrl= 'http://localhost:8080/worldcity/cities';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.logMessage(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private logMessage(message: string){
    this.messageService.add(`WorldCity: ${message}`);
  }

  /**
   * GET Method
   * Get ALl Cities from the Server
   * Will run with the root @GetMapping("/cities") from 
   * the @RestController of the Java JPA controller
   */
  getAllCities(): Observable<WorldCity[]>{
    this.logMessage('Cities fetched');
    return this.http.get<WorldCity[]>(this.worldCitiesUrl).pipe(
      tap((_) => this.logMessage('cities fetched')),
      catchError(this.handleError<WorldCity[]>('getAllCities', []))
    );
  }

  /**
   * GET Method
   * Get City by id from the server
   * Will run with the root @GetMapping("/cities/{id}") from 
   * the @RestController of the Java JPA controller
   */
  getCityById(id: number): Observable<WorldCity> {
    const url = `${this.worldCitiesUrl}/${id}`;
    return this.http.get<WorldCity>(url).pipe(
      tap((_) => this.logMessage(`city fetched by id=${id}`)),
      catchError(this.handleError<WorldCity>(`getCityById with id=${id}`))
    );
  }

  /**
   * GET Method
   * Get City by id from the server
   * Will run with the root @GetMapping("/cities/{id}") from 
   * the @RestController of the Java JPA controller
   */
  getCityByName(name: string): Observable<WorldCity> {
    const url = `${this.worldCitiesUrl}/name/${name}`;
    return this.http.get<WorldCity>(url).pipe(
      tap((_) => this.logMessage(`city fetched by name=${name}`)),
      catchError(this.handleError<WorldCity>(`getCityById with name=${name}`))
    );
  }

  /**
   * PUT Method
   * Update the city on the server
   * Will run with the root @PutMapping("/cities") from 
   * the @RestController of the Java JPA controller
   */
  updateCity(city: WorldCity): Observable<WorldCity> {
    return this.http.put<WorldCity>(this.worldCitiesUrl, city, this.httpOptions).pipe(
      tap((_) => this.logMessage(`City with id=${city.id} updated`)),
      catchError(this.handleError<WorldCity>('updateCity'))
    );
  }

  /**
   * POST Method
   * Add a new city on the server
   * Will run with the root @PostMapping("/cities") from 
   * the @RestController of the Java JPA controller
   */
  addCity(city: WorldCity): Observable<WorldCity>{
    return this.http.post<WorldCity>(this.worldCitiesUrl, city, this.httpOptions).pipe(
      tap((city: WorldCity) => this.logMessage(`City with id=${city.id} added`)),
      catchError(this.handleError<WorldCity>('addCity'))
    );
  }

  /**
   * DELETE Method
   * Delete a city designated by an id
   * Will run with the root @DeleteMapping("/cities/{id}") from 
   * the @RestController of the Java JPA controller
   */
  deleteCity(id: number): Observable<WorldCity> {
    const url = `${this.worldCitiesUrl}/${id}`;
    return this.http.delete<WorldCity>(url, this.httpOptions).pipe(
      tap((_) => this.logMessage(`City designated by id=${id}) deleted`)),
      catchError(this.handleError<WorldCity>('deleteCity'))
    );
  }

  /**
   * DELETE Method
   * Delete a city and all temperatures + markers attached
   * to that city in the database
   * @param id 
   * @returns 
   */
  deleteCityAll(id: number): Observable<WorldCity> {
    const url = `${this.worldCitiesUrl}/autres/${id}`;
    return this.http.delete<WorldCity>(url, this.httpOptions).pipe(
      tap((_) => this.logMessage(`City designated by id=${id}) deleted`)),
      catchError(this.handleError<WorldCity>('deleteCity'))
    );
  }

  /* GET cities whose name contains search term */
  searchCities(term: string): Observable<WorldCity[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }//cityName
    return this.http.get<WorldCity[]>(`${this.worldCitiesUrl}/names/${term}`).pipe(
      tap(x => x.length ?
        this.logMessage(`found cities matching "${term}"`) :
        this.logMessage(`no cities matching "${term}"`)),
      catchError(this.handleError<WorldCity[]>('searchCities', []))
    );
  }
}
