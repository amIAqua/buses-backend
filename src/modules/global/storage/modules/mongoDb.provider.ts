import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from 'modules/global/appConfig/appConfig.module';
import { AppConfigService } from 'modules/global/appConfig/services/appConfig.service';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [AppConfigModule],
            useFactory: (appConfigService: AppConfigService) => {
                return {
                    uri: appConfigService.getMongoDbConnectionUrl(),

                }
            },
            inject: [AppConfigService]
        })
    ],
    providers: [],
    exports: []
})
export class MongoDbModule {}