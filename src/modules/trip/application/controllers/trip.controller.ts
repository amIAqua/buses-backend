import { ApiQuery, ApiTags, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { Controller, Query, Get, Post, Put, Body, Delete, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { DeleteTripResultDto } from 'modules/trip/application/dto/deleteTripResult.dto';
import { CreateTripDto } from 'modules/trip/application/dto/createTrip.dto';
import { UpdateTripDto } from 'modules/trip/application/dto/updateTrip.dto';
import { TripMapper } from 'modules/trip/application/mappers/trip.mapper';
import { TripService } from 'modules/trip/domain/services/trip.service';
import { TripDto } from 'modules/trip/application/dto/trip.dto';

@Controller('trip')
@ApiTags('trip')
export class TripController {

    public constructor(
        private readonly tripMapper: TripMapper,
        private readonly tripService: TripService
    ) {}

    @Get()
    @ApiQuery({name: 'limit', type: 'number'})
    @ApiQuery({name: 'skip', type: 'number'})
    @ApiOkResponse({type: [TripDto]})
    public async findLocationById(
        @Query('limit', new DefaultValuePipe(10), new ParseIntPipe()) limit?: number,
        @Query('skip', new DefaultValuePipe(0), new ParseIntPipe()) skip?: number
    ): Promise<TripDto[]> {
        return await this.tripService.findTripsByQuery({
            limit,
            skip
        });
    }

    @Post()
    @ApiBody({type: CreateTripDto})
    @ApiOkResponse({type: TripDto})
    public async addTrip(
        @Body() createTripDto: CreateTripDto
    ): Promise<TripDto> {
        const saveTrip = this.tripMapper.mapCreateTripDtoToITrip(createTripDto);

        return this.tripMapper.mapTripEntityToTripDto(
            await this.tripService.addTrip(saveTrip)
        );
    }

    @Put()
    @ApiBody({type: UpdateTripDto})
    @ApiQuery({name: 'id', type: 'string'})
    @ApiOkResponse({type: TripDto})
    public async updateTrip(
        @Body() updateTripDto: UpdateTripDto,
        @Query('id') id: string,
    ): Promise<TripDto> {
        const updateTrip = this.tripMapper.mapUpdateTripDtoToITrip(updateTripDto);

        return this.tripMapper.mapTripEntityToTripDto(
            await this.tripService.updateTrip(id, updateTrip)
        );
    }

    @Delete()
    @ApiQuery({name: 'id', type: 'string'})
    @ApiOkResponse({type: DeleteTripResultDto})
    public async deleteTrip(
        @Query('id') tripId: string,
    ): Promise<any> {
        return await this.tripService.deleteTrip(tripId);
    }
}