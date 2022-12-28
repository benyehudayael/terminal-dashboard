export class Summary {
    aboutToTakeOff: number
    aboutToLand: number
    atTheAirport: number
    sumOfAirplanes: number
    passengersInTheAirportArea: number
    passengersAboutToTakeOff: number
    landedPassengers: number
    suitcasesWaitingToBeUnloaded: number
    suitcasesOnAConveyorBelt: number
    suitcasesWaitingToBeloaded: number

    constructor(Summary: Summary){
       this.aboutToTakeOff = Summary.aboutToTakeOff
       this.aboutToLand = Summary.aboutToLand
       this.atTheAirport = Summary.atTheAirport
       this.sumOfAirplanes = Summary.sumOfAirplanes
       this.passengersInTheAirportArea = Summary.passengersInTheAirportArea
       this.passengersAboutToTakeOff = Summary.passengersAboutToTakeOff
       this.landedPassengers = Summary.landedPassengers
       this.suitcasesWaitingToBeUnloaded = Summary.suitcasesWaitingToBeUnloaded
       this.suitcasesOnAConveyorBelt = Summary.suitcasesOnAConveyorBelt
       this.suitcasesWaitingToBeloaded = Summary.suitcasesWaitingToBeloaded
    }
}