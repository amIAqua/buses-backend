import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class BenefitDto {

    @IsString()
    @ApiProperty({ title: 'title', type: 'string' })
    public title: string;
}