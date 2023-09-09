import { IDeletedTripResult } from 'modules/trip/domain/interfaces/partials/deletedTripResult.interface';
import { ITripsQueryFilter } from 'modules/trip/domain/interfaces/partials/queryFilter.interface';
import { ITripRepository } from 'modules/trip/domain/repository/tripRepository.interface';
import { ITrip } from 'modules/trip/domain/interfaces/trip.interface';
import { TripEntity } from 'modules/trip/domain/entities/trip.entity';

export class TripService {

    public constructor(
        private readonly tripRepository: ITripRepository,
    ) {}

    public async findTripsByQuery(queryFilter: ITripsQueryFilter): Promise<TripEntity[]> {
        return this.tripRepository.findTripsByQuery(queryFilter);
    }

    public async addTrip(saveTrip: ITrip): Promise<TripEntity> {
        return this.tripRepository.addTrip(saveTrip);
    }

    public async updateTrip(id: string, updateTrip: ITrip): Promise<TripEntity> {
        return this.tripRepository.updateTrip(id, updateTrip);
    }

    public async deleteTrip(id: string): Promise<IDeletedTripResult> {
        try {
            return await this.tripRepository.deleteTrip(id);
        } catch(error) {
            throw new Error(`Failed to delete trip by id. Trip id: ${id}. Error: ${error.message}`);
        }
    }
}