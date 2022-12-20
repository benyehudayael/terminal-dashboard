import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Airplane } from 'src/model/Airplane';
import { Flight } from 'src/model/Flight';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent {
  airplanesAbautToTakeOff: BehaviorSubject<Airplane[]> = new BehaviorSubject<Airplane[]>([]);
  airplanesAbautToTakeOff$: Observable<Airplane[]> = this.airplanesAbautToTakeOff.asObservable();

  planesThatHaveLanded: BehaviorSubject<Airplane[]> = new BehaviorSubject<Airplane[]>([]);
  planesThatHaveLanded$: Observable<Airplane[]> = this.planesThatHaveLanded.asObservable();
 
  leftParking:Airplane[]
  rightParking: Airplane[]
  lastMinutes:number = 40

 constructor(private dataService: DataService){}
  // how many airplans are about to flight in the following 40 min or have landed in last 20 minutes
 // how many passengers are about to flight or have landed in last 20 minutes
 ngOnInit(): void {
  this.getFlights();
 }
 getFlights(){
   this.dataService.getFlights(40).subscribe((data: Flight[]) => {
    var ggg = data.filter(x => x.departureTime > new Date()).map(x => x.airplane);
    this.airplanesAbautToTakeOff.next(ggg);
    var hhh = data.filter(x => x.landingTime < new Date()).map(x => x.airplane);
    this.planesThatHaveLanded.next(hhh);
   })
 }
  

}
