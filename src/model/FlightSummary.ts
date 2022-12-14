export class FlightSummary {
    tookOff: number
    aboutToLand: number
    atTheAirport: number
    constructor(flightSummary: FlightSummary){
       this.tookOff = flightSummary.tookOff
       this.aboutToLand = flightSummary.aboutToLand
       this.atTheAirport = flightSummary.atTheAirport
    }
}