import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';

import { GeographyModule } from './modules/geography/geography.module';
import { PartnerSolutionModule } from './modules/partnersolution/partnersolution.module';

import { PlacesModule } from './modules/places/places.module';

import { HotelsModule } from './modules/hotels/hotels.module';
import { CustomerAreaModule } from './modules/customer-area/customer-area.module';
import { AdminModule } from './modules/admin/admin.module';

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
    PlacesModule,
    HotelsModule,
    CustomerAreaModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
