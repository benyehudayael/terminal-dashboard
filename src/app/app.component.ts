import { Component, OnInit } from '@angular/core';
import { Summary } from 'src/model/Summary';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-Terminal-Dashboard'
  menuIconClicked = true
  summary: Summary
  lastMinutes: number = 30
  currentContent: string = 'Dashboard'
  constructor(private dataService : DataService) { 
  }

  ngOnInit(): void {
    //setInterval(() => { this.loadSummary() }, 1000);
    this.loadSummary();
  }
  openMenu(){
    this.menuIconClicked = !this.menuIconClicked;
  }
  loadSummary(){
    this.dataService.getSummary(this.lastMinutes)
    .subscribe((summary) => {
      this.summary = summary;
    })
  }
}
