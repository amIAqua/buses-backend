import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { GeoPointDto } from 'modules/global/location/application/dto/partials/geoPoint.dto';

export class LocationDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({title: 'id', type: 'string'})
    public id: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({title: 'cityName', type: 'string'})
    public cityName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({title: 'countryName', type: 'string'})
    public countryName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({title: 'fullName', type: 'string'})
    public fullName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({title: 'hubName', type: 'string'})
    public hubName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({title: 'hubAddress', type: 'string'})
    public hubAddress: string;

    @IsString()
    @IsNotEmpty()
    @ValidateNested()
    @ApiProperty({title: 'geoPoint', type: GeoPointDto})
    public geoPoint: GeoPointDto;

    @IsString()
    @IsNotEmpty()
    @ValidateNested()
    @ApiProperty({title: 'hubGeoPoint', type: GeoPointDto})
    public hubGeoPoint: GeoPointDto;
}