import { IBenefit } from 'modules/trip/domain/interfaces/partials/benefit.interface';
import { ETripStatus } from 'modules/trip/domain/enums/eTripStatus.enum';
import { ETripType } from 'modules/trip/domain/enums/eTripType.enum';
import { ECurrency } from 'modules/trip/domain/enums/eCurrency.enum';

export interface ITrip {
    status: ETripStatus;
    departureLocationId: string;
    departureDateTime: Date;
    departurePlatform?: number;
    arrivalLocationId: string;
    arrivalDateTime: Date;
    arrivalPlatform?: number;
    plannedArrivalDateTime: Date;
    duration: number;
    stopIds?: string[];
    benefits: IBenefit[];
    regularPrice: number;
    currency: ECurrency;
    type: ETripType;
    isSoldOut?: boolean;
    maxSeats: number;
    seatsAvailable: number;
}