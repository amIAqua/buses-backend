import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsEnum, ValidateNested, IsBoolean, IsOptional } from 'class-validator';
import { LocationDto } from 'modules/global/location/application/dto/location.dto';
import { BenefitDto } from 'modules/trip/application/dto/partials/benefit.dto';
import { ETripStatus } from 'modules/trip/domain/enums/eTripStatus.enum';
import { ECurrency } from 'modules/trip/domain/enums/eCurrency.enum';
import { ETripType } from 'modules/trip/domain/enums/eTripType.enum';

export class TripDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({title: 'id', type: 'string'})
    public id: string;

    @IsNotEmpty()
    @IsEnum(ETripStatus)
    @ApiProperty({enum: ETripStatus, example: ETripStatus.PLANNED})
    public status: ETripStatus;

    @IsString()
    @IsNotEmpty()
    @ValidateNested()
    @ApiProperty({title: 'departureLocation', type: LocationDto})
    public departureLocation: LocationDto;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({title: 'departureDateTime', type: Date})
    public departureDateTime: Date;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({title: 'departurePlatform', type: Number})
    public departurePlatform?: number;

    @IsString()
    @IsNotEmpty()
    @ValidateNested()
    @ApiProperty({title: 'arrivalLocation', type: LocationDto})
    public arrivalLocation: LocationDto;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({title: 'arrivalDateTime', type: Date})
    public arrivalDateTime: Date;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({title: 'arrivalPlatform', type: Number})
    public arrivalPlatform?: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({title: 'plannedArrivalDateTime', type: Date})
    public plannedArrivalDateTime: Date;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({title: 'duration', type: 'number'})
    public duration: number;

    @IsString()
    @IsNotEmpty()
    @ValidateNested()
    @ApiProperty({title: 'stops', type: [LocationDto]})
    public stops: LocationDto[];

    @IsString()
    @IsNotEmpty()
    @ValidateNested()
    @ApiProperty({title: 'benefits', type: [BenefitDto]})
    public benefits: BenefitDto[];

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({title: 'regularPrice', type: 'number'})
    public regularPrice: number;

    @IsNotEmpty()
    @IsEnum(ECurrency)
    @ApiProperty({enum: ECurrency, example: ECurrency.EUR})
    public currency: ECurrency;

    @IsNotEmpty()
    @IsEnum(ETripType)
    @ApiProperty({enum: ETripType, example: ETripType.DIRECT})
    public type: ETripType;

    @IsBoolean()
    @IsOptional()
    @ApiPropertyOptional({title: 'isSoldOut', type: Boolean})
    public isSoldOut?: boolean;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({title: 'maxSeats', type: Number})
    public maxSeats: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({title: 'seatsAvailable', type: Number})
    public seatsAvailable: number;
}