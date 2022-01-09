/**
 * MovieCardComponent view holds information about a movie, such as title, poster image, director, genre and Description.
 * It allows a user to like a movie by clicking on the heart shaped icon.
 * @module MovieCardComponent
 */

 import { Component, OnInit } from '@angular/core';
 import { FetchApiDataService } from '../fetch-api-data.service';
 import { Router } from '@angular/router';
 import { MatDialog } from '@angular/material/dialog';
 import { MatSnackBar } from '@angular/material/snack-bar';
 import { GenreCardComponent } from '../genre-card/genre-card.component';
 import { DescriptionCardComponent } from '../description-card/description-card.component';
 import { DirectorCardComponent } from '../director-card/director-card.component';
 
 @Component({
   selector: 'app-movie-card',
   templateUrl: './movie-card.component.html',
   styleUrls: ['./movie-card.component.scss'],
 })
 export class MovieCardComponent implements OnInit {
   //Getting the user info from localStorage if present
   user: any = JSON.parse(localStorage.getItem('user') || '');
   movies: any[] = [];
   favMovies: any[] = this.user.FavoriteMovies;
 
   /**
    * All constructor items are documented as properties
    * @ignore
    */
   constructor(
     public fetchApiData: FetchApiDataService,
     public dialog: MatDialog,
     public router: Router,
     public snackBar: MatSnackBar
   ) {}
 
   /**
    * Initializes component, retrieves all movies and the user's favorites
    */
   ngOnInit(): void {
     this.getMovies();
     this.getUserFavs();
   }
 
   /**
    * Retrieves all the movies from the database
    */
   getMovies(): void {
     this.fetchApiData.getAllMovies().subscribe((res: any) => {
       this.movies = res;
       return this.movies;
     });
   }
 
   /**
    * Opens a dialog containing info about the genre
    * @param name the name of the genre
    * @param description the description of the genre
    */
   openGenreDialog(name: string, description: string): void {
     this.dialog.open(GenreCardComponent, {
       data: { name, description },
       width: '500px',
     });
   }
 
   /**
    * Opens a dialog containing info about the director
    * @param name the name of the director
    * @param bio the bio of the director
    * @param birthDate birth date of the director
    * @param deathDate death date of the director
    */
   openDirectorDialog(
     name: string,
     bio: string,
     birthDate: any,
     deathDate: any
   ): void {
     this.dialog.open(DirectorCardComponent, {
       data: {
         name,
         bio,
         birthDate,
         deathDate,
       },
       width: '500px',
     });
   }
 
   /**
    * Opens a dialog containing info about the movie
    * @param title the title of the movie
    * @param description the description of the movie
    */
   openDescriptionDialog(
     title: string,
     description: string,
     releaseDate: any,
     rating: any
   ): void {
     this.dialog.open(DescriptionCardComponent, {
       data: {
         title,
         description,
         releaseDate,
         rating,
       },
       width: '500px',
     });
   }
 
   /**
    * Updates the local list of favorites by downloading it from the DB
    */
   getUserFavs(): any {
     this.fetchApiData.getUser(this.user).subscribe((res: any) => {
       this.favMovies = res.Favorites;
       return this.favMovies;
     });
   }
 
   /**
    * Adds a movie to the user's list of favorites
    * @param movieId the id of the movie
    * @param title the title of the movie
    */
   addToFavs(movieId: string, title: string): void {
     this.fetchApiData
       .addToFav(this.user.Username, movieId)
       .subscribe((res: any) => {
         this.snackBar.open(
           `${title} has been added to your favorite movies! ✔️`,
           'Cool',
           {
             duration: 2000,
           }
         );
         this.ngOnInit();
       });
     return this.getUserFavs();
   }
 
   /**
    * Removes a movie from the user's list of favorites
    * @param movieId the id of the movie
    * @param title the title of the movie
    */
   removeFromFavs(movieId: string, title: string): void {
     this.fetchApiData
       .removeFromFav(this.user.Username, movieId)
       .subscribe((res: any) => {
         this.snackBar.open(
           `${title} has been removed from your favorite movies ✔️`,
           'Alright',
           {
             duration: 2000,
           }
         );
         this.ngOnInit();
       });
     return this.getUserFavs();
   }
 
   /**
    * Checks if a movie is included in the user's list of favorites
    * @param movieId the id of the movie
    * @returns true if the movie is in the list of favorites, false otherwise
    */
   isFav(movieId: string): boolean {
     return this.favMovies.some((movie) => movie._id === movieId);
   }
 
   /**
    * Toggles the heart shaped icon from full to empty, and invokes the method to add or
    * remove a function from the user's list of favorites
    * @function toggleFavs
    * @param movie the movie to add/remove to/from favs
    */
   toggleFavs(movie: any): void {
     this.isFav(movie._id)
       ? this.removeFromFavs(movie._id, movie.Title)
       : this.addToFavs(movie._id, movie.Title);
   }
 }

