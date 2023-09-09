import { ILocationRepository } from 'modules/global/location/domain/repository/locationRepository.interface';
import { ISaveLocation } from 'modules/global/location/domain/interfaces/saveLocation.interface';
import { LocationEntity } from 'modules/global/location/domain/entities/location.entity';

export class LocationService {

    public constructor(private readonly locationRepository: ILocationRepository) {}

    public async findSuggestionsByQuery(query: string): Promise<LocationEntity[]> {
        return await this.locationRepository.findSuggestionsByQuery(query);
    }

    public async findLocationById(id: string): Promise<LocationEntity> {
        return await this.locationRepository.findLocationById(id);
    }

    public async addLocation(saveLocation: ISaveLocation): Promise<LocationEntity> {
        return await this.locationRepository.addLocation(saveLocation);
    }
}