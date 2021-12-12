import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  /**
   * This decorator binds the form input values to the userData object
   */
  @Input() userCredentials = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  /**
   * Initializes the component
   * @ignore
   */
  ngOnInit(): void { }

  /**
   * Logs the user in by sending a request to the backend endpoint.
   * A snack bar is shown, holding a message about the result of the operation.
   */
  login(): void {
    this.fetchApiData.userLogin(this.userCredentials).subscribe(
      (result) => {
        this.dialogRef.close();

        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        this.dialogRef.close();
        this.snackBar.open('Successfully logged in!', 'OK, cool', {
          duration: 2000,
        });
        this.router.navigate(['movies']);
      },
      (result) => {
        this.snackBar.open(
          'Wrong username or password. Please try again.',
          'Aw, alright',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
