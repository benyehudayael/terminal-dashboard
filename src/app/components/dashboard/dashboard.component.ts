import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  flightHeaders: string[] = ['Flight number', 'From', 'To', 'Departure time', 'Landing time', ''];//The last one is firm icon
}
