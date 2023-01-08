import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Summary } from 'src/model/Summary';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-Terminal-Dashboard'
  menuIconClicked = true
  //summary: Summary
  summary: BehaviorSubject<Summary> = new BehaviorSubject<Summary>(null);
  summary$: Observable<Summary> = this.summary.asObservable();
  lastMinutes: number = 30
  timing: string = "Next"
  currentContent: string = 'Dashboard'
  timingClicked: boolean = false
  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    setInterval(() => { this.loadSummary() }, 6000);
  }
  openMenu() {
    this.menuIconClicked = !this.menuIconClicked;
  }
  changeLastMinutes(minutes: number) {
    this.lastMinutes = minutes;
    minutes < 0 ? this.timing = "Last" : this.timing = "Next";
  }
  loadSummary() {
    this.dataService.getSummary(this.lastMinutes)
      .subscribe((summary: Summary) => {
        this.summary.next(summary);
      })
  }
  animateDesign() {

  }
}
