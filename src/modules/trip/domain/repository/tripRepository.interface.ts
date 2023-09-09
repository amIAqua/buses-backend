import { ITripsQueryFilter } from 'modules/trip/domain/interfaces/partials/queryFilter.interface';
import { ITrip } from 'modules/trip/domain/interfaces/trip.interface';
import { TripEntity } from 'modules/trip/domain/entities/trip.entity';

export interface ITripRepository {
    findTripsByQuery: (queryFilter: ITripsQueryFilter) => Promise<TripEntity[]>;
    addTrip: (saveTrip: ITrip) => Promise<TripEntity>;
    updateTrip: (id: string, tripToUpdate: ITrip) => Promise<TripEntity>;
    deleteTrip: (id: string) => Promise<any>;
}