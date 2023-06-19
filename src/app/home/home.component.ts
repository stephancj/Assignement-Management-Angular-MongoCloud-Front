import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router, private authService: AuthService) {}
  
  selectedItem = 'Assignments';
  isSideNavOpen = true;

  selectItem(item: string) {
    this.selectedItem = item;
  }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
    console.log(this.isSideNavOpen);
  }

  logout() {
    this.authService.logOut();
    this.router.navigate(["/login"]);
  }
}
