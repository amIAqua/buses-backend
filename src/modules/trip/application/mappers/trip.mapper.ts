import { TripDbEntity } from 'modules/trip/application/orm/entities/tripDb.entity';
import { CreateTripDto } from 'modules/trip/application/dto/createTrip.dto';
import { UpdateTripDto } from 'modules/trip/application/dto/updateTrip.dto';
import { TripEntity } from 'modules/trip/domain/entities/trip.entity';
import { ITrip } from 'modules/trip/domain/interfaces/trip.interface';
import { TripDto } from 'modules/trip/application/dto/trip.dto';

export class TripMapper {

    public mapTripDbEntityToDomainEntity(dbEntity: TripDbEntity): TripEntity {
        const entity = new TripEntity();

        const departureLocation = {...dbEntity.departureLocation, id: dbEntity._id.toString()};
        delete departureLocation._id;

        const arrivalLocation = {...dbEntity.arrivalLocation, id: dbEntity._id.toString()};
        delete arrivalLocation._id;

        let stops = [];
        if (dbEntity.stops && dbEntity.stops.length) {
            stops = dbEntity.stops.map((stop) => {
                const stopMapped = {...stop, id: stop._id.toString()};
                delete stopMapped._id;

                return stopMapped;
            });
        }

        entity.id = dbEntity._id.toString();
        entity.status = dbEntity.status;
        entity.departureDateTime = dbEntity.departureDateTime;
        entity.departureLocation = departureLocation;
        entity.departurePlatform = dbEntity.departurePlatform;
        entity.arrivalDateTime = dbEntity.arrivalDateTime;
        entity.arrivalLocation = arrivalLocation;
        entity.arrivalPlatform = dbEntity.arrivalPlatform;
        entity.plannedArrivalDateTime = dbEntity.plannedArrivalDateTime;
        entity.duration = dbEntity.duration;
        entity.stops = stops;
        entity.benefits = dbEntity.benefits;
        entity.regularPrice = dbEntity.regularPrice;
        entity.type = dbEntity.type;
        entity.isSoldOut = dbEntity.isSoldOut;
        entity.maxSeats = dbEntity.maxSeats;
        entity.seatsAvailable = dbEntity.seatsAvailable;

        return entity;
    }

    public mapTripEntityToTripDto(entity: TripEntity): TripDto {
        const tripDto = new TripDto();

        tripDto.id = entity.id;
        tripDto.status = entity.status;
        tripDto.departureDateTime = entity.departureDateTime;
        tripDto.departureLocation = entity.departureLocation;
        tripDto.departurePlatform = entity.departurePlatform;
        tripDto.arrivalDateTime = entity.arrivalDateTime;
        tripDto.arrivalLocation = entity.arrivalLocation;
        tripDto.arrivalPlatform = entity.arrivalPlatform;
        tripDto.plannedArrivalDateTime = entity.plannedArrivalDateTime;
        tripDto.duration = entity.duration;
        tripDto.stops = entity.stops;
        tripDto.benefits = entity.benefits;
        tripDto.regularPrice = entity.regularPrice;
        tripDto.currency = entity.currency;
        tripDto.type = entity.type;
        tripDto.isSoldOut = entity.isSoldOut;
        tripDto.maxSeats = entity.maxSeats;
        tripDto.seatsAvailable = entity.seatsAvailable;

        return tripDto;
    }

    public mapCreateTripDtoToITrip(createLocationDto: CreateTripDto): ITrip {
        return {
            status: createLocationDto.status,
            departureDateTime: createLocationDto.departureDateTime,
            departureLocationId: createLocationDto.departureLocationId,
            departurePlatform: createLocationDto.departurePlatform,
            arrivalDateTime: createLocationDto.arrivalDateTime,
            arrivalLocationId: createLocationDto.arrivalLocationId,
            arrivalPlatform: createLocationDto.arrivalPlatform,
            plannedArrivalDateTime: createLocationDto.plannedArrivalDateTime,
            duration: createLocationDto.duration,
            stopIds: createLocationDto.stopIds,
            benefits: createLocationDto.benefits,
            regularPrice: createLocationDto.regularPrice,
            currency: createLocationDto.currency,
            type: createLocationDto.type,
            isSoldOut: createLocationDto.isSoldOut,
            maxSeats: createLocationDto.maxSeats,
            seatsAvailable: createLocationDto.seatsAvailable
        };
    }

    public mapUpdateTripDtoToITrip(updateLocationDto: UpdateTripDto): ITrip {
        return {
            status: updateLocationDto.status,
            departureDateTime: updateLocationDto.departureDateTime,
            departureLocationId: updateLocationDto.departureLocationId,
            departurePlatform: updateLocationDto.departurePlatform,
            arrivalDateTime: updateLocationDto.arrivalDateTime,
            arrivalLocationId: updateLocationDto.arrivalLocationId,
            arrivalPlatform: updateLocationDto.arrivalPlatform,
            plannedArrivalDateTime: updateLocationDto.plannedArrivalDateTime,
            duration: updateLocationDto.duration,
            stopIds: updateLocationDto.stopIds,
            benefits: updateLocationDto.benefits,
            regularPrice: updateLocationDto.regularPrice,
            currency: updateLocationDto.currency,
            type: updateLocationDto.type,
            isSoldOut: updateLocationDto.isSoldOut,
            maxSeats: updateLocationDto.maxSeats,
            seatsAvailable: updateLocationDto.seatsAvailable
        };
    }
}