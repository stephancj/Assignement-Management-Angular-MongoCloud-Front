import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion de devoirs à rendre';
  labelConnexion = "Se connecter";
  nom:string = "";
  currentRoute:string = "";

  constructor(private authService:AuthService, private router:Router) {
    console.log(router.url);

    router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
        console.log(event.url);
        this.currentRoute = event.url;
      }
    });
    
    
  }

  login() {
    // utilise l'authService pour se connecter
    if(!this.authService.loggedIn) {
      this.authService.logIn();
      // on change le label du bouton
      this.labelConnexion = "Se déconnecter";
    } else {
      this.authService.logOut();
      // et on navigue vers la page d'accueil
      this.router.navigate(["/home"]);
    }
  }

  isLogged() {
    if(this.authService.loggedIn) {
      this.nom = "Michel Buffa";
    }
    return this.authService.loggedIn;
  }
}
