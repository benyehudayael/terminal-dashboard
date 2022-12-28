import { Airplane } from "./Airplane";
import { Airport } from "./Airport";

export class Flight{
    constructor(
        public id : string, 
        public numberId: string,
        public departureTime: Date,
        public landingTime: Date,
        public fromIdent: string,
        public toIdent: string,
        public fromAirport: Airport,
        public toAirport: Airport,        
        public airplane: Airplane,
         ) {}
}