import { Module } from '@nestjs/common';
import { AppConfigModule } from 'modules/global/appConfig/appConfig.module';
import { AppController } from 'modules/global/app/controllers/app.controller';
import { AppService } from 'modules/global/app/services/app.service';
import { StorageModule } from 'modules/global/storage/storage.module';
import { LocationModule } from 'modules/global/location/application/location.module';
import { TripModule } from 'modules/trip/application/trip.module';

@Module({
    imports: [
        AppConfigModule,
        StorageModule,
        LocationModule,
        TripModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
