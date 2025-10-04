import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  dotenv.config(); // Carga variables de entorno

  const app = await NestFactory.create(AppModule);

  // ✅ Habilitar CORS
  app.enableCors({
    origin: 'http://localhost:3000', // frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  app.use(cookieParser());
  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Ocso API')
    .setDescription('API para la gestión de Ocso')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Usa el puerto del .env o 3001 por defecto
  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`🚀 NestJS corriendo en http://localhost:${port}`);
}
bootstrap();
