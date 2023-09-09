import { LocationEntity } from 'modules/global/location/domain/entities/location.entity';
import { ISaveLocation } from 'modules/global/location/domain/interfaces/saveLocation.interface';

export interface ILocationRepository {
    findSuggestionsByQuery: (query: string) => Promise<LocationEntity[]>;
    // findLocationByQuery: (query: string) => Promise<LocationEntity>;
    findLocationById: (id: string) => Promise<LocationEntity>;
    addLocation: (location: ISaveLocation) => Promise<LocationEntity>;
}