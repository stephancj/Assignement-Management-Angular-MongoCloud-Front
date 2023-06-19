import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}
  
  login() {    // utilise l'authService pour se connecter
    if(!this.authService.loggedIn) {
      if(this.email == 'admin' && this.password == 'admin') {
      this.authService.logIn();
      this.router.navigate(["/home"]);
      } else {
        //show a red snackbar with error message
        this.snackBar.open('Incorrect credentials ! Verify your email and password', 'close', {
          duration: 3000,
          verticalPosition: 'bottom',
          panelClass: ['error-snackbar']
        });
      }
    }
  }
}
