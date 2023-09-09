import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TripDbEntity, TripDbSchema } from 'modules/trip/application/orm/entities/tripDb.entity';
import { TripDbRepository } from 'modules/trip/application/orm/repositories/tripDb.repository';
import { TripController } from 'modules/trip/application/controllers/trip.controller';
import { LocationModule } from 'modules/global/location/application/location.module';
import { TripQueryBuilder } from 'modules/trip/application/utils/queryBuilder.util';
import { MongoDbModule } from 'modules/global/storage/modules/mongoDb.provider';
import { AppConfigModule } from 'modules/global/appConfig/appConfig.module';
import { TripMapper } from 'modules/trip/application/mappers/trip.mapper';
import { TripService } from 'modules/trip/domain/services/trip.service';

const providers: Provider[] = [
    {
        provide: TripService,
        useFactory: (
            tripDbRepository: TripDbRepository,
        ) => {
            return new TripService(
                tripDbRepository,
            );
        },
        inject: [TripDbRepository]
    },
    {
        provide: TripQueryBuilder,
        useClass: TripQueryBuilder
    },
    {
        provide: TripMapper,
        useClass: TripMapper
    },
];

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: TripDbEntity.name, schema: TripDbSchema}
        ]),
        AppConfigModule,
        LocationModule,
        MongoDbModule
    ],
    controllers: [TripController],
    providers: [...providers, TripDbRepository]
})
export class TripModule {}