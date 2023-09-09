import { LocationDbEntity } from 'modules/global/location/application/orm/entities/locationDb.entity';
import { ISaveLocation } from 'modules/global/location/domain/interfaces/saveLocation.interface';
import { CreateLocationDto } from 'modules/global/location/application/dto/createLocation.dto';
import { LocationEntity } from 'modules/global/location/domain/entities/location.entity';
import { LocationDto } from 'modules/global/location/application/dto/location.dto';

export class LocationMapper {

    public mapLocationDbEntityToDomainEntity(dbEntity: LocationDbEntity): LocationEntity {
        const entity = new LocationEntity();

        entity.id = dbEntity._id.toString();
        entity.cityName = dbEntity.cityName;
        entity.countryName = dbEntity.countryName;
        entity.fullName = dbEntity.fullName;
        entity.hubName = dbEntity.hubName;
        entity.hubAddress = dbEntity.hubAddress;
        entity.geoPoint = {
            lat: dbEntity.geoPoint.lat,
            lng: dbEntity.geoPoint.lng
        };
        entity.hubGeoPoint = {
            lat: dbEntity.hubGeoPoint.lat,
            lng: dbEntity.hubGeoPoint.lng
        };

        return entity;
    }

    public mapCreateLocationDtoToSaveLocation(createLocationDto: CreateLocationDto): ISaveLocation {
        return {
            cityName: createLocationDto.cityName,
            countryName: createLocationDto.countryName,
            fullName: createLocationDto.fullName,
            hubName: createLocationDto.hubName,
            hubAddress: createLocationDto.hubAddress,
            geoPoint: createLocationDto.geoPoint,
            hubGeoPoint: createLocationDto.hubGeoPoint
        }
    }

    public mapSaveLocationToLocationDbEntity(saveLocation: ISaveLocation): LocationDbEntity {
        const locationDbEntity = new LocationDbEntity();

        locationDbEntity.cityName = saveLocation.cityName;
        locationDbEntity.countryName = saveLocation.countryName;
        locationDbEntity.fullName = saveLocation.fullName;
        locationDbEntity.hubName = saveLocation.hubName;
        locationDbEntity.hubAddress = saveLocation.hubAddress;

        locationDbEntity.geoPoint = {
            lat: saveLocation.geoPoint.lat,
            lng: saveLocation.geoPoint.lng
        };

        locationDbEntity.hubGeoPoint = {
            lat: saveLocation.hubGeoPoint.lat,
            lng: saveLocation.hubGeoPoint.lng
        };

        return locationDbEntity;
    }

    public mapLocationEntityToLocationDto(entity: LocationEntity): LocationDto {
        const locationDto = new LocationDto();

        locationDto.id = entity.id;
        locationDto.cityName = entity.cityName;
        locationDto.countryName = entity.countryName;
        locationDto.fullName = entity.fullName;
        locationDto.hubName = entity.hubName;
        locationDto.hubAddress = entity.hubAddress;
        locationDto.geoPoint = entity.geoPoint;
        locationDto.hubGeoPoint = entity.hubGeoPoint;

        return locationDto;
    }
}