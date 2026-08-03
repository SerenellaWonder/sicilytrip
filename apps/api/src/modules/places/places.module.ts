import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';

import { NominatimClient } from './client/nominatim.client';
import { NominatimProvider } from './providers/nominatim.provider';

@Module({

  imports: [

    ConfigModule,

    HttpModule,

  ],

  controllers: [

    PlacesController,

  ],

  providers: [

    PlacesService,

    NominatimClient,

    NominatimProvider,

  ],

  exports: [

    PlacesService,

  ],

})
export class PlacesModule {}