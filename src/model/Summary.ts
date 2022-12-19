export class Summary {
    tookOff: number
    aboutToLand: number
    atTheAirport: number
    sumOfAirplanes: number
    passengersInTheAirportArea: number
    tookOffPassengers: number
    landSoonPassengers: number
    suitcasesWaitingToBeUnloaded: number
    suitcasesOnAConveyorBelt: number
    suitcasesWaitingToBeloaded: number

    constructor(Summary: Summary){
       this.tookOff = Summary.tookOff
       this.aboutToLand = Summary.aboutToLand
       this.atTheAirport = Summary.atTheAirport
       this.sumOfAirplanes = Summary.sumOfAirplanes
       this.passengersInTheAirportArea = Summary.passengersInTheAirportArea
       this.tookOffPassengers = Summary.tookOffPassengers
       this.landSoonPassengers = Summary.landSoonPassengers
       this.suitcasesWaitingToBeUnloaded = Summary.suitcasesWaitingToBeUnloaded
       this.suitcasesOnAConveyorBelt = Summary.suitcasesOnAConveyorBelt
       this.suitcasesWaitingToBeloaded = Summary.suitcasesWaitingToBeloaded
    }
}