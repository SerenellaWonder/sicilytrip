import { NestFactory } from '@nestjs/core';
import {
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerModule,
} from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
   * CORS
   */
  app.enableCors({
    origin: [
      'http://localhost:3000',
    ],
    credentials: true,
  });

  /*
   * API Prefix
   */
  app.setGlobalPrefix('api');

  /*
   * API Versioning
   */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  /*
   * Validation
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
    }),
  );

  /*
   * Swagger
   */
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

  /*
   * Start
   */
  const port = Number(process.env.PORT) || 3001;

  await app.listen(port);

  console.log('');
  console.log('======================================');
  console.log('🚀 SicilyTrip API started');
  console.log('======================================');
  console.log(`API     : http://localhost:${port}/api/v1`);
  console.log(`Swagger : http://localhost:${port}/docs`);
  console.log('======================================');
  console.log('');
}

bootstrap();