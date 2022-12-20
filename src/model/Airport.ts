
export class Airport{
    constructor(
       public Ident: string,
        public Type: string,
        public Name: string,
        public Elevation_ft: string,
        public Continent: string,
        public Iso_country: string,
        public Iso_region: string,
        public Municipality: string,
        public Gps_code: string,
        public Iata_code: string,
        public Local_code: string,
        public Coordinates: string ) {}
}