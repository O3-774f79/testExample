import { Expose } from "class-transformer";

export class TopicConsumerEvent {
    example: string;
    @Expose({ name: "@referredType" })
    referredType: string;
}
