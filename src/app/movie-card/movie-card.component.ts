import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DescriptionCardComponent } from '../description-card/description-card.component';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  isLoading = false;
  movies: any[] = [];
  genres: any[] = [];
  favorites: any[] = [];
  user: any;
  favMovies: any;



  ngOnInit(): void {
    this.getMovies();
  }
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
  ) { }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });

  }

  openDescriptionCard(title: string, description: string): void {
    this.dialog.open(DescriptionCardComponent, {

      panelClass: 'custom-dialog-container',
      width: '70%',
      height: '70%',
      data: {
        Name: title,
        Description: description,
      }
    });
  }
  openGenreCard(name: string): void {
    this.dialog.open(GenreCardComponent, {
      panelClass: 'custom-dialog-container',
      width: '70%',
      height: '70%',
      data: {
        Name: name,
      }
    });
  }
  openDirectorCard(name: string): void {
    this.dialog.open(DirectorCardComponent, {
      panelClass: 'custom-dialog-container',
      width: '70%',
      height: '70%',
      data: {
        Name: name,
      }
    });
  }
  getUserFavs(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.favorites = res.FavoriteMovies;
      return this.favorites;
    });
  }
  addToFav({ movieId, title }: { movieId: string; title: string; }): void {
    this.fetchApiData
      .addToFav(this.user.Username, movieId)
      .subscribe((_res: any) => {
        this.snackbar.open(
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

  removeFromFavs(movieId: string, title: string): void {
    this.fetchApiData
      .removeFromFav(this.user.Username, movieId)
      .subscribe((res: any) => {
        this.snackbar.open(
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
  isFav(movieId: string): boolean {
    return this.favMovies.some((movie: { _id: string; }) => movie._id === movieId);
  }
  toggleFavs(movie: any): void {
    this.isFav(movie._id)
      ? this.removeFromFavs(movie._id, movie.Title)
      : this.addToFavs(movie._id, movie.Title);
  }
  addToFavs(_id: any, Title: any) {
    throw new Error('Method not implemented.');
  }
}



