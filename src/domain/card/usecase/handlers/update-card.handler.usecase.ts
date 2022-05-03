import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Client, ClientKafka, MessagePattern } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { Inject } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { ICardRepository } from '../../interfaces/card.repository.interface';
import { ICard } from '../../interfaces/card.interface';
import { UpdateCardCommandUsecase } from '../commands/update-card.command.usecase';
import { CardEntity } from '../../entity/card.entity';

@CommandHandler(UpdateCardCommandUsecase)
export class UpdateCardHandlerUsecase
  implements ICommandHandler<UpdateCardCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('CARD_REPOSITORY') private readonly cardRepository: ICardRepository,
  ) {}

  @MessagePattern('update.card')
  async execute(command: UpdateCardCommandUsecase): Promise<CardEntity> {
    const cardEntity = await this.cardRepository.getCard(command.userID);

    const card: ICard = {
      id: cardEntity.getID,
      user_id: cardEntity.getUserID,
      intolerances: command.intolerances,
      height: command.height,
      weight: command.weight,
      blood_type: command.bloodType,
    };

    const updatedCardEntity = await this.cardRepository.updateCard(card);
    await this.client.emit('update.card', {
      actionID: uuidv4(),
      cardID: card.id,
    });
    return updatedCardEntity;
  }
}
