import { Controller, Post, Body } from '@nestjs/common';
import { NdaService } from './nda.service';

@Controller('nda')
export class NdaController {
  constructor(private readonly ndaService: NdaService) {}

  @Post('check')
  checkAllClauses(@Body('text') text: string) {
    return this.ndaService.checkAllClauses(text);
  }

  @Post('check-ai')
  async checkAllClausesWithAI(@Body('text') text: string) {
    return await this.ndaService.checkAllClausesWithAI(text);
  }
}