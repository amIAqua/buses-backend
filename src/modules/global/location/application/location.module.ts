import { Module, Provider } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationDbEntity, LocationDbSchema } from 'modules/global/location/application/orm/entities/locationDb.entity';
import { LocationDbRepository } from 'modules/global/location/application/orm/repositories/locationDb.repository';
import { LocationController } from 'modules/global/location/application/controllers/location.controller';
import { LocationQueryBuilder } from 'modules/global/location/application//utils/queryBuilder.util';
import { LocationMapper } from 'modules/global/location/application/mappers/location.mapper';
import { LocationService } from 'modules/global/location/domain/services/location.service';
import { MongoDbModule } from 'modules/global/storage/modules/mongoDb.provider';
import { AppConfigModule } from 'modules/global/appConfig/appConfig.module';

const providers: Provider[] = [
    {
        provide: LocationService,
        useFactory: (locationDbRepository: LocationDbRepository) => {
            return new LocationService(locationDbRepository);
        },
        inject: [LocationDbRepository]
    },
    {
        provide: LocationMapper,
        useClass: LocationMapper
    },
    {
        provide: LocationQueryBuilder,
        useClass: LocationQueryBuilder
    },
];

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: LocationDbEntity.name, schema: LocationDbSchema}
        ]),
        AppConfigModule,
        MongoDbModule
    ],
    controllers: [LocationController],
    providers: [...providers, LocationDbRepository],
    exports: [LocationService]
})
export class LocationModule {}