import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GeoPointDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({title: 'lat', type: 'number'})
    public lat: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({title: 'lng', type: 'number'})
    public lng: number;
}