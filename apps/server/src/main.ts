/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { writeFileSync } from 'fs';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  const port = process.env.API_PORT || 3000;

  if (process.env.NODE_ENV === 'development') {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder().setTitle('Skinline API').setVersion('1.0').build(),
      {
        operationIdFactory: (type, method, version) =>
          version ? `${method}${version.toUpperCase()}` : method,
      }
    );
    const OPENAPI_OUTPUT_PATH = process.env.OPENAPI_OUTPUT_PATH;
    if (OPENAPI_OUTPUT_PATH) {
      writeFileSync(OPENAPI_OUTPUT_PATH, JSON.stringify(document));
    }
    writeFileSync('./test.json', JSON.stringify(document));
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/`);
}

bootstrap();
