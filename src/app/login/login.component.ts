import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) {}
  
  login() {    // utilise l'authService pour se connecter
    if(!this.authService.loggedIn) {
      this.authService.logIn();
      this.router.navigate(["/home"]);
    }
  }
}
