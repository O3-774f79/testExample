import { Controller, UseGuards, UsePipes } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CustomLoggerService, FlushSummaryLog, LoggerGuard, Logs, RemoveAtSymbolPipe } from '@stoodstill/domain-service-framework';
import { TopicConsumerEvent } from '../dtos/consumer/consumer.event';
import { ConsumerEvents } from '../enums/consume.events.enum';
import { EventProducerService } from '../producer/event.producer.service';
import { ExampleApiService } from '../service/example-api.service';

@Controller()
export class EventConsumerController {
  constructor(
    private exampleService: ExampleApiService,
    private eventProducerService: EventProducerService,
    private logger: CustomLoggerService,
    private summaryFlush: FlushSummaryLog,

  ) {

  }
  @EventPattern(ConsumerEvents.ExampleToptic)
  @UseGuards(LoggerGuard)
  @Logs(ConsumerEvents.ExampleToptic)
  @UsePipes(new RemoveAtSymbolPipe())
  async handleEventExample(data: TopicConsumerEvent) {
    console.log('Console Log =============> : ~ data:', data)
    // const header = {
    //   "x-tid": "0001"
    // };
    // let res;
    // res = await this.exampleService.postExample(data, header)
    // console.log('Console Log =============> : ~ res:', res)
    // let asd = await this.examplesService.createExample(data);
    // console.log('Console Log =============> : ~ asd:', asd)
    //TODO
  }
}