import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ILocationRepository } from 'modules/global/location/domain/repository/locationRepository.interface';
import { LocationDbEntity } from 'modules/global/location/application/orm/entities/locationDb.entity';
import { LocationQueryBuilder } from 'modules/global/location/application/utils/queryBuilder.util';
import { ISaveLocation } from 'modules/global/location/domain/interfaces/saveLocation.interface';
import { LocationMapper } from 'modules/global/location/application/mappers/location.mapper';
import { LocationEntity } from 'modules/global/location/domain/entities/location.entity';

@Injectable()
export class LocationDbRepository implements ILocationRepository {

    public constructor(
        private readonly locationMapper: LocationMapper,
        private readonly locationQueryBuilder: LocationQueryBuilder,
        @InjectModel(LocationDbEntity.name) private locationDbRepositoryModel: Model<LocationDbEntity>
    ) {}

    public async findSuggestionsByQuery(query: string): Promise<LocationEntity[]> {
        const aggregationQuery = this.locationQueryBuilder.buildAggregationQuery(
            'location_text_fields_autocomplete',
            query,
            'autocomplete',
            ['cityName', 'countryName', 'hubName'],
            true
        );

        const aggregationResult = await this.locationDbRepositoryModel.aggregate(aggregationQuery);

        return aggregationResult.map((locatioDbEntity) => {
            return this.locationMapper.mapLocationDbEntityToDomainEntity(locatioDbEntity);
        });
    }

    public async findLocationById(id: string): Promise<LocationEntity> {
        return this.locationMapper.mapLocationDbEntityToDomainEntity(
            await this.locationDbRepositoryModel.findById(id).exec()
        );
    }

    public async addLocation(saveLocation: ISaveLocation): Promise<LocationEntity> {
        const createdLocation = new this.locationDbRepositoryModel(
            this.locationMapper.mapSaveLocationToLocationDbEntity(
                saveLocation
            )
        );

        return this.locationMapper.mapLocationDbEntityToDomainEntity(
            await createdLocation.save()
        );
    }
}