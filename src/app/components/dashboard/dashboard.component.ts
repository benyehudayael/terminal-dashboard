import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Flight } from 'src/model/Flight';
import { FlightSummary } from 'src/model/FlightSummary';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  flightHeaders: string[] = ['Flight number', 'Status', 'From', 'To', 'Time', 'Firm'];//The last one is firm icon
  flightSummarys: BehaviorSubject<FlightSummary[]> = new BehaviorSubject<FlightSummary[]>([]);
  flightSummarys$: Observable<FlightSummary[]> = this.flightSummarys.asObservable();

  constructor(private dataService: DataService){}

  ngOnInit(): void {
   this.getLastFlights();
  }
  countryToFlag = (isoCode?: string) =>
    isoCode != null ? 
    isoCode
      .toUpperCase()
      .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : "";


  getLastFlights(){
    this.dataService.getFlights(40).subscribe((data: FlightSummary[]) => {
     this.flightSummarys.next(data)
    })
  }
}
