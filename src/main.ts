import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppConfigService } from 'modules/global/appConfig/services/appConfig.service';
import { AllExceptionsFilter } from 'modules/global/app/filters/exception.filter';
import { AppModule } from 'modules/global/app/app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const appConfig = app.get(AppConfigService);

    app.use(bodyParser.json({ limit: '50mb' }));
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    app.setGlobalPrefix(`api/${appConfig.getAppVersion()}`);

    app.useGlobalFilters(new AllExceptionsFilter());

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: false,
            disableErrorMessages: false,
        })
    );

    const config = new DocumentBuilder()
        .setTitle('Expenses API')
        .setDescription('')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`api/${appConfig.getAppVersion()}/explorer`, app, document);

    await app.listen(appConfig.getAppPort());
}

bootstrap();
