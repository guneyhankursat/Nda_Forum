import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NdaModule } from './nda/nda.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env variables available throughout the app
    }),
    NdaModule, // Import your NDA module here
  ],
})
export class AppModule {}