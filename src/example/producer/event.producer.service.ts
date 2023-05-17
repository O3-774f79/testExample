import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { TopicProducerEvent } from "../dtos/producer/producer.event";
import { ProducerEvents } from "../enums/produce.events.enum";

@Injectable()
export class EventProducerService {
    constructor(@Inject('EXAMPLE_PRODUCER') private readonly eventPublisherClient: ClientKafka){}

      exampleTopicProducerPublisher(data: TopicProducerEvent){
        this.eventPublisherClient.emit(ProducerEvents.TopicExample, data);
      }
}