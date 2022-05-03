import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientKafka, MessagePattern } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { DeleteCardCommandUsecase } from '../commands';
import { Inject } from '@nestjs/common';
import { ICardRepository } from '../../interfaces/card.repository.interface';

@CommandHandler(DeleteCardCommandUsecase)
export class DeleteCardHandlerUsecase
  implements ICommandHandler<DeleteCardCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('CARD_REPOSITORY') private readonly cardRepository: ICardRepository,
  ) {}

  @MessagePattern('create.card')
  async execute(command: DeleteCardCommandUsecase): Promise<void> {
    const card = await this.cardRepository.getCard(command.userID);
    await this.cardRepository.deleteCard(command.userID);
    await this.client.emit('create.card', {
      actionID: command.actionID,
      cardID: card.getID,
    });
  }
}
