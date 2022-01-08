/**
 * UserProfileComponent view allows a user to see their profile info,
 * provides the options to edit or delete the profile
 * @module UserProfileComponent
 */

 import { Component, OnInit } from '@angular/core';
 import { FetchApiDataService } from '../fetch-api-data.service';
 import { MatSnackBar } from '@angular/material/snack-bar';
 import { MatDialog } from '@angular/material/dialog';
 import { Router } from '@angular/router';
 import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
 import { ProfileDeleteComponent } from '../profile-delete/profile-delete.component';
 
 @Component({
   selector: 'app-user-profile',
   templateUrl: './user-profile.component.html',
   styleUrls: ['./user-profile.component.scss'],
 })
 export class UserProfileComponent implements OnInit {
   user: any = {};
   favMovies: any = {};
 
   /**
    * All constructor items are documented as properties
    * @ignore
    */
   constructor(
     public fetchApiData: FetchApiDataService,
     public snackBar: MatSnackBar,
     public dialog: MatDialog,
     public router: Router
   ) {}
 
   /**
    * Initializes the component
    * @ignore
    */
   ngOnInit(): void {
     this.getUserInfo();
   }
 
   /**
    * Fetches the user info from localStorage if present, otherwise it
    * fetches them from the backend
    */
   getUserInfo(): void {
     let user = JSON.parse(localStorage.getItem('user') || '');
     this.fetchApiData.getUser(user.Username).subscribe((res: any) => {
       this.user = res;
     });
   }
 
   /**
    * Retrieves the list of the user's favorite movies
    * @returns an object holding the list of favorite movies
    */
   getFavMovies(): void {
     let movies: any[] = [];
     this.fetchApiData.getAllMovies().subscribe((res: any) => {
       movies = res;
       movies.forEach((movie: any) => {
         if (this.user.FavoriteMovies.includes(movie._id)) {
           this.favMovies.push(movie);
         }
       });
     });
     return this.favMovies;
   }
 
   /**
    * Opens a dialog asking the user if they want to proceed with the user deregistration
    */
   deregisterUser(): void {
     this.dialog.open(ProfileDeleteComponent, {
       width: '400px',
       panelClass: 'delete-user-dialog',
     });
   }
 
   /**
    * Opens a dialog holding a form to edit the user's info
    */
   openEditProfileDialog(): void {
     this.dialog.open(ProfileEditComponent, {
       width: '300px',
     });
   }
 }