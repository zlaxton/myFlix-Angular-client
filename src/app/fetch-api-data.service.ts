import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://rocky-bayou-72593.herokuapp.com/';

const token = localStorage.getItem('token');

const headers = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + token,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  addToFavorites(_movieId: any): void {
    throw new Error('Method not implemented.');
  }
  removeFromFavorites(_id: string) {
    throw new Error('Method not implemented.');
  }
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(
    private http: HttpClient,
    private router: Router) {
    this.http = http;
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Calls the user registration endpoint
   * @function userRegistration
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */
  public userRegistration(userDetails: any): Observable<any> {
    //console.log(userDetails);
    return this.http
      .post(apiUrl + 'users/register', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Calls the /login endpoint
   * @function userLogin
   * @param userDetails the payload of the request
   * @returns an Observable containing a response
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    const { Username, Password } = userDetails;
    return this.http
      .post(
        apiUrl + 'login?Username=' + Username + '&Password=' + Password,
        headers
      )
      .pipe(catchError(this.handleError));
  }

  /**
   * Calls the /movies endpoint
   * @function getAllMovies
   * @returns an Observable containing a response
   */
  public getAllMovies(): Observable<any> {
    //this has type Observable
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer  ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /catalog/genres endpoint
   * @function getAllGenres
   * @returns an Observable containing a response
   */
  public getAllGenres(): Observable<any> {
    return this.http.get(apiUrl + 'genres', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /catalog/actors endpoint
   * @function getAllActors
   * @returns an Observable containing a response
   */
  public getAllActors(): Observable<any> {
    return this.http.get(apiUrl + 'catalog/actors', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /catalog/directors endpoint
   * @function getAllActors
   * @returns an Observable containing a response
   */
  public getAllDirectors(): Observable<any> {
    return this.http.get(apiUrl + 'directors', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /movies/:movieTitle endpoint
   * @function getMovie
   * @param movieTitle the id of the movie to retrieve
   * @returns an Observable containing a response
   */
  public getAMovie(): Observable<any> {
    return this.http.get(apiUrl + 'movies/:movieId', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
     * Get one director
     * @returns a director
     */
  getDirector(): Observable<any> {
    return this.http.get(apiUrl + 'directors/:name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * Get all genres
    * @returns an array of genres
    */
  getGenres(): Observable<any> {
    return this.http.get(apiUrl + 'genres', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Get one genre
   * @returns a genre
   */
  getAGenre(): Observable<any> {
    return this.http.get(apiUrl + 'genres/:name', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }



  /**
   * Calls the /users/:username endpoint
   * @function getUser
   * @param username the name of the user to retrieve
   * @returns an Observable conianing a response
   */
  public getUser(username: any): Observable<any> {
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /users/username/favorites endpoint
   * @function getFavMovies
   * @param username the username of the user to retrieve the favorite movies of
   * @returns an Observable containing a response
   */
  public getFavMovies(): Observable<any> {
    const user = localStorage.getItem('username');
    return this.http.get(apiUrl + `users/${user}/movies`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the /:users/username/favorites endpoint
   * @function getWatchlist
   * @param username the username of the user to retrieve the list of fvaorites of
   * @returns an Observable containing a response
   */
  public getWatchlist(username: string): Observable<any> {
    const response = this.http.get(
      apiUrl + 'users/' + username + '/watchlist',
      headers
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Calls the PUT /users/:username/favorites/:movieId endpoint
   * @function addToFav
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to add to the favorites
   * @returns an Observable containing a response
   */
  public addToFav(username: string, movieId: string): Observable<any> {
    const response = this.http.post(
      apiUrl + 'users/' + username + 'favorites/' + movieId,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Calls the PUT /users/:username/favorites/:movieId endpoint
   * @function addToWatchlist
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to add to the favorites
   * @returns an Observable containing a response
   */
  public addToWatchlist(username: string, movieId: string): Observable<any> {
    const response = this.http.post(
      apiUrl + 'users/' + username + 'watchlist/' + movieId,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Calls the DELETE /users/:username/favorites/:movieId endpoint
   * @function removeFromFav
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to remove from favorites
   * @returns an Observable containing a response
   */
  public removeFromFav(username: string, movieId: string): Observable<any> {
    const response = this.http.delete(
      apiUrl + 'users/' + username + 'favorites/' + movieId,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Calls the DELETE /users/:username/favorites/:movieId endpoint
   * @function removeFromWatchlist
   * @param username the username of the user we want to update the favorites for
   * @param movieId the id of the movie we want to add to the favorites
   * @returns an Observable containing a response
   */
  public removeFromWatchlist(
    username: string,
    movieId: string
  ): Observable<any> {
    const response = this.http.delete(
      apiUrl + 'users/' + username + 'watchlist/' + movieId,
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Calls the /users/:username/deregister endpoint
   * @function deleteUser
   * @param username the username of the user we want to deregister
   * @returns an Observable containing a response
   */
  public deleteUser(username: string): Observable<any> {
    const response = this.http.delete(
      apiUrl + 'users/' + username + '/deregister',
      headers
    );
    return response.pipe(catchError(this.handleError));
  }

  /**
   * Calls the PUT /users/:username
   * @function editUser
   * @param username the user we want to update the info of
   * @param updatedInfo the new info
   * @returns an Observable containing a response
   */
  public editUser(username: string, updatedInfo: object): Observable<any> {
    const response = this.http.put(
      apiUrl + 'users/' + username,
      updatedInfo,
      headers
    );
    return response.pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
}