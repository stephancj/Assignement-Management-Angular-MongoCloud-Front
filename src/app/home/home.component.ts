import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  selectedItem = 'Assigments';
  isSideNavOpen = true;

  selectItem(item: string) {
    this.selectedItem = item;
  }

  toggleSideNav() {
    this.isSideNavOpen = !this.isSideNavOpen;
    console.log(this.isSideNavOpen);
  }
}
