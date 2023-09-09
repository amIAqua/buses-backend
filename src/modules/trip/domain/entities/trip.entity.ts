import { ILocation } from 'modules/global/location/domain/interfaces/location.interface';
import { IBenefit } from 'modules/trip/domain/interfaces/partials/benefit.interface';
import { ETripStatus } from 'modules/trip/domain/enums/eTripStatus.enum';
import { ETripType } from 'modules/trip/domain/enums/eTripType.enum';
import { ECurrency } from 'modules/trip/domain/enums/eCurrency.enum';

export class TripEntity {
    public id: string;
    public status: ETripStatus;
    public departureLocation: ILocation;
    public departureDateTime: Date;
    public departurePlatform?: number;
    public arrivalLocation: ILocation;
    public arrivalDateTime: Date;
    public arrivalPlatform?: number;
    public plannedArrivalDateTime: Date;
    public duration: number;
    public stops: ILocation[];
    public benefits: IBenefit[];
    public regularPrice: number;
    public currency: ECurrency;
    public type: ETripType;
    public isSoldOut?: boolean;
    public maxSeats: number;
    public seatsAvailable: number;
}