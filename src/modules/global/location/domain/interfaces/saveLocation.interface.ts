import { IGeoPoint } from 'modules/global/location/domain/interfaces/partials/geoPoint.interface';

export interface ISaveLocation {
    cityName: string;
    countryName: string;
    fullName: string;
    hubName: string;
    hubAddress: string;
    geoPoint: IGeoPoint;
    hubGeoPoint: IGeoPoint;
}