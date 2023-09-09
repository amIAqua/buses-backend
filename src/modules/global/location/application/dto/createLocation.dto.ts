import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { GeoPointDto } from 'modules/global/location/application/dto/partials/geoPoint.dto';

export class CreateLocationDto {

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

    @IsNotEmpty()
    @Type(() => GeoPointDto)
    @ValidateNested()
    @ApiProperty({title: 'geoPoint', type: GeoPointDto})
    public geoPoint: GeoPointDto;

    @IsNotEmpty()
    @Type(() => GeoPointDto)
    @ValidateNested()
    @ApiProperty({title: 'hubGeoPoint', type: GeoPointDto})
    public hubGeoPoint: GeoPointDto;
}