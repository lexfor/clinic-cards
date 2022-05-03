import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaClientOptions: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'CardsService',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'CardsGroups',
      allowAutoTopicCreation: true,
    },
  },
};
