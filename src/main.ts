import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Mi API')
    .setDescription('API con NestJS, JWT, Swagger y Sequelize')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

    const port = process.env.PORT || 3000;
    await app.listen(port); 
      console.log(`Aplicación corriendo en http://localhost:${port}`);
      console.log(`Documentación Swagger disponible en http://localhost:${port}/api`);
      console.log(`Documentación OpenAPI disponible en http://localhost:${port}/api-json`);
      console.log(`Documentación Redoc disponible en http://localhost:${port}/redoc`);
    }
    bootstrap();
