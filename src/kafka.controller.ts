import { Controller, OnModuleInit } from '@nestjs/common';
import { ClientKafka, Client, EventPattern } from '@nestjs/microservices';
import { EventBus } from '@nestjs/cqrs';
import { kafkaClientOptions } from './config/kafka-client.options';
import { CreateCardEvent } from './sagas/create/user';
import { DeleteCardEvent } from './sagas/delete/user';

@Controller()
export class KafkaController implements OnModuleInit {
  @Client(kafkaClientOptions)
  kafkaClient: ClientKafka;
  constructor(private readonly eventBus: EventBus) {}

  async onModuleInit() {
    const requestPatterns = ['create.credential'];

    requestPatterns.forEach((pattern) => {
      this.kafkaClient.subscribeToResponseOf(pattern);
    });
    await this.kafkaClient.connect();
  }

  @EventPattern('create.patient.user')
  async createPatientUserListener({ value }) {
    const event = new CreateCardEvent(value.actionID, value.userID);
    this.eventBus.publish(event);
  }

  @EventPattern('create.doctor.user')
  async createDoctorUserListener({ value }) {
    const event = new CreateCardEvent(value.actionID, value.userID);
    this.eventBus.publish(event);
  }

  @EventPattern('delete.patient.user')
  async DeletePatientUserListener({ value }) {
    const event = new DeleteCardEvent(
      value.actionID,
      value.userID,
      value.credentialID,
    );
    this.eventBus.publish(event);
  }

  @EventPattern('delete.doctor.user')
  async DeleteDoctorUserListener({ value }) {
    const event = new DeleteCardEvent(
      value.actionID,
      value.userID,
      value.credentialID,
    );
    this.eventBus.publish(event);
  }
}
