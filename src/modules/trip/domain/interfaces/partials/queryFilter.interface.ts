export interface ITripsQueryFilter {
    limit?: number;
    skip?: number;
    departureLocationId?: string;
    arrivalLocationId?: string;
}