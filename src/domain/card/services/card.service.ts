import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ICardFetcher } from '../interfaces/fetcher.interface';
import { CardEntity } from '../entity/card.entity';
import { UpdateCardFormDto } from '../dto/form/update-card.form.dto';
import { UpdateCardCommandUsecase } from '../usecase/commands/update-card.command.usecase';
import { FullCardViewDto } from '../dto/view/full-card.view.dto';

@Injectable()
export class CardService {
  constructor(
    private commandBus: CommandBus,
    @Inject('CARD_FETCHER')
    private cardFetcher: ICardFetcher,
  ) {}

  async getCard(userID: string): Promise<CardEntity> {
    return await this.cardFetcher.getCard(userID);
  }

  async updateCard(id: string, dto: UpdateCardFormDto): Promise<void> {
    await this.commandBus.execute(new UpdateCardCommandUsecase(id, dto));
  }

  async getPatientCard(id: string): Promise<FullCardViewDto> {
    const card = await this.cardFetcher.getPatientCard(id);
    card.resolution_data = await this.cardFetcher.getPatientCardDiagnosis(id);
    return card;
  }
}
