import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Max, IsOptional } from 'class-validator';

export class TripsQueryFilterDto {

    @Max(20)
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional({ title: 'limit', type: 'number' })
    public limit?: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    @ApiPropertyOptional({ title: 'skip', type: 'number' })
    public skip?: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ title: 'departureLocationId', type: 'string' })
    public departureLocationId?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ title: 'arrivalLocationId', type: 'string' })
    public arrivalLocationId?: string;
}