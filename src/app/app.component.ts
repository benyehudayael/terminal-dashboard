import { Component, OnInit } from '@angular/core';
import { FlightSummary } from 'src/model/FlightSummary';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-Terminal-Dashboard';
  menuIconClicked = true;
  flightSummary: FlightSummary;
  LastMinutes: number = 30;
  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    this.dataService.getFlightSummary(this.LastMinutes)
    .subscribe(flightSummary => {
      this.flightSummary = flightSummary;
    })
  }
 
  openMenu(){
    this.menuIconClicked = !this.menuIconClicked;
  }
}
