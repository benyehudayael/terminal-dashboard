import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Summary } from 'src/model/Summary';
import { Flight } from 'src/model/Flight';
import { FlightSummary } from 'src/model/FlightSummary';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient, private datePipe: DatePipe) { }

  getSummary(lastMinutes: number) : Observable<Summary> {
    return this.http.get<Summary>('https://localhost:7261/api/summary?lastMinutes=' + lastMinutes);
  }
  static FixData(flight: Flight): Flight {
    var d = Object.assign({}, flight);
    d.departureTime = d.departureTime ? new Date(d.departureTime) : undefined;
    d.landingTime = d.landingTime ? new Date(d.landingTime) : undefined;
    return d;
  }
  getFlights(lastMinutes: number): Observable<FlightSummary[]> {
    return this.http.get<object[]>('https://localhost:7261/api/flight?lastMinutes=' + lastMinutes)
      .pipe(map((flights: FlightSummary[]) => {
        return flights.map(x => new FlightSummary(DataService.FixData(x.flight), x.isLanding, x.time))
      }));
  }  
}