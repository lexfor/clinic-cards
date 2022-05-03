import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { kafkaClientOptions } from './config/kafka-client.options';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>(kafkaClientOptions);
  await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
