import { Module } from '@nestjs/common';
import { NdaController } from './nda.controller';
import { NdaService } from './nda.service';

@Module({
  controllers: [NdaController],
  providers: [NdaService],
})
export class NdaModule {}