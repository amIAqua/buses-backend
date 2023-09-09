import * as Joi from 'joi';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from 'modules/global/appConfig/services/appConfig.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            validationSchema: Joi.object({
                APP_ENV: Joi.string().required(),
                APP_VERSION: Joi.string().required(),
                APP_PORT: Joi.string().required(),
                MONGO_DB_HOST: Joi.string().required(),
                MONGO_DB_CLUSTER: Joi.string().required(),
                MONGO_DB_PASSWORD: Joi.string().required(),
                MONGO_DB_DATABASE: Joi.string().required(),
                GOOGLE_MAPS_API_KEY: Joi.string().required(),
                GOOGLE_MAPS_API_URL: Joi.string().required(),
            }),
        })
    ],
    providers: [AppConfigService],
    exports: [AppConfigService]
})
export class AppConfigModule{}