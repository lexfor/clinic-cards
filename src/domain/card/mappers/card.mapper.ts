import { ICard } from '../interfaces/card.interface';
import { CardEntity } from '../entity/card.entity';

export class CardMapper {
  toEntity(card: ICard): CardEntity {
    return new CardEntity(
      card.id,
      card.user_id,
      card.intolerances,
      card.height,
      card.weight,
      card.blood_type,
    );
  }

  toRow(card: CardEntity): ICard {
    return {
      id: card.getID,
      intolerances: card.getIntolerances,
      height: card.getHeight,
      weight: card.getWeight,
      blood_type: card.getBloodyType,
      user_id: card.getUserID,
    };
  }
}
