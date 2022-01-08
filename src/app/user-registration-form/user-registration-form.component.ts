/**
 * User Registration View allows a user to register
 * @module UserRegistrationFormComponent
 */

 import { Component, OnInit, Input } from '@angular/core';
 import { MatDialogRef } from '@angular/material/dialog';
 import { FetchApiDataService } from '../fetch-api-data.service';
 import { MatSnackBar } from '@angular/material/snack-bar';
 
 @Component({
   selector: 'app-user-registration-form',
   templateUrl: './user-registration-form.component.html',
   styleUrls: ['./user-registration-form.component.scss'],
 })
 export class UserRegistrationFormComponent implements OnInit {
   /**
    * This decorator binds the form input values to the userData object
    */
   @Input() userData = { Username: '', Password: '', Email: '', BirthDate: '' };
 
   /**
    * All constructor items are documented as properties
    * @ignore
    */
   constructor(
     public fetchApiData: FetchApiDataService,
     public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
     public snackBar: MatSnackBar
   ) {}
 
   /**
    * Initializes the component
    * @ignore
    */
   ngOnInit(): void {}
 
   /**
    * Registers a new user by calling the userRegistration service.
    * It shows a snack bar element containing the result of the operation
    */
   registerUser(): void {
     this.fetchApiData.userRegistration(this.userData).subscribe(
       (result) => {
         this.dialogRef.close();
         this.snackBar.open('✔️ You are registered! Please Login!', 'Sure', {
           duration: 2000,
         });
       },
       (result) => {
         this.snackBar.open('Something went wrong, please try again! 🌵', 'OK', {
           duration: 2000,
         });
       }
     );
   }
 }