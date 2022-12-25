import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Airplane } from 'src/model/Airplane';
import { Flight } from 'src/model/Flight';
import { FlightSummary } from 'src/model/FlightSummary';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent {
  data: FlightSummary[];
  airplanesAbautToTakeOff: BehaviorSubject<Airplane[]> = new BehaviorSubject<Airplane[]>([]);
  airplanesAbautToTakeOff$: Observable<Airplane[]> = this.airplanesAbautToTakeOff.asObservable();

  planesThatHaveLanded: BehaviorSubject<Airplane[]> = new BehaviorSubject<Airplane[]>([]);
  planesThatHaveLanded$: Observable<Airplane[]> = this.planesThatHaveLanded.asObservable();

  leftParking: BehaviorSubject<Airplane[]> = new BehaviorSubject<Airplane[]>([]);
  leftParking$: Observable<Airplane[]> = this.leftParking.asObservable();

  rightParking: BehaviorSubject<Airplane[]> = new BehaviorSubject<Airplane[]>([]);
  rightParking$: Observable<Airplane[]> = this.rightParking.asObservable();

  toAnimateTakeOff: BehaviorSubject<Airplane[]> = new BehaviorSubject<Airplane[]>([]);
  toAnimateTakeOff$: Observable<Airplane[]> = this.toAnimateTakeOff.asObservable();

  toAnimateLanding: BehaviorSubject<Airplane[]> = new BehaviorSubject<Airplane[]>([]);
  toAnimateLanding$: Observable<Airplane[]> = this.toAnimateLanding.asObservable();
 
  lastMinutes:number = 40;
  intervalUpdater : any;

 constructor(private dataService: DataService){}
  // how many airplans are about to flight in the following 40 min or have landed in last 20 minutes
 // how many passengers are about to flight or have landed in last 20 minutes
 ngOnInit(): void {
  this.getFlights();
 }
 ngOnDestroy(){
  this.intervalUpdater.clearInterval();
 }

 getFlights(){
   this.dataService.getFlights(40).subscribe((data: FlightSummary[]) => {
    this.data = data;
    this.intervalUpdater = setInterval(() => { 
      this.calcNewItemsView() 
    }, 1000);
   });
 }

 calcNewItemsView() {
  var takeOff = this.data.filter(x => !x.isLanding);
  var landed = this.data.filter(x => x.isLanding);

  var airplanesAboutToTakeOff = takeOff.filter(x => x.flight.departureTime < this.addMinutes(new Date(), 10)).splice(0,10).map(x => x.flight.airplane);
  var planesThatHaveLanded = landed.filter(x => x.flight.landingTime < this.subtractMinutes(new Date(), 10)).splice(0,10).map(x => x.flight.airplane);
  var leftParking = takeOff.filter(x => x.flight.departureTime > this.addMinutes(new Date(), 10)).splice(0,10).map(x => x.flight.airplane);
  var rightParking = landed.filter(x => x.flight.landingTime > this.subtractMinutes(new Date(), 10) ).splice(0,10).map(x => x.flight.airplane);
  
  var toAnimateFromParkingToCollectPassengers = airplanesAboutToTakeOff
      .filter((el) => !this.airplanesAbautToTakeOff.value.includes(el));
  var toAnimateTakeOff = this.airplanesAbautToTakeOff.value
      .filter((el) => !airplanesAboutToTakeOff.includes(el));
  var toAnimateLanding = planesThatHaveLanded
      .filter((el) => !this.planesThatHaveLanded.value.includes(el));
  var toAnimateFromLandinToParking = this.planesThatHaveLanded.value
      .filter((el) => !planesThatHaveLanded.includes(el));

  this.toAnimateTakeOff.next(toAnimateTakeOff);
  this.toAnimateLanding.next(toAnimateLanding);

  this.airplanesAbautToTakeOff.next(airplanesAboutToTakeOff);
  this.leftParking.next(leftParking);
  this.planesThatHaveLanded.next(planesThatHaveLanded);
  this.rightParking.next(rightParking);
 }

 subtractMinutes(date: Date, minutes: number): Date {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - minutes);
  return result;
 }
 
 addMinutes (date: Date, minutes: number): Date {
   date.setMinutes(date.getMinutes() + minutes);
   return date;
 }
}
