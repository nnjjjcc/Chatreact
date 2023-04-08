import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './ws/events.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { IndentifyModule } from './indentify/indentify.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/localDataBaseName'),
    EventsModule,
    AuthModule,
    UserModule,
    IndentifyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
