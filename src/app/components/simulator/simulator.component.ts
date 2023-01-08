import { ElementRef, Renderer2 } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Airplane } from 'src/model/Airplane';
import { Flight } from 'src/model/Flight';
import { FlightSummary } from 'src/model/FlightSummary';
import { Resource } from 'src/model/resource';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SimulatorComponent {
  data: FlightSummary[];

  lastMinutes: number = 40;
  intervalUpdater: any;
  resources: Resource[];

  airplanes: BehaviorSubject<Airplane[]> = new BehaviorSubject<Airplane[]>([]);
  airplanes$: Observable<Airplane[]> = this.airplanes.asObservable();

  constructor(private dataService: DataService, protected sanitizer: DomSanitizer, private elementRef: ElementRef, private renderer: Renderer2) {
    this.resources = [
      ...([...Array(10).keys()].map<Resource>(x => new Resource(x, 'D', ''))),
      ...([...Array(10).keys()].map<Resource>(x => new Resource(x, 'DP', ''))),
      ...([...Array(10).keys()].map<Resource>(x => new Resource(x, 'LP', ''))),
      ...([...Array(10).keys()].map<Resource>(x => new Resource(x, 'L', '')))];
  }

  ngOnInit(): void {
    this.getFlights();
  }

  getFlights() {
    this.dataService.getFlights(1, 30).subscribe((data: FlightSummary[]) => {
      this.data = data;
      this.airplanes.next(data.map(x => x.flight.airplane));
      this.scheduleAirplansMovements();
    });
  }

  getResourcePosition(res: Resource) {
    var pos = {};
    switch (res.type) {
      case 'D':
        pos['x'] = 628;
        pos['y'] = 206 + res.id * 30;
        break;
      case 'DP':
        pos['x'] = 680;
        pos['y'] = 206 + res.id * 30;
        break;
      case 'LP':
        pos['x'] = 818;
        pos['y'] = 206 + res.id * 30;
        break;
      case 'L':
        pos['x'] = 861;
        pos['y'] = 206 + res.id * 30;
        break;
    }
    return pos;
  }

  scheduleAirplansMovements() {
    this.data.forEach(x => {
      if (x.isLanding) {
        setTimeout(() => this.tryLanding(x), (x.flight.landingTime.getTime() - (new Date().getTime())));
      } else {
        setTimeout(() => this.showAtDepartureParking(x), (x.flight.departureTime.setMinutes(x.flight.departureTime.getMinutes() - 20) - (new Date().getTime())));
      }
    });
  }
  showAtDepartureParking(x: FlightSummary): void {
    var res = this.getResource(x.flight.airplane.id, 'DP');
    var Dres = this.getResource(x.flight.airplane.id, 'D');
    if (res) {
      var pos = this.getResourcePosition(res);
      var div = document.getElementById(x.flight.airplane.id);
      div.style.top = pos['y'] + 'px';
      div.style.left = pos['x'] + 'px';
      div.style.display = 'block';
      if (Dres) setTimeout(() => this.animateParkingToDeparture(x.flight.airplane, Dres), 600000);
      else setTimeout(() => this.animateParkingToDeparture(x.flight.airplane, Dres), 6000);
    } else setTimeout(() => this.showAtDepartureParking(x), 6000);
  }

  animateParkingToDeparture(airplane: Airplane, res: Resource): void {
    var pos = this.getResourcePosition(res);
    var div = document.getElementById(airplane.id);
    div.style.top = pos['y'] + 'px';
    div.style.left = pos['x'] + 'px';
    setTimeout(() => this.animateDeparture(airplane.id), 600000);
  }
  animateDeparture(id: string): void {
    var div = document.getElementById(id);
    div.classList.add('animate-departure');
    setTimeout(() => this.removeAirplane(id), 6000)
  }

  tryLanding(x: FlightSummary) {
    var res = this.getResource(x.flight.airplane.id, 'L');
    if (res) this.animateLanding(x, this.getResourcePosition(res));
    else setTimeout(() => this.tryLanding(x), 6000);
  }

  animateLanding(x: FlightSummary, pos: any) {
    var div = document.getElementById(x.flight.airplane.id);
    div.classList.add('animate-landing');
    setTimeout(() => this.animateAirplaneToResource(pos, x), 6000)
  }

  animateAirplaneToResource(pos: any, x: FlightSummary): void {
    var div = document.getElementById(x.flight.airplane.id);
    div.style.display = 'block';
    div.classList.remove('animate-landing');
    div.style.top = pos['y'] + 'px';
    div.style.left = pos['x'] + 'px';
    setTimeout(() => this.tryLandingToParking(x), 600000);
  }

  tryLandingToParking(x: FlightSummary) {
    var res = this.getResource(x.flight.airplane.id, 'LP');
    if (res) {
      this.animateLandingToParking(x.flight.airplane, res);
    }
    else
      setTimeout(() => this.tryLandingToParking(x), 60000);
  }

  animateLandingToParking(airplane: Airplane, res: Resource) {
    var pos = this.getResourcePosition(res);
    var div = document.getElementById(airplane.id);
    div.style.top = pos['y'] + 'px';
    div.style.left = pos['x'] + 'px';
    setTimeout(() => this.removeAirplane(airplane.id), 600000);
  }

  removeAirplane(id: string): void {
    document.getElementById(id).remove();
  }

  getResource(airplanId: string, type: string) {
    var res = this.resources.find(x => x.type == type && x.value == '');
    if (res != null) {
      this.resources.map(x => {
        if (x.value == airplanId)
          x.value = '';
        if (x.type == type && x.id == res.id)
          x.value = airplanId;
        return x;
      });
      return res;
    }
    else
      return null;
  }
}
