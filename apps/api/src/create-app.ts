import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  const configuredOrigins =
    process.env.CORS_ORIGINS
      ?.split(',')
      .map(origin => origin.trim())
      .filter(Boolean) ?? [];

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://sicilytrip-web.vercel.app',
      ...configuredOrigins,
    ],
    credentials: true,
  });

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('SicilyTrip API')
    .setDescription('Luxury Travel Platform API')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup('docs', app, document);

  return app;
}
