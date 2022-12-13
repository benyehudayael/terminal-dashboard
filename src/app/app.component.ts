import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-Terminal-Dashboard';
  menuIconClicked = false;
  constructor(){
  }
  openMenu(){
    this.menuIconClicked = !this.menuIconClicked;
  }
}
