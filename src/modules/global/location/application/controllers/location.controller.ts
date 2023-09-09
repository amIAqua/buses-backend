import { Controller, Query, Get, Post, Body } from '@nestjs/common';
import { ApiQuery, ApiTags, ApiBody, ApiOkResponse } from '@nestjs/swagger';
import { CreateLocationDto } from 'modules/global/location/application/dto/createLocation.dto';
import { LocationMapper } from 'modules/global/location/application/mappers/location.mapper';
import { LocationService } from 'modules/global/location/domain/services/location.service';
import { LocationDto } from 'modules/global/location/application/dto/location.dto';

@Controller('location')
@ApiTags('location')
export class LocationController {

    public constructor(
        private readonly locationService: LocationService,
        private readonly locationMapper: LocationMapper
    ) {}

    @Get('/detail')
    @ApiQuery({name: 'id', type: 'string'})
    @ApiOkResponse({type: LocationDto})
    public async findLocationById(
        @Query('id') id: string
    ): Promise<any> {
        return this.locationMapper.mapLocationEntityToLocationDto(
            await this.locationService.findLocationById(id)
        );
    }

    @Get('/suggestions')
    @ApiQuery({name: 'query', type: 'string'})
    @ApiOkResponse({type: [LocationDto]})
    public async findSuggestionsByQuery(
        @Query('query') query: string
    ): Promise<LocationDto[]> {
        return await this.locationService.findSuggestionsByQuery(query);
    }

    @Post('/add')
    @ApiBody({type: CreateLocationDto})
    @ApiOkResponse({type: LocationDto})
    public async addLocation(
        @Body() createLocationDto: CreateLocationDto
    ): Promise<LocationDto> {
        const saveLocation = this.locationMapper.mapCreateLocationDtoToSaveLocation(createLocationDto);

        return this.locationMapper.mapLocationEntityToLocationDto(
            await this.locationService.addLocation(saveLocation)
        );
    }
}