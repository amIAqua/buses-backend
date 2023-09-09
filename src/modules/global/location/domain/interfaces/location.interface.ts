import { IGeoPoint } from 'modules/global/location/domain/interfaces/partials/geoPoint.interface';

export interface ILocation {
    id: string;
    cityName: string;
    countryName: string;
    fullName: string;
    hubName: string;
    hubAddress: string;
    geoPoint: IGeoPoint;
    hubGeoPoint: IGeoPoint;
}