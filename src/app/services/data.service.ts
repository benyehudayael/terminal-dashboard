import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Summary } from 'src/model/Summary';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getSummary(lastMinutes: number) : Observable<Summary> {
    return this.http.get<Summary>('https://localhost:7261/api/Summary?lastMinutes=' + lastMinutes);
  }
}
