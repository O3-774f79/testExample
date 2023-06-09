import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get<ConfigService>(ConfigService)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [process.env.BROKERS],
        clientId: configService.get<string>('kafka.client.client-id'),
        ssl: configService.get<boolean>('kafka.client.ssl'),
        sasl: process.env.ZONE !== 'local' && {
          mechanism: 'plain',
          username: process.env.API_KEY,
          password: process.env.API_SECRET
        }

      },
      consumer: {
        groupId: configService.get<string>('kafka.consumer.group-id'),
        allowAutoTopicCreation: configService.get<boolean>('kafka.consumer.allowAutoTopicCreation'),
      }
    }
  });
  
  await app.startAllMicroservices()
  //port app
  await app.listen(3001);
  
}

bootstrap();
