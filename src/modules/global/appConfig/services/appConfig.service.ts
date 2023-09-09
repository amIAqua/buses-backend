import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    public constructor(private readonly configService: ConfigService) {}

    public getAppEnv(): string {
        return this.configService.get('APP_ENV');
    }

    public getAppVersion(): string {
        return this.configService.get('APP_VERSION');
    }

    public getAppPort(): string {
        return this.configService.get('APP_PORT');
    }

    // public getMongoDbHost(): string {
    //     return this.configService.get('MONGO_DB_HOST');
    // }

    // public getMongoDbCluster(): string {
    //     return this.configService.get('MONGO_DB_CLUSTER');
    // }

    // public getMongoDbPassword(): string {
    //     return this.configService.get('MONGO_DB_PASSWORD');
    // }

    // public getMongoDbDatabase(): string {
    //     return this.configService.get('MONGO_DB_DATABASE');
    // }

    public getMongoDbConnectionUrl(): string {
        let connectionUrl = this.configService.get('MONGO_DB_HOST');
        connectionUrl += `:${this.configService.get('MONGO_DB_PASSWORD')}`;
        connectionUrl += `@${this.configService.get('MONGO_DB_CLUSTER')}`;
        connectionUrl += `/${this.configService.get('MONGO_DB_DATABASE')}`;

        return connectionUrl;
    }

    public getGoogleMapsApiKey(): string {
        return this.configService.get('GOOGLE_MAPS_API_KEY');
    }

    public getGoogleMapsApiUrl(): string {
        return this.configService.get('GOOGLE_MAPS_API_URL');
    }
}