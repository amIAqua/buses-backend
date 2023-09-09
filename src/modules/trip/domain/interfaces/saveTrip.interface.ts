import { IBenefit } from 'modules/trip/domain/interfaces/partials/benefit.interface';
import { ETripStatus } from 'modules/trip/domain/enums/eTripStatus.enum';
import { ETripType } from 'modules/trip/domain/enums/eTripType.enum';

export interface ISaveTrip {
    status: ETripStatus;
    departureLocationId: string;
    departureDateTime: Date;
    arrivalLocationId: string;
    arrivalDateTime: Date;
    plannedArrivalDateTime: Date;
    duration: number;
    stopIds?: string[];
    benefits: IBenefit[];
    priceVAT: number;
    price: number;
    type: ETripType;
}