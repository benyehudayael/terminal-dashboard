export class Airplane{
    id: string
    firmID: string
    totalSeats: number
    constructor(airplane:Airplane){
       this.id = airplane.id
       this.firmID = airplane.firmID
       this.totalSeats = airplane.totalSeats
       
    }
}