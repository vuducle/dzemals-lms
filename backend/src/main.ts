import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';
import setupDatabase from './setup-database';

/**
 * Bootstrap function to start the NestJS application.
 * This function creates the application instance, sets up Swagger documentation,
 * and starts listening on the specified port.
 */
async function bootstrap() {
  const logger = new Logger('Bootstrap');

  // Setup database and run migrations before creating app
  try {
    logger.log('Setting up database...');
    await setupDatabase();
    logger.log('Database setup completed!');
  } catch (error) {
    logger.error('Database setup failed:', error);
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe for DTO transformation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  setupSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
