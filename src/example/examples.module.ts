import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { EventConsumerController } from './consumer/event.consumer.controller';
import { EventProducerService } from './producer/event.producer.service';
import { ExampleApiService } from './service/example-api.service';


@Module({
    imports: [
      ClientsModule.registerAsync(
        [
          {
            name: 'EXAMPLE_PRODUCER',
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
              transport: Transport.KAFKA,
              options: {
                client: {
                  brokers: [process.env.BROKERS],
                  clientId: config.get<string>('kafka.client.client-id'),
                  ssl: config.get<boolean>('kafka.client.ssl'),
                  sasl: process.env.ZONE != 'local' && {
                    mechanism: 'plain',
                    username: process.env.API_KEY,
                    password: process.env.API_SECRET
                  }
  
                },
                producer: {
                  allowAutoTopicCreation: true,
                }
              },
            }),
          },
        ]
      ),
      ],
    controllers: [EventConsumerController],
    providers: [EventProducerService,ExampleApiService]
})
export class ExamplesModule {}
