import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ETripDeleteStatus } from 'modules/trip/domain/enums/eTripDeleteStatus.enum';

export class DeleteTripResultDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({title: 'deleteTripId', type: 'string'})
    public deleteTripId: string;

    @IsNotEmpty()
    @IsEnum(ETripDeleteStatus)
    @ApiProperty({enum: ETripDeleteStatus, example: ETripDeleteStatus.OK})
    public status: ETripDeleteStatus;
}