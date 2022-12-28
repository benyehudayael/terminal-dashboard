import { Flight } from "./Flight";

export class FlightSummary{
    constructor(
        public flight: Flight, 
        public isLanding: boolean, // isoCode of airport,
        public time: string
    ) {}
}