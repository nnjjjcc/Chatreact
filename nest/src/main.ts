import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session"
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,

      transform: true,
    }),
  );
  app.use(
    session({
      secret: 'xinsu',
      name: 'xinsu.session',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );
  await app.listen(3000);
}
bootstrap();
