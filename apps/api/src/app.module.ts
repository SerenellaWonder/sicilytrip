import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';

import { GeographyModule } from './modules/geography/geography.module';
import { PartnerSolutionModule } from './modules/partnersolution/partnersolution.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../../.env',
    }),

    PrismaModule,
    HealthModule,
    GeographyModule,
    PartnerSolutionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}