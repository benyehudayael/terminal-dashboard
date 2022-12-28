import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { SimulatorComponent } from './components/simulator/simulator.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    SimulatorComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    DatePipe
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
