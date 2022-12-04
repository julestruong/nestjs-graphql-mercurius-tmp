import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import fastify from 'fastify';
import mercuriusLogging from 'mercurius-logging';

async function bootstrap() {
  const fastifyInstance = fastify({
    logger: true,
    disableRequestLogging: true,
  });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(fastifyInstance),
  );

  app.register(mercuriusLogging, {
    logLevel: 'debug', // default: 'info'
    prependAlias: true, // default: false
    logBody: true, // default: false
    logVariables: true, // default: false
  });

  await app.listen(3000);
}
bootstrap();
