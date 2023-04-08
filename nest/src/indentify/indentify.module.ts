import { Module } from '@nestjs/common';
import { IndentifyService } from './indentify.service';
import { IndentifyController } from './indentify.controller';
@Module({
  providers: [IndentifyService],
  controllers: [IndentifyController]
})
export class IndentifyModule { }
