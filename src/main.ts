import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.get('CORS_ORIGIN'),
    methods: configService.get('CORS_METHODS'),
    allowedHeaders: configService.get('CORS_ALLOWED_HEADERS').split(','),
    credentials: configService.get('CORS_CREDENTIALS') === 'true',
  });
  await app.listen(3000);
}
bootstrap();
