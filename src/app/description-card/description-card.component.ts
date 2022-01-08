/**
 * DescriptionCardComponent view allows a user to visualize the Description of a movie in a dialog
 * @module DescriptionCardComponent
 */

 import { Component, OnInit, Inject } from '@angular/core';
 import { MAT_DIALOG_DATA } from '@angular/material/dialog';
 
 @Component({
   selector: 'app-Description-card',
   templateUrl: './Description-card.component.html',
   styleUrls: ['./Description-card.component.scss'],
 })
 export class DescriptionCardComponent implements OnInit {
   /**
    * All constructor items are documented as properties
    * @ignore
    */
   constructor(
     @Inject(MAT_DIALOG_DATA)
     public data: {
       title: string;
       description: string;
       releaseDate: any;
       rating: any;
     }
   ) {}
 
   /**
    * Initializes the component
    * @ignore
    */
   ngOnInit(): void {}
 }