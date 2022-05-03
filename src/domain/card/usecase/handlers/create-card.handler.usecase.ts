import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientKafka, MessagePattern } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { CreateCardCommandUsecase } from '../commands';
import { Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ICardRepository } from '../../interfaces/card.repository.interface';
import { ICard } from '../../interfaces/card.interface';

@CommandHandler(CreateCardCommandUsecase)
export class CreateCardHandlerUsecase
  implements ICommandHandler<CreateCardCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('CARD_REPOSITORY') private readonly cardRepository: ICardRepository,
  ) {}

  @MessagePattern('create.card')
  async execute(command: CreateCardCommandUsecase): Promise<void> {
    console.log(command);
    const card: ICard = {
      id: uuidv4(),
      intolerances: '',
      user_id: command.userID,
    };

    await this.cardRepository.createCard(card);
    await this.client.emit('create.card', {
      actionID: command.actionID,
      cardID: card.id,
    });
  }
}
