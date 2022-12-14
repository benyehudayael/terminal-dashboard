import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FlightSummary } from 'src/model/FlightSummary';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getFlightSummary(lastMinutes: number) : Observable<FlightSummary> {
    return this.http.get<FlightSummary>('https://localhost:7261/api/FlightSammary?lastMinutes=' + lastMinutes);
  }
}
