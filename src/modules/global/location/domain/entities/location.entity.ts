import { IGeoPoint } from 'modules/global/location/domain/interfaces/partials/geoPoint.interface';

export class LocationEntity {
    public id: string;
    public cityName: string;
    public countryName: string;
    public fullName: string;
    public hubName: string;
    public hubAddress: string;
    public geoPoint: IGeoPoint;
    public hubGeoPoint: IGeoPoint;
}