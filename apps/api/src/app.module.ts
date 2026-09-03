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
import { ContactsModule } from './modules/contacts/contacts.module';
import { EventsModule } from './modules/events/events.module';
import { ContentModule } from './modules/content/content.module';

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
    ContactsModule,
    EventsModule,
    ContentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
